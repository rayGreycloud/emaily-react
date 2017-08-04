// SurveyField contains logic to render single label and text input
import React from 'react';

// Pull off input and label title from props object
export default ({ input, label }) => {
  // Use spread operator to pass everything to input tag
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} />
    </div>
  );
};
