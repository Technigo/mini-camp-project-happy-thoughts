import React from 'react'

import Textarea from './Textarea';

const SendThought = () => {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit new thought');
  }
  return (
    <section id="new-thought">
      <form onSubmit={handleSubmit}>
        <Textarea />
        <button type="submit" className="submit-thought">Send Happy Thought</button>
      </form>
    </section>
  )
};
export default SendThought;
