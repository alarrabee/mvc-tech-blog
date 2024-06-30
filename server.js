const path = require('path');
const express = require('express'); //middleware, routing, HTTP requests, template engines, static file sharing, RESTfulAPIs
const session = require('express-session'); //session management, session persistence, cookie handling
const exphbs = require('express-handlebars'); //template rendering, layouts, partials, helpers
const SequelizeStore = require('connect-session-sequelize')(session.Store); //configures a session store that uses Sequelize to persist session data in a SQL database

const routes = require('./controllers');
const sequelize = require('./config/connection.js');

//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

//middleware to handle session management
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 *1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  
app.use(session(sess));

const hbs = exphbs.create();

//set handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware to handle json and url-encoded (form) data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

//starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Server listening on: http://localhost:" + PORT));
});
