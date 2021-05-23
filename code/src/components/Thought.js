import React, { useState } from 'react';
import { API_URL } from 'Urls.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Thought = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.hearts);
  const myLikes = props.myLikes.includes(props.id);
  const handleClickLike = (e) => {
    e.preventDefault();
    if (!myLikes) {
      fetch(`${API_URL}/${props.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(setLiked(true))
        .then(setLikes((data) => data + 1))
        .then(props.setMyLikes((prevValue) => [...prevValue, props.id]))
        .catch((err) => console.log(err));
    }
  }
  return (
    <li className={`thought ${myLikes || liked ? 'liked' : ''}`}>
      <button type="button" onClick={handleClickLike} className="thought-like-link">
        <span className="thought-message">{props.message}</span>
        <span className="thought-date">{dayjs(props.date).fromNow()}</span>
        <div className="heart">{likes}</div>
      </button>
    </li>
  )
};
export default Thought;
