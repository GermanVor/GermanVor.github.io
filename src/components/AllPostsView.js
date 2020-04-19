import React from "react";

export default ({ id, title, url, thumbnail, AddPostLater }) => (
  <div id={id} className="ViewPost">
    <h3>{title}</h3>
    <form action={url} target="_blank">
      <input type="submit" value="GoToSource" />
    </form>
    {!thumbnail ? (
      false
    ) : (
      <img className="thumbnail" src={thumbnail} alt="thumbnail" />
    )}
    <div></div>
    <input
      type="submit"
      value="Add"
      onClick={() => AddPostLater({ id, title, url, thumbnail, AddPostLater })}
    />
  </div>
);
