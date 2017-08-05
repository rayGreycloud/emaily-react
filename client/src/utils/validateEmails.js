// function to validate email addresses
// regex to validate address from emailregex.com
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmails = emails
    // convert from string to array of emails
    .split(',')
    // remove spaces
    .map(email => email.trim())
    // filter emails with regex
    .filter(email => re.test(email) === false);
  // return error message if invalid address
  if (invalidEmails.length > 0) {
    return `The following email addresses are invalid: ${invalidEmails}`;
  }
  // else just return
  return;
};
