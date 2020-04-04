const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

const mainRoutes = require('./routes/index');
const chatRoutes = require('./routes/chatRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(mainRoutes);
app.use(chatRoutes);
app.use(loginRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})