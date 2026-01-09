import React from "react";

export default function Playlist() {
  return (
    <div className="playlist-container">
      <div className="container_chat_bot">
        <h5>Enter song name</h5>
        <div className="container-chat-options">
          <div className="chat">
            <div className="chat-bot">
              <textarea
                id="chat_bot"
                name="chat_bot"
                placeholder="Song name ... ♬˚"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="container_chat_bot">
        <h5>Enter song Link</h5>
        <div className="container-chat-options">
          <div className="chat">
            <div className="chat-bot">
              <textarea
                id="chat_bot"
                name="chat_bot"
                placeholder="Enter Link ... ✦˚"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <button className="button addBtn" >
        <div className="inner">Add song</div>
      </button>

      
    </div>
  );
}
