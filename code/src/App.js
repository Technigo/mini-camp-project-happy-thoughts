/* eslint-disable no-underscore-dangle */
/* eslint-disable react/react-in-jsx-scope */
import './reset.css';
import './styles.css';
import './dark-theme.css';

import { useState, useEffect } from 'react';

import Message from './components/Message';
import Submission from './components/Submission';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [areLiked, setAreLiked] = useState([]);
  const [needsUpdating, setNeedsUpdating] = useState(false);

  function themeSwitcher() {
    if (
      window.matchMedia
      && window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      document.body.classList.toggle('is-forced-dark');
    } else if (
      window.matchMedia
      && window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.body.classList.toggle('is-forced-light');
    }
  }

  useEffect(() => {
    // Ropa på api asynkront
    const url = 'https://happy-thoughts-technigo.herokuapp.com/thoughts';
    fetch(url, {
      method: 'GET'
    })
      .then((raw) => {
        return raw.json();
      })

      .then((formatted) => {
        setMessages(formatted);
        if (localStorage.getItem('are-liked')) {
          setAreLiked(JSON.parse(localStorage.getItem('are-liked')));
        } else {
          console.log('localStorage finns inte');
        }
      })

      .catch((e) => {
        console.log('Something went wrong', e);
        setNeedsUpdating(true);
      });
  }, [needsUpdating]); // Kolla om gotError har ändrats, kör igen i så fall

  return (
    <div className="App">
      <div className="themeswitch">
        <h1>Happy Thoughts</h1>
        <button type="button" onClick={() => themeSwitcher()}>
          <span className="half" />
          <span className="half" />
        </button>
      </div>
      <Submission
        setNeedsUpdating={setNeedsUpdating}
        setMessages={setMessages} />
      <div className="messages">
        {messages.map((message) => {
          return (
            <Message
              alreadyLiked={areLiked.includes(message._id)}
              areLiked={areLiked}
              setAreLiked={setAreLiked}
              id={message._id}
              key={message._id}
              message={message.message}
              likeValue={message.hearts}
              createdDate={message.createdAt} />
          );
        })}
      </div>
    </div>
  );
}
