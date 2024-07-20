const path = require('path'); //import the built-in 'path' module providing utilities for working with file and directory paths

const express = require('express'); //middleware, routing, HTTP requests, template engines, static file sharing, RESTfulAPIs
const session = require('express-session'); //session management, session persistence, cookie handling
const exphbs = require('express-handlebars'); //template rendering, layouts, partials, helpers

const SequelizeStore = require('connect-session-sequelize')(session.Store); //configures a session store that uses Sequelize to persist session data in a SQL database

const routes = require('./controllers'); //imports controllers module containing route handlers for application
const sequelize = require('./config/connection.js'); //imports sequelize module that establishes a connection with the database, defines models, queries the database, manages data
const helpers = require('./utils/helpers');


//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

//middleware to handle session management
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };
  
app.use(session(sess));
  

const hbs = exphbs.create({ helpers }); //initializes an instance of handlebars engine

//set handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//middleware to handle json and url-encoded (form) data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware that serves static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes); //sets up middleware for handling routes


//starts the server to begin listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Server listening on: http://localhost:" + PORT));
});
