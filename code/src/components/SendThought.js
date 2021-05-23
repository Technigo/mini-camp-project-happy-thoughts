import React, { useState } from 'react';
import { API_URL } from 'Urls.js';

const SendThought = (props) => {
  const [message, setMessage] = useState('');
  const charactersLeft = 144 - message.length;
  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        props.setThoughts((prevData) => [data, ...prevData]);
      })
      .catch((err) => console.log(err.message));
    setMessage('');
  }
  return (
    <form className="form-send-thought" onSubmit={handleSubmit}>
      <div className="characters-left">{charactersLeft}</div>
      <textarea
        value={message}
        className="textarea"
        id="textarea-new-thought"
        name="textarea-new-thought"
        aria-label="textarea-new-thought"
        onChange={handleChange} />
      <button
        type="submit"
        className="button-submit-thought"
        disabled={message.length < 5 || message.length > 144}>
          Send Happy Thought
      </button>
    </form>
  )
};
export default SendThought;
