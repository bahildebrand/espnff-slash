"use strict";
const config = require('./config.json');
const ESPNWrapper = require('./espn_wrapper');

function verifyFromSlack(msg) {
    if (!msg || msg.token !== config.SLACK_TOKEN) {
        const error = new Error('Invalid credentials');
        error.code = 401;
        throw error;
      }
}

exports.ffSlash = (req, res) => {
    // verifyFromSlack(req.body);

    var espn = new ESPNWrapper(config.LEAGUE_ID, res);
    espn.getMatchups()
    .then(function(result){
        res
        .status(200)
        .type("application/json")
        .send(result)
        .end()
    })
    .catch(function(error){
        res
        .status(400)
        .type("application/json")
        .send(error)
        .end()
    });
}