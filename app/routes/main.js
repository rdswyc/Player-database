module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("index.html")
    });
    app.get("/birthday", function (req, res) {
        const query = "Select p.FullName, n.Name As Nationality, t.Name As Team, p.BirthDate From Player p Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Where DAY(BirthDate) = DAY(CURDATE()) And MONTH(BirthDate) = MONTH(CURDATE()) Order By p.FullName;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("birthday.html", { players: result });
        });
    });
    app.get("/talest", function (req, res) {
        const query = "Select p.FullName, n.Name As Nationality, t.Name As Team, p.Height From Player p Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Order By p.Height DESC Limit 10;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("talest.html", { players: result });
        });
    });
    app.get("/heaviest", function (req, res) {
        const query = "Select p.FullName, n.Name As Nationality, t.Name As Team, p.Weight From Player p Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Order By p.Weight DESC Limit 10;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("heaviest.html", { players: result });
        });
    });
    app.get("/heaviest", function (req, res) {
        const query = "Select p.FullName, n.Name As Nationality, t.Name As Team, p.Weight From Player p Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Order By p.Weight DESC Limit 10;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("heaviest.html", { players: result });
        });
    });
    app.get("/ranking", function (req, res) {
        const query = "Select n.Name, AVG(a.Rating) As Overall, COUNT(p.ID) As Players From Nation n Join Player p On p.Nationality = n.ID Join PlayerAttributes a On a.PlayerId = p.ID Group By p.Nationality Order By Overall DESC;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("ranking.html", { nations: result });
        });
    });
    app.get("/perNation", function (req, res) {
        const query = "Select ID, Name From Nation Order By Name;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("perNation-list.html", { nations: result });
        });
    });
    app.get("/perNation/:id", function (req, res) {
        const id = req.params.id;
        const query = `Select a.JerseyName, t.Name As Team, a.Rating From PlayerAttributes a Join Player p On p.ID = a.PlayerId Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Where n.ID = ${id} Order By a.Rating DESC Limit 11;`;
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            const nation = req.query.nation;
            res.render("perNation-players.html", { players: result, nation });
        });
    });
    app.get("/perPosition", function (req, res) {
        const query = "Select Label, Description From Position;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("perPosition-list.html", { positions: result });
        });
    });
    app.get("/perPosition/:label", function (req, res) {
        const label = req.params.label;
        const query = `Select a.JerseyName, n.Name As Nationality, t.Name As Team, a.Rating From PlayerPositions pp Join Player p On p.ID = pp.PlayerId Join PlayerAttributes a On a.PlayerId = p.ID Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Where pp.PositionLabel = '${label}' Order By a.Rating DESC Limit 10;`;
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            const position = req.query.position;
            res.render("perPosition-players.html", { players: result, position });
        });
    });
    app.get("/perStat", function (req, res) {
        const query = "Select Type, Name From Stat;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("perStat-list.html", { stats: result });
        });
    });
    app.get("/perStat/:type", function (req, res) {
        const type = req.params.type;
        const query = `Select a.JerseyName, n.Name As Nationality, t.Name As Team, s.Value From PlayerStats s Join Player p On p.ID = s.PlayerId Join PlayerAttributes a On a.PlayerId = p.ID Join Nation n On n.ID = p.Nationality Join PlayerContract c On c.PlayerId = p.ID Join Team t On t.ID = c.TeamId Where s.StatType = '${type}' Order By s.Value DESC Limit 10;`;
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            const stat = req.query.name;
            res.render("perStat-players.html", { players: result, stat });
        });
    });
    app.get("/drill", function (req, res) {
        const query = "Select ID, Name From Nation Order By Name;";
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            res.render("drill-nation.html", { nations: result });
        });
    });
    app.get("/drill/:nation", function (req, res) {
        const nationId = req.params.nation;
        const query = `Select ID, Name From League Where NationId = ${nationId};`;
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            const nation = { id: nationId, name: req.query.nation };
            res.render("drill-league.html", { leagues: result, nation });
        });
    });
    app.get("/drill/:nation/:league", function (req, res) {
        const leagueId = req.params.league;
        const query = `Select ID, Name From Team Where LeagueId = ${leagueId} Order By Name;`;
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            const league = { id: leagueId, name: req.query.league, ...req.params };
            res.render("drill-team.html", { teams: result, league });
        });
    });
    app.get("/drill/:nation/:league/:team", function (req, res) {
        const teamId = req.params.team;
        const query = `Select a.JerseyName, a.Rating, a.SkillMoves, a.PreferredFoot, c.Validity From PlayerContract c Join PlayerAttributes a On a.PlayerId = c.PlayerId Where c.TeamId = ${teamId};`;
        db.query(query, (err, result) => {
            if (err) res.redirect("/");
            const team = { id: teamId, name: req.query.team, ...req.params };
            res.render("drill-players.html", { players: result, team });
        });
    });
}