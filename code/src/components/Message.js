/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import './Message.css';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

export default function Message(props) {
  const [clickedId, setClickedId] = useState(null);
  const [likeValue, setLikedValue] = useState(props.likeValue);
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    if (isLiked) {
      // POST request using fetch inside useEffect React   hook
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(
        `https://happy-thoughts-technigo.herokuapp.com/thoughts/${clickedId}/like`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setLikedValue(data.hearts);
          const newState = [...props.areLiked];
          newState.push(props.id);
          localStorage.setItem('are-liked', JSON.stringify(newState));
        });
    }
  }, [clickedId, isLiked, props.areLiked, props.id]);

  function likeClick() {
    setIsLiked(true);
    setClickedId(props.id);
  }

  return (
    <div className="message">
      <div className="information">
        <p className="title">{props.message}</p>
        <p className="created">{dayjs(props.createdDate).fromNow()}</p>
      </div>
      <div className="side">
        <button
          type="button"
          disabled={isLiked || props.alreadyLiked}
          onClick={() => likeClick()}
          className="heart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none">
            <path
              stroke="#000"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21.2808 4.31959c-2.2908-2.29082-6.0057-2.29082-8.2965 0-.4107.41064-.7201.87702-.9841 1.36246-.264-.48544-.5735-.95328-.9856-1.36393-2.29079-2.29082-6.00567-2.29082-8.29649 0-2.29081 2.29082-2.29081 6.00568 0 8.29648l9.28209 9.0519 9.2806-9.0519c2.2923-2.2908 2.2923-6.00419 0-8.29501z" />
          </svg>
          <p>{likeValue}</p>
        </button>
      </div>
    </div>
  );
}
