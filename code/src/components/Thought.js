import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Thought = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.hearts);
  const myLikes = props.myLikes.includes(props.id);
  function handleClickLike(e) {
    e.preventDefault();
    if (!liked) {
      fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${props.id}/like`, {
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
    <li key={props.id} className={`thought ${myLikes || liked ? 'liked' : ''}`}>
      <a href="#" onClick={handleClickLike} className="thought-like-link">
        <span className="thought-message">{props.message}</span>
        <span className="thought-date">{dayjs(props.date).fromNow()}</span>
        <div className="heart">{likes}</div>
      </a>
    </li>
  )
};
export default Thought;
