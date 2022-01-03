import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import items from "./item.js";
import { useHistory } from "react-router-dom";
function App() {
  const [list, list변경] = useState(items);
  const [input, input변경] = useState("");
  const [data, data변경] = useState([0, 0]);
  useEffect(() => {});
  return (
    <div className="App">
      <Nav input변경={input변경} input={input} list변경={list변경}></Nav>
      <Route exact path="/">
        <div className="big-list">
          {list.map((item, i) => {
            return <Lists item={item} i={i} data변경={data변경}></Lists>;
          })}
        </div>
      </Route>
      <Route path="/dd">
        <div className="video-play">
          <VideoLists list={list} data={data}></VideoLists>
          <div>
            {list.map((item, z) => {
              return <Lists item={item} z={z} data변경={data변경}></Lists>;
            })}
          </div>
        </div>
      </Route>
    </div>
  );
}
function VideoLists(props) {
  return (
    <div className="video">
      <iframe
        width="100%"
        src={`https://www.youtube.com/embed/${props.data[0].id.videoId}`}
        allowFullScreen
        type="text/html"
        height="800px"
      ></iframe>
      <h2>{props.data[0].snippet.title}</h2>
      <h3>{props.data[0].snippet.channelTitle}</h3>
      <pre>{props.data[0].snippet.description}</pre>
    </div>
  );
}
function Lists(props) {
  let history = useHistory();
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <div className="lists">
        <img
          src={props.item.snippet.thumbnails.medium.url}
          onClick={() => {
            {
              console.log(props.item);
              props.data변경([props.item, props.i]);
              moveToTop();
              history.push("/dd");
            }
          }}
        ></img>
        <span>{props.item.snippet.title}</span>
      </div>
    </>
  );
}
function Nav(props) {
  let history = useHistory();
  return (
    <>
      <div className="nav">
        <i
          className="fab fa-youtube nav-icon fa-3x "
          onClick={() => {
            history.push("/");
          }}
        ></i>
        <h1
          className="nav-title"
          onClick={() => {
            history.push("/");
          }}
        >
          Youtube
        </h1>
        <input
          onChange={(e) => {
            props.input변경(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key == "Enter") {
              axios
                .get(
                  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=
                  ${props.input}
                  &key=${process.env.REACT_APP_Y0UTUBE_API_KEY}`
                )
                .then((result) => {
                  props.list변경(result.data.items);
                  console.log(result.data.items);
                })
                .catch(() => {
                  console.log("이미지 로딩에 실패하였습니다.");
                  console.log(props.input);
                });
            }
          }}
          type="text"
          placeholder="Search.."
        ></input>
        <button
          onClick={() => {
            axios
              .get(
                `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=
                  ${props.input}
                  &key=${process.env.REACT_APP_Y0UTUBE_API_KEY}`
              )
              .then((result) => {
                props.list변경(result.data.items);
                console.log(result.data.items);
              })
              .catch(() => {
                console.log("이미지 로딩에 실패하였습니다.");
                console.log(props.input);
              });
          }}
        >
          <i className="fas fa-search fa-2x nav-search"></i>
        </button>
      </div>
      <div className="git">
        <a href="https://github.com/Leeseunghwan7305" target="_blank">
          <img
            className="nav-img"
            src="https://newsong.us/wp-content/uploads/2019/03/6v9e092hz79h569v7poy.jpg"
          ></img>
          <span style={{ color: "white", fontSize: "1rem" }}>
            Github Address
          </span>
        </a>
      </div>
    </>
  );
}
export default App;
