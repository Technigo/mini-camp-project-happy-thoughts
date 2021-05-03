import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Thought = (props) => {
  const [liked, setLiked] = useState(false);
  function handleClickLike() {
    console.log('submit like to API and set state');
    setLiked((prev) => !prev);
  }
  return (
    <li key={props.id} className="thought">
      {props.message}
      <br />
      {dayjs(props.date).fromNow()}
      <br />
      {!liked && <button type="button" className="button-like" onClick={handleClickLike}>{props.hearts}</button>}
      {liked && <button type="button" className="button-like liked" onClick={handleClickLike}>{props.hearts}</button>}
    </li>
  )
};
export default Thought;
