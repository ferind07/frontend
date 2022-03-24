import React, { useState, useEffect, useRef } from "react";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";
import { MdScreenShare, MdStopScreenShare, MdChat } from "react-icons/md";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./index.css";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video playsInline autoPlay ref={ref} />;
};

const TutoringPage = () => {
  const [stream, setStream] = useState();
  //const userVideo = useRef();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  //const roomID = props.match.params.roomID;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setStream(stream);
    });
  }, []);

  function addPeer(incomingSignal, callerID, stream) {}
  //<video ref={userVideo} autoPlay className="video-user"></video>
  return (
    <>
      <div className="container-tutor">
        <div className="content-atas">
          <video ref={userVideo} autoPlay style={{ height: "100%" }}></video>
          <video ref={userVideo} autoPlay style={{ height: "20%" }}></video>
        </div>
        <div className="content-bawah">
          <div className="content-kiri">
            <div className="content-ikon">
              <MdScreenShare size={45} />
              <p>Share screen</p>
            </div>
          </div>
          <div className="content-tengah">
            <div className="content-ikon float-left">
              <FaVideo size={45} />
              <p>Video</p>
            </div>
            <div className="content-ikon float-left">
              <FaMicrophone size={45} />
              <p>Video</p>
            </div>
          </div>
          <div className="content-kanan">
            <div className="content-ikon float-left">
              <MdChat size={45} />
              <p>Chat</p>
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
                asdasd
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TutoringPage;
