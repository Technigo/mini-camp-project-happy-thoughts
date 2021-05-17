import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import ThoughtForm from './components/ThoughtForm';
import Thought from './components/Thought';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then(res => res.json())
      .then(jsonData => setThoughts(jsonData))
  }, [], thoughts);

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}