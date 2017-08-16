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
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('<h3>Thanks for voting!</h3>');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // set path pattern wanted
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
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
      // Iterate and run query
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

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

  app.delete('/api/surveys/:surveyId', requireLogin, async (req, res) => {
    console.log(req);
    try {

      const survey = await Survey.findOneAndRemove({
        _id: req.body.params.surveyId
      });

      if (!survey) {
        return res.status(404).send();
      }

      const response = {
        message: "Survey successfully deleted",
        surveyId: survey._id
      };

      res.send(response);
    } catch (e) {
        res.status(400).send();
    };
  });
};
