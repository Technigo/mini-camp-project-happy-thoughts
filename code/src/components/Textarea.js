import React, { useState } from 'react';

import './Textarea.css';

const Textarea = () => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  return (
    <textarea
      value={value}
      className="textarea"
      id="textarea-new-thought"
      name="textarea-new-thought"
      aria-label="textarea-new-thought"
      onChange={handleChange} />
  );
};
export default Textarea;
