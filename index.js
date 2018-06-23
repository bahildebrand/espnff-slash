"use strict";
const EspnFF = require('espn-ff');
const config = require("./config.json");

function buildSlackMessage(results){
    var slackObj = {};
    slackObj.attachments = [];

    results.forEach(function(result){
        var match = {};
        match.fallback = "shit is fucked";
        match.title = result.away_team.name + " @ " + result.home_team.name;

        var away_score = result.away_team.short_name + ": " + result.away_team.projected_points;
        var home_score = result.home_team.short_name + ": " + result.home_team.projected_points;

        match.text = away_score + "\t" + home_score;

        slackObj.attachments.push(match);
    });

    return JSON.stringify(slackObj);
}

exports.ffSlash = (req, res) => {
    const scraper = new EspnFF({
        leagueId: config.LEAGUE_ID /* Your league id */
    });

    function getAPIResult() {
        return new Promise( (resolve, reject) => {
            scraper.getMatchups(null, (err, matchups) => {
                if(err){
                    reject(err);
                }
                else{
                    var resultObj = buildSlackMessage(matchups);
                    resolve(resultObj);
                }
            })
        });
    }

  getAPIResult()
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