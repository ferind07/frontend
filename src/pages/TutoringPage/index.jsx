import { Input } from "antd";
import React, { useState, useEffect, useRef } from "react";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import { MdScreenShare, MdStopScreenShare, MdChat } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import "./index.css";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    console.log(props.peer);
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
      console.log(stream);
    });
  }, []);

  return (
    <>
      <video
        playsInline
        controls
        autoPlay
        ref={ref}
        style={{ height: "70%" }}
      />
    </>
  );
};

const TutoringPage = (props) => {
  //const userVideo = useRef();
  const [peers, setPeers] = useState([]);
  const socketRef = props.socket;
  const userVideo = useRef();
  const peersRef = useRef([]);
  //const myStream = useRef();

  const chatPeer = useRef([]);

  const [userInfo, setUserInfo] = useState({});
  const partnerSocketId = useRef();

  const [video, setVideo] = useState(true);
  const [mute, setMute] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);
  const [chatView, setChatView] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [chat, setChat] = useState([]);
  const [connectionEstablished, setConnection] = useState(false);
  //const roomID = props.match.params.roomID;

  const { id } = useParams();
  const navigate = useNavigate();

  function onClickVideo(e) {
    e.preventDefault();
    //console.log(myStream.current.srcObject.getVideoTracks());
    userVideo.current.srcObject.getVideoTracks()[0].enabled =
      !userVideo.current.srcObject.getVideoTracks()[0].enabled;
    setVideo(!video);
  }

  function getUserInfo() {
    axios
      .get(BackendUrl + "/user/getInfo?token=" + localStorage.getItem("token"))
      .then((success) => {
        setUserInfo(success.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onClickMute(e) {
    e.preventDefault();
    userVideo.current.srcObject.getAudioTracks()[0].enabled =
      !userVideo.current.srcObject.getAudioTracks()[0].enabled;
    setMute(!mute);
  }

  function onClickShareScreen(e) {
    e.preventDefault();
    if (shareScreen) {
      console.log("stop share screen");

      peersRef.current.forEach((element) => {
        element.peer.replaceTrack(
          element.peer.streams[0].getVideoTracks()[0],
          userVideo.current.srcObject.getVideoTracks()[0],
          element.peer.streams[0]
        );
      });
    } else {
      console.log("start share screen");

      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          peersRef.current.forEach((element) => {
            element.peer.replaceTrack(
              element.peer.streams[0].getVideoTracks()[0],
              stream.getVideoTracks()[0],
              element.peer.streams[0]
            );
            console.log(stream.getVideoTracks()[0]);
            console.log(userVideo.current.srcObject.getVideoTracks()[0]);
          });
        });
    }

    setShareScreen(!shareScreen);
  }

  const videoComp = () => {
    if (video) {
      //video true aktif
      return (
        <div
          onClick={(e) => {
            onClickVideo(e);
          }}
        >
          <FaVideo size={45} />
          <p>Video</p>
        </div>
      );
    } else {
      return (
        <div
          onClick={(e) => {
            onClickVideo(e);
          }}
        >
          <FaVideoSlash size={45} />
          <p style={{ color: "red" }}>Video</p>
        </div>
      );
    }
  };

  const muteComp = () => {
    if (mute) {
      //mute true aktif
      return (
        <div
          onClick={(e) => {
            onClickMute(e);
          }}
        >
          <FaMicrophoneSlash size={45} />
          <p style={{ color: "red" }}>Mic</p>
        </div>
      );
    } else {
      return (
        <div
          onClick={(e) => {
            onClickMute(e);
          }}
        >
          <FaMicrophone size={45} />
          <p>Mic</p>
        </div>
      );
    }
  };

  const shareScreenComp = () => {
    if (shareScreen) {
      return (
        <div
          onClick={(e) => {
            onClickShareScreen(e);
          }}
        >
          <MdStopScreenShare size={45} />
          <p style={{ color: "red" }}>Share screen</p>
        </div>
      );
    } else {
      return (
        <div
          onClick={(e) => {
            onClickShareScreen(e);
          }}
        >
          <MdScreenShare size={45} />
          <p>Share screen</p>
        </div>
      );
    }
  };

  function onClickChatView(e) {
    e.preventDefault();
    setChatView(!chatView);
  }

  function onClickSend(e) {
    e.preventDefault();
    if (chatValue != "") {
      const newChat = {
        from: socketRef.current.id,
        text: chatValue,
      };

      socketRef.current.emit("sendChat", { text: chatValue, room: id });
      const dataChat = {
        sender: true,
        text: chatValue,
      };
      setChat((chats) => [...chats, dataChat]);
      setChatValue("");
    }
  }

  function endMeet() {
    peersRef.current.forEach((peer) => {
      peer.peer.destroy();
    });
    //console.log(userVideo.current);
    userVideo.current.srcObject.getTracks().forEach((track) => {
      if (track.readyState == "live") {
        track.stop();
        navigate("/resultPage/" + id);
      }
    });
  }

  function onClickEnd(e) {
    e.preventDefault();
    socketRef.current.emit("leave", { id: id, to: partnerSocketId.current });
    endMeet();

    //navigate(-1);
  }

  const chatComp = () => {
    let displayValue;
    if (chatView) {
      displayValue = "none";
    } else {
      displayValue = "block";
    }
    return (
      <div className="chat-container" style={{ display: displayValue }}>
        <div className="chat-body">
          {chat.map((chatDetail) => {
            if (chatDetail.sender) {
              return (
                <>
                  <div className="d-flex justify-content-end">
                    <div className="chat-bubble">{chatDetail.text}</div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="d-flex justify-content-start">
                    <div className="chat-bubble">{chatDetail.text}</div>
                  </div>
                </>
              );
            }
          })}
        </div>
        <div
          className="chat-footer d-flex"
          style={{ margin: "0 5px", gap: "5px" }}
        >
          <Input
            value={chatValue}
            onChange={(e) => {
              setChatValue(e.target.value);
            }}
          />

          <button
            onClick={(e) => {
              onClickSend(e);
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getUserInfo();
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        //myStream.current = stream;
        socketRef.current.emit("join room", id);
        socketRef.current.on("all users", (users) => {
          //buatPeerChat(users);
          console.log(users);
          const mySocketID = socketRef.current.id;
          const peers = [];
          console.log("my socket id : " + mySocketID);
          users.forEach((userID, i) => {
            const peer = createPeer(
              userID,
              socketRef.current.id,
              userVideo.current.srcObject
            );

            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          console.log("user join = " + payload.callerID);
          partnerSocketId.current = payload.callerID;
          const peer = addPeer(
            payload.signal,
            payload.callerID,
            userVideo.current.srcObject
          );

          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("goToResultPage", () => {
          endMeet();
          navigate("/resultPage/" + id);
        });
      });

    socketRef.current.on("newChat", (data) => {
      console.log(data);
      setChat((chats) => [...chats, data]);
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    //initiator true
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:coturn.ivanchristian.me",
            username: "ivan",
            credential: "5521",
          },
          {
            urls: "Turn:coturn.ivanchristian.me",
            username: "ivan",
            credential: "5521",
          },
        ],
      },
      stream,
    });

    peer.on("signal", (signal) => {
      console.log(
        "sending signal to : " + userToSignal + " from : " + callerID
      );
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    //initiator false
    const peer = new Peer({
      initiator: false,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:coturn.ivanchristian.me",
            username: "ivan",
            credential: "5521",
          },
          {
            urls: "Turn:coturn.ivanchristian.me",
            username: "ivan",
            credential: "5521",
          },
        ],
      },
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  const renderEnd = () => {
    if (userInfo.role == 2) {
      return (
        <div
          className="content-ikon float-left"
          onClick={(e) => {
            onClickEnd(e);
          }}
        >
          <FaPhoneSlash size={45} />
          <p>End</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="container-tutor">
        <div className="content-atas">
          {peers.map((peer, index) => {
            return (
              <Video
                key={index}
                peer={peersRef.current[index].peer}
                index={index}
              />
            );
          })}

          <video
            ref={userVideo}
            autoPlay
            playsInline
            muted
            style={{ height: "20%" }}
          ></video>
        </div>
        <div className="content-bawah">
          <div className="content-kiri">
            <div className="content-ikon">{shareScreenComp()}</div>
          </div>
          <div className="content-tengah">
            <div className="content-ikon float-left">{videoComp()}</div>
            <div className="content-ikon float-left">{muteComp()}</div>

            {renderEnd()}
          </div>
          <div className="content-kanan">
            {chatComp()}
            <div
              className="content-ikon float-left"
              onClick={(e) => {
                onClickChatView(e);
              }}
            >
              <MdChat size={45} />
              <p style={{ pointerEvents: "none" }}>Chat</p>
            </div>
            <div
              className="float-left"
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <h6
                className="center"
                style={{
                  marginBottom: "0px",
                }}
              >
                {peers.length}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutoringPage;
