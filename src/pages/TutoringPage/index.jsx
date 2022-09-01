import { Input } from "antd";
import React, { useState, useEffect, useRef } from "react";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import { notification } from "antd";
import { MdScreenShare, MdStopScreenShare, MdChat } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "simple-peer";
import "./index.css";
import axios from "axios";
import BackendUrl from "../../components/BackendUrl";
import { useBeforeunload } from "react-beforeunload";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    console.log(props.peer);
    props.peer.on("stream", (stream) => {
      console.log(stream);
      ref.current.srcObject = stream;
    });
  }, []);
  if (props.panjang == 0) {
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
  } else {
    return (
      <>
        <video
          playsInline
          controls
          autoPlay
          ref={ref}
          style={{ height: "20%" }}
        />
      </>
    );
  }
};

const TutoringPage = (props) => {
  //const userVideo = useRef();
  const [peers, setPeers] = useState([]);
  const socketRef = props.socket;
  const userVideo = useRef();
  const peersRef = useRef([]);
  //const myStream = useRef();

  const [userInfo, setUserInfo] = useState({});
  const partnerSocketId = useRef();

  const [video, setVideo] = useState(true);
  const [mute, setMute] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);
  const [chatView, setChatView] = useState(true);
  const [chatValue, setChatValue] = useState("");
  const [chat, setChat] = useState([]);
  const [connectionEstablished, setConnection] = useState(false);
  const [shareScreenError, setShareScreenError] = useState(false);

  const [shareScreenPeer, setShareScreenPeer] = useState([]);
  const shareScreenPeerRef = useRef([]);
  const shareScreenVideo = useRef();

  //const roomID = props.match.params.roomID;

  const { id } = useParams();
  const navigate = useNavigate();

  function onClickVideo(e) {
    e.preventDefault();
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

  // const shareScreenVideo = useRef();
  // const [shareScreenVideoStream, setShareScreenVideoStream] = useState();

  // function onClickShareScreen(e) {
  //   console.log(peersRef.current.length);

  //   navigator.mediaDevices
  //     .getDisplayMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       peersRef.current.forEach((element) => {
  //         //console.log(element.peer);
  //         console.log(element.peer.streams[0]);
  //         const shareScreenVideoTracks = stream.getVideoTracks()[0];
  //         console.log(stream.getTracks()[0]);
  //         element.peer.addTrack(stream.getTracks()[0], element.peer.streams[0]);
  //       });
  //     });
  // }

  const shareScreenRef = useRef();

  const [isShareScreen, setIsShareScreen] = useState(false);

  // function onClickShareScreen(e) {
  //   if (isShareScreen == false) {
  //     //tidak sedang sharescreen
  //     navigator.mediaDevices
  //       .getDisplayMedia({ video: true, audio: true })
  //       .then((stream) => {
  //         peersRef.current.forEach((element) => {
  //           element.peer.replaceTrack(
  //             element.peer.streams[0].getVideoTracks()[0],
  //             stream.getVideoTracks()[0],
  //             element.peer.streams[0]
  //           );
  //         });
  //       });
  //   } else {
  //     //sedang sharescreen
  //     peersRef.current.forEach((element) => {
  //       element.peer.replaceTrack(
  //         element.peer.streams[0].getVideoTracks()[0],
  //         userVideo.current.srcObject.getVideoTracks()[0],
  //         element.peer.streams[0]
  //       );
  //     });
  //   }
  //   setIsShareScreen(!isShareScreen);
  // }

  function onClickShareScreen(e) {
    e.preventDefault();
    if (shareScreen) {
      console.log("stop share screen");

      if (shareScreenError == true) {
        peersRef.current.forEach((element) => {
          element.peer.replaceTrack(
            element.peer.streams[0].getVideoTracks()[0],
            userVideo.current.srcObject.getVideoTracks()[0],
            element.peer.streams[0]
          );
        });
      }

      // console.log(shareScreenPeerRef.current.length);
      // shareScreenPeerRef.current.forEach((peer) => {
      //   peer.destroy();
      // });
      resetSC();
      socketRef.current.emit("stop share screen", {
        to: partnerSocketId.current,
      });
      setShareScreen(!shareScreen);
    } else {
      console.log("start share screen");

      if (shareScreenPeerRef.current.length > 0) {
        notification.warn({
          message: "Warning",
          description: "Partner already share screen",
        });
      } else {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then((stream) => {
            //shareScreenVideo.current.srcObject = stream;
            //setShareScreenVideoStream(stream);

            const peer1 = new window.SimplePeer({
              initiator: true,
              trickle: false,
              stream: stream,
              iceServers: [
                {
                  urls: "stun:coturn.ferryindra.xyz",
                  username: "ferry",
                  credential: "150699",
                },
                {
                  urls: "turn:coturn.ferryindra.xyz",
                  username: "ferry",
                  credential: "150699",
                },
              ],
            });
            peer1._debug = console.log;

            peer1.on("signal", (data) => {
              socketRef.current.emit("share screen", {
                to: partnerSocketId.current,
                signal: data,
              });
            });

            peer1.on("error", (error) => {
              console.log("error from send peer");
              console.log(error);
              console.log(error.code);
              peersRef.current.forEach((element) => {
                // const vidTrack = stream.getVideoTracks()[0];

                element.peer.replaceTrack(
                  element.peer.streams[0].getVideoTracks()[0],
                  stream.getVideoTracks()[0],
                  element.peer.streams[0]
                );

                console.log(element.peer.streams[0].getVideoTracks());

                //console.log(stream.getVideoTracks()[0]);
                //console.log(userVideo.current.srcObject.getVideoTracks()[0]);
              });
              socketRef.current.emit("shareScreenError", {
                to: partnerSocketId,
              });
              setShareScreenError(true);
            });

            peer1.on("close", () => {
              console.log("close");
              socketRef.current.off("receiving returned share screen signal");
            });

            shareScreenPeerRef.current.push(peer1);

            socketRef.current.on(
              "receiving returned share screen signal",
              (payload) => {
                console.log("signal from reciving peer");
                console.log(payload.signal);
                peer1.signal(payload.signal);
              }
            );

            //userVideo.current.srcObject = stream;
            setShareScreen(!shareScreen);
          });
      }

      // navigator.mediaDevices
      //   .getDisplayMedia({ video: true, audio: true })
      //   .then((stream) => {
      //     peersRef.current.forEach((element) => {
      //       // const vidTrack = stream.getVideoTracks()[0];

      //       element.peer.replaceTrack(
      //         element.peer.streams[0].getVideoTracks()[0],
      //         stream.getVideoTracks()[0],
      //         element.peer.streams[0]
      //       );

      //       console.log(element.peer.streams[0].getVideoTracks());

      //       //console.log(stream.getVideoTracks()[0]);
      //       //console.log(userVideo.current.srcObject.getVideoTracks()[0]);
      //     });
      //   });
    }
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
          <p className="unselectable">Video</p>
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
          <p style={{ color: "red" }} className="unselectable">
            Video
          </p>
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
          <p style={{ color: "red" }} className="unselectable">
            Mic
          </p>
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
          <p className="unselectable">Mic</p>
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
          <p style={{ color: "red" }} className="unselectable">
            Share screen
          </p>
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
          <p className="unselectable">Share screen</p>
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
          {chat.map((chatDetail, index) => {
            if (chatDetail.sender) {
              return (
                <>
                  <div className="d-flex justify-content-end" key={index}>
                    <div className="chat-bubble">{chatDetail.text}</div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="d-flex justify-content-start" key={index}>
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

  // useBeforeunload((event) => {
  //   console.log("refresh");
  //   event.preventDefault();
  // });

  useEffect(() => {
    getUserInfo();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", id);
        socketRef.current.on("all users", (users) => {
          //buatPeerChat(users);
          console.log(users);
          const mySocketID = socketRef.current.id;
          const peers = [];
          console.log("my socket id : " + mySocketID);
          users.forEach((userID, i) => {
            partnerSocketId.current = userID;
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
          notification.success({ message: "User Joined" });
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
      })
      .catch((error) => {
        navigate(-1);
        window.location.reload();
      });

    socketRef.current.on("user left", (id) => {
      console.log("user left " + id);

      const peerObj = peersRef.current.find((p) => p.peerID === id);
      if (peerObj) {
        peerObj.peer.destroy();
        // notification.warning({ message: "User Left" });
      }

      peersRef.current = [];

      setPeers([]);
    });

    socketRef.current.on("reciveShareScreen", (payload) => {
      //alert("user share screen");
      const listPeer = [];

      //console.log(payload.signal);

      console.log("user share screen");
      notification.info({
        message: "Info",
        description: "Partner start share screen",
      });
      const signal = payload.signal;
      const from = payload.from;

      const peer = new window.SimplePeer({
        initiator: false,
        trickle: false,
        iceServers: [
          {
            urls: "stun:coturn.ferryindra.xyz",
            username: "ferry",
            credential: "150699",
          },
          {
            urls: "turn:coturn.ferryindra.xyz",
            username: "ferry",
            credential: "150699",
          },
        ],
      });
      peer._debug = console.log;

      // peer.on("stream", (stream) => {
      //   shareScreenVideo.current.srcObject = stream;
      // });

      peer.on("signal", (data) => {
        console.log("signal from penerima share screen");
        console.log(signal);
        socketRef.current.emit("return share screen signal", {
          signal: data,
          to: from,
        });
      });

      peer.on("close", () => {
        console.log("share screen closed");
        peer.removeAllListeners();
      });

      peer.on("error", (error) => {
        console.log("error from reciving peer");
        console.log(error);
        console.log(error.code);
        resetSC();
      });

      peer.signal(signal);
      listPeer.push(peer);

      shareScreenPeerRef.current.push(peer);
      setShareScreenPeer(listPeer);

      console.log(
        "share screen peer length : " + shareScreenPeerRef.current.length
      );
    });

    socketRef.current.on("share screen stopped", () => {
      notification.info({
        message: "Info",
        description: "Partner stopped share screen",
      });

      // console.log(shareScreenPeer);
      // // shareScreenPeerRef.current.forEach((peer) => {
      // //   console.log(peer);
      // //   peer.removeAllListeners("signal");
      // //   peer.peer.destroy();
      // // });
      // // //console.log(userVideo.current);

      // // console.log(shareScreenVideo);

      // // let tracks = shareScreenVideo.current.srcObject.getTracks();

      // // tracks.forEach((track) => track.stop());
      // // shareScreenVideo.current.srcObject = null;

      resetSC();
    });
    socketRef.current.on("newChat", (data) => {
      console.log(data);
      setChat((chats) => [...chats, data]);
    });

    socketRef.current.on("partnerShareScreenError", () => {
      resetSC();
      setShareScreenError(true);
    });
  }, []);

  function resetSC() {
    shareScreenPeerRef.current.forEach((peer) => {
      peer.destroy();
    });
    shareScreenPeerRef.current = [];
    setShareScreenPeer([]);
  }

  function createPeer(userToSignal, callerID, stream) {
    //initiator true
    const peer = new window.SimplePeer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          // {
          //   urls: "stun:coturn.ivanchristian.me",
          //   username: "ivan",
          //   credential: "5521",
          // },
          // {
          //   urls: "turn:coturn.ivanchristian.me",
          //   username: "ivan",
          //   credential: "5521",
          // },
          {
            urls: "stun:coturn.ferryindra.xyz",
            username: "ferry",
            credential: "150699",
          },
          {
            urls: "turn:coturn.ferryindra.xyz",
            username: "ferry",
            credential: "150699",
          },
        ],
      },
      //streams: [stream],
      stream,
    });

    peer.on("error", (error) => {
      console.log("error from function create peer");
      console.log(error);
      console.log(error.code);
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
    const peer = new window.SimplePeer({
      initiator: false,
      trickle: false,
      config: {
        iceServers: [
          // {
          //   urls: "stun:coturn.ivanchristian.me",
          //   username: "ivan",
          //   credential: "5521",
          // },
          // {
          //   urls: "turn:coturn.ivanchristian.me",
          //   username: "ivan",
          //   credential: "5521",
          // },
          {
            urls: "stun:coturn.ferryindra.xyz",
            username: "ferry",
            credential: "150699",
          },
          {
            urls: "turn:coturn.ferryindra.xyz",
            username: "ferry",
            credential: "150699",
          },
        ],
      },
      //streams: [stream],
      stream,
    });

    peer.on("error", (error) => {
      console.log("error from function add peer");
      console.log(error);
      console.log(error.code);
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
          <p className="unselectable">End</p>
        </div>
      );
    }
  };

  const scRef = useRef();
  const renderShareScreen = () => {
    if (shareScreenPeer.length !== 0) {
      console.log(shareScreenPeerRef.current[0]);
      const scPeer = shareScreenPeerRef.current[0];
      // const ref = useRef();
      scPeer.on("stream", (stream) => {
        scRef.current.srcObject = stream;
      });
      return (
        <video
          ref={scRef}
          autoPlay
          playsInline
          muted
          controls
          style={{ height: "85%" }}
        ></video>
      );
    }
  };
  const vidRef = useRef();
  const renderPeer = () => {
    if (peersRef.current.length > 0) {
      peersRef.current[0].peer.on("track", (track, stream) => {
        vidRef.current.srcObject = stream;
      });
      return (
        <video
          playsInline
          controls
          autoPlay
          ref={vidRef}
          style={{ height: "70%" }}
        />
      );
    }
  };

  return (
    <>
      <div className="container-tutor">
        <div className="content-atas">
          {renderShareScreen()}
          {peers.map((peer, index) => {
            const panjang = shareScreenPeer.length;
            return (
              <Video
                key={index}
                peer={peersRef.current[index].peer}
                index={index}
                panjang={panjang}
              />
            );
          })}
          {/* {renderPeer()} */}
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
              <p style={{ pointerEvents: "none" }} className="unselectable">
                Chat
              </p>
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
