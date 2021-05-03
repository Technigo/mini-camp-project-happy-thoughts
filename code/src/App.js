import React, { useState, useEffect } from 'react'

import SendThought from './components/SendThought';
import Thought from './components/Thought';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <SendThought />
      <section id="thoughts">
        {loading && <p>Data is loading</p>}
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
                hearts={thought.hearts} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
