"use strict";
const config = require('./config.json');
const ESPNWrapper = require('./espn_wrapper');

/**
 * @param  {requsest object} req
 */
function verifyFromSlack(req) {
    if (!req || req.token !== config.SLACK_TOKEN) {
        const error = new Error('Invalid credentials');
        error.code = 401;
        throw error;
      }
}

/**
 * @param  {request object} req
 * @param  {response object} res
 */
exports.ffSlash = (req, res) => {
    // verifyFromSlack(req.body);

    function process_promise(prom) {
        prom
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

    var espn = new ESPNWrapper(config.LEAGUE_ID);
    var promise = espn.getMatchups();

    process_promise(promise);

}