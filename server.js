const express = require('express'); //middleware, routing, HTTP requests, template engines, static file sharing, RESTfulAPIs
// const session = require('express-session'); //session management, session persistence, cookie handling
const exphbs = require('express-handlebars'); //template rendering, layouts, partials, helpers

const routes = require('./routes');
const sequelize = require('./config/connection.js');

//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

//set handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware to handle json and url-encoded (form) data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//starts the server to begin listening
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Server listening on: http://localhost:" + PORT));
});
