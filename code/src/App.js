import React, { useState, useEffect } from 'react';

import SendThought from './components/SendThought';
import Thought from './components/Thought';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myLikes, setMyLikes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('likedThoughts')) {
      setMyLikes(JSON.parse(localStorage.getItem('likedThoughts')))
    }
  }, [])
  useEffect(() => {
    setLoading(true);
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [], thoughts);
  useEffect(() => {
    if (myLikes.length > 0) {
      localStorage.setItem('likedThoughts', JSON.stringify(myLikes));
    }
  }, [myLikes]);
  return (
    <div className="wrapper">
      <section className="send-thought">
        <h1>What is making you happy right now?</h1>
        <SendThought setThoughts={setThoughts} />
      </section>
      <section className="all-thoughts">
        {loading && <div className="loading">Loading happy thoughts..</div>}
        {!loading && (
          <ul className="list-thoughts">
            {thoughts.map((thought) => (
              <Thought
                // eslint-disable-next-line no-underscore-dangle
                key={thought._id}
                // eslint-disable-next-line no-underscore-dangle
                id={thought._id}
                message={thought.message}
                date={thought.createdAt}
                hearts={thought.hearts}
                setMyLikes={setMyLikes}
                myLikes={myLikes} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
