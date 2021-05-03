import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Thought = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.hearts);
  function handleClickLike() {
    setLiked(true);
    setLikes((prev) => prev + 1);
    fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${props.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
  }
  return (
    <li key={props.id} className="thought">
      {props.message}
      <br />
      {dayjs(props.date).fromNow()}
      <br />
      <button type="button" className={`button-like ${liked ? 'liked' : ''}`} onClick={handleClickLike}>{likes}</button>
    </li>
  )
};
export default Thought;
