/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react';

import './Submission.css';

export default function Submission(props) {
  const [submissionText, setSubmissionText] = useState(
    localStorage.getItem('localStorageText') || ''
  );

  useEffect(() => {
    localStorage.setItem('localStorageText', submissionText);
  }, [submissionText]);

  function submit(e) {
    e.preventDefault();

    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: submissionText })
    })
      .then((response) => {
        props.setNeedsUpdating(true);
        setSubmissionText('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function submissionUpdater(e) {
    if (e.target.value.length <= 140) {
      setSubmissionText(e.target.value);
    }
    const currHeight = `${e.target.scrollHeight}px`;
    e.target.style.height = currHeight;
  }

  return (
    <form className="submit" onSubmit={(e) => submit(e)}>
      <textarea
        id="submissionfield"
        value={submissionText}
        onChange={(e) => submissionUpdater(e)}
        placeholder="Share your own thought..."
        type="text"
        rows="1" />
      <div className="bar">
        <button
          disabled={!(submissionText.length >= 5)}
          type="submit">
          Post
        </button>
        <p className="characterCount">
          <b>{140 - submissionText.length}</b> characters left
        </p>
      </div>
    </form>
  );
}
