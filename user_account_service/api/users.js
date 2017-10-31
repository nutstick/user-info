//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

var request = require('request');

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  // app.get('/users', (req, res, next) => {
  //   options.repository.getUsers().then((users) => {
  //     res.status(200).send(users.map((user) => { return {
  //         email: user.email,
  //         phoneNumber: user.phone_number
  //       };
  //     }));
  //   })
  //   .catch(next);
  // });

  // app.get('/search', (req, res, next) => {

  //   //  Get the email.
  //   var email = req.query.email;
  //   if (!email) {
  //     throw new Error("When searching for a user, the email must be specified, e.g: '/search?email=homer@thesimpsons.com'.");
  //   }

  //   //  Get the user from the repo.
  //   options.repository.getUserByEmail(email).then((user) => {

  //     if(!user) { 
  //       res.status(404).send('User not found.');
  //     } else {
  //       res.status(200).send({
  //         email: user.email,
  //         phoneNumber: user.phone_number
  //       });
  //     }
  //   })
  //   .catch(next);

  // });

  app.get('/', (req, res, next) => {

    // Get the username
    var username = req.query.username;
    if (!username) {
      throw new Error("When searching for a user, the email must be specified, e.g: '/?username=alice'.");
    }

    // Get the user from the repo.
    options.repository.getUserByUsername(username).then((user) => {

      if (!user) {
        res.status(404).send('User not found.');
      } else {
        // Query profile_image
        request({
          uri: 'http://asset_service:8122',
          qs: {
            uname: username,
          },
        }, function(err, response, body) {
          if (err) {
            res.status(500).send(error);
          } else if (body) {
            var json = JSON.parse(body);
            
            res.status(200).send({
              username: user.username,
              phone_number: user.phone_number,
              profile_image: json.profile_image
            });
          } else {
            res.status(200).send({
              username: user.username,
              phone_number: user.phone_number,
              profile_image: null
            })
          }
        });
      }

    })
    .catch(next);

  })
};