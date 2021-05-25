import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';

import ThoughtForm from './components/ThoughtForm';
import Thought from './components/Thought';
import { API_URL } from './constants';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(jsonData => setThoughts(jsonData))
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <ThoughtForm setThoughts={setThoughts} />
        <hr />
        {
          thoughts.map((thought) => (
            <Thought 
              key={thought._id}
              id={thought._id}
              message={thought.message}
              hearts={thought.hearts}
              time={thought.createdAt} />
          ))
        }
      </Container>
    </>
  )
}