const express = require('express'); //middleware, routing, HTTP requests, template engines, static file sharing, RESTfulAPIs
const session = require('express-session'); //session management, session persistence, cookie handling
const exphbs = require('express-handlebars'); //template rendering, layouts, partials, helpers

const routes = require('./routes');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Server listening on: http://localhost:" + PORT));
});
