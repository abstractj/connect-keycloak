var Keycloak = require('../'),
    express = require('express'),
    session = require('express-session');

var keycloak = new Keycloak();
keycloak.loadConfig( /* defaults to ./keycloak.json */ );

var app = express();

app.use(session({
  secret: 'aaslkdhlkhsd',
  resave: false,
  saveUninitialized: true,
}))

// Wire up Keycloak generally for the application

app.use( keycloak.middleware({
  logout: '/logout', /* user-accessible logout link */
  admin: '/', /* root URL for keycloak admin callbacks */
}) );

var myHandler = function (req, res) {
  res.end('Hello from Connect!\n');
}

// protect a sub-portion with specifically-applied middleware
app.get( '/admin/*', keycloak.protect(), myHandler);
