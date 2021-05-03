import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Thought = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.hearts);
  function handleClickLike() {
    setLiked((prev) => !prev);
    if (!liked) {
      setLikes((prev) => prev + 1);
      console.log('api call: add');
    } else {
      setLikes((prev) => prev - 1);
      console.log('api call: remove');
    }
  }
  return (
    <li key={props.id} className="thought">
      {props.message}
      <br />
      {dayjs(props.date).fromNow()}
      <br />
      {!liked && <button type="button" className="button-like" onClick={handleClickLike}>{likes}</button>}
      {liked && <button type="button" className="button-like liked" onClick={handleClickLike}>{likes}</button>}
    </li>
  )
};
export default Thought;
