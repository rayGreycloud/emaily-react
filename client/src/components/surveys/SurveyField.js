// SurveyField contains logic to render single label and text input
import React from 'react';

// Pull off input, label, meta from props
// Pull error and touched from meta
export default ({ input, label, meta: { error, touched } }) => {
  // Use spread operator to pass everything to input tag
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
