const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    // Create helper to send Mailer object
    this.sgApi = sendgrid(keys.sendGridKey);
    // Set up email properties
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    // built-in method to load email content
    this.addContent(this.body);
    // enable click tracking
    this.addClickTracking();
    // add formatted addresses
    this.addRecipients();
  }
  // Format email addresses
  formatAddresses(recipients) {
    // Note - must wrap destructured {variable} with ()
    // Pull off each recipient
    return recipients.map(({ email }) => {
      // Format address and return
      return new helper.Email(email);
    });
  }
  // Click tracking
  addClickTracking() {
    // create helper instance
    const trackingSettings = new helper.TrackingSettings();
    // turn tracking on
    const clickTracking = new helper.ClickTracking(true, true);
    // Set tracking on
    trackingSettings.setClickTracking(clickTracking);
    // Add setting
    this.addTrackingSettings(trackingSettings);
  }
  // Add formatted addresses to email
  addRecipients() {
    // define helper
    const personalize = new helper.Personalization();
    // iterate over recipient list
    this.recipients.forEach(recipient => {
      // Add recipient to personalize object
      personalize.addTo(recipient);
    });
    // Add personalize object with recipients to email
    this.addPersonalization(personalize);
  }

  // Take mailer and transmit to sendgrid
  async send() {
    // Create request
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    // Send request
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
