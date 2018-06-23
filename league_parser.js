const EspnFF = require('espn-ff');
const config = require("./config.json");

// Create a scraper instance
// NOTE: For public leagues, you do not need `cookie`, for private you will

// scraper.getFantasyTeams((err, teams) => {
//     console.log('TEAMS');
//     console.dir(teams);
// });

// scraper.getRoster(12, (err, roster) => {
//     console.log('Team 1 roster');
//     console.dir(roster);
// });

function buildSlackMessage(results){
    slackObj = {};
    slackObj.attachments = [];
    results.forEach(function(result){
        match = {};
        match.fallback = "shit is fucked";
        match.title = result.away_team.name + " @ " + result.home_team.name;

        away_score = result.away_team.short_name + ": " + result.away_team.projected_points;
        home_score = result.home_team.short_name + ": " + result.home_team.projected_points;

        match.text = away_score + "\t" + home_score;

        slackObj.attachments.push(match);
    });

    return JSON.stringify(slackObj);
}

const scraper = new EspnFF({
    leagueId: config.LEAGUE_ID /* Your league id */
});

scraper.getMatchups(null, (err, matchups) => {
    console.log(buildSlackMessage(matchups));
});