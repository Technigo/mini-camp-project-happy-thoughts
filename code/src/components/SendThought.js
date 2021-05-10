import React, { useState } from 'react'

const SendThought = ({ setThoughts }) => {
  const [message, updateMessage] = useState('');
  const charactersLeft = 144 - message.length;
  const handleChange = (e) => {
    updateMessage(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then((data) => {
        setThoughts((prevData) => [data, ...prevData]);
      })
      .catch((err) => console.log(err.message));
    updateMessage('');
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
