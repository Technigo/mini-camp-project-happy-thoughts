import React, { useState, useEffect } from 'react'

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div id="messages">
      <p>List of messages:</p>
      {loading ? (
        <p>Data is loading</p>
      ) : (
        <ul>
          {messages.map((message) => (
            // eslint-disable-next-line no-underscore-dangle
            <li key={message._id}>
              {message.message}
              <br />
              {message.createdAt}
              <br />
              <span>{message.hearts}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
};
export default Messages;
