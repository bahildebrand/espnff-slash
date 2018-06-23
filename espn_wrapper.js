const EspnFF = require('espn-ff');

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

class ESPNWrapper {
    constructor(leagueID, res) {
        this.res = res;
        this.scraper = new EspnFF({
            leagueId: leagueID
        });
    }

    getMatchups() {
        return new Promise( (resolve, reject) => {
            this.scraper.getMatchups(null, (err, matchups) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    console.log(matchups);
                    var resultObj = buildSlackMessage(matchups);
                    resolve(resultObj);
                }
            })
        });
    }
}

module.exports = ESPNWrapper;