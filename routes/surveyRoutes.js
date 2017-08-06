const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    // set path pattern wanted
    const p = new Path('/api/surveys/:surveyId/:choice');

    const events = _.chain(req.body)
      .map(({ email, url }) => {
        // pull out url and check against pathname
        const match = p.test(new URL(url).pathname);
        // If defined, return email, surveyId and choice
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      // Remove undefined objects
      .compact()
      // Remove duplicates
      .uniqBy('email', 'surveyId')
      .value();

    console.log(events);

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      // Save survey
      await survey.save();
      // Deduct credit
      req.user.credits -= 1;
      // Save user, get fresh copy
      const user = await req.user.save();
      // Send back updated user model
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
