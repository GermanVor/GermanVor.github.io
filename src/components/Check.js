import React from "react";

export default ({ title, Url, onClickToGetPost }) => (
  <div className="Check">
    <h3>{title}</h3>
    <div>
      <form action={"https://www.reddit.com" + Url} target="_blank">
        <input type="submit" value="GoToSource" alt="thumbnail" />
      </form>
      <input
        type="button"
        value="GetPost"
        onClick={() => onClickToGetPost(Url)}
      />
    </div>
  </div>
);
