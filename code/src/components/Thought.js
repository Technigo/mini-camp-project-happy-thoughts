import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Thought = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.hearts);
  function handleClickLike(e) {
    e.preventDefault();
    if (!liked) {
      fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${props.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(setLiked(true))
        .then(setLikes((data) => data + 1))
        .catch((err) => console.log(err));
    }
  }
  return (
    <li key={props.id} className={`thought ${liked ? 'liked' : ''}`}>
      <a href="#" onClick={handleClickLike} className="thought-like-link">
        <span className="thought-message">{props.message}</span>
        <span className="thought-date">{dayjs(props.date).fromNow()}</span>
        <div className={`heart ${liked ? 'liked' : ''}`}>{likes}</div>
      </a>
    </li>
  )
};
export default Thought;
