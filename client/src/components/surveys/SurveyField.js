// SurveyField contains logic to render single label and text input
import React from 'react';

// Pull off input from props object
export default ({ input }) => {
  // Use spread operator to pass everything to input tag
  return (
    <div>
      <input {...input} />
    </div>
  );
};
