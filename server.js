const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const mainRoutes = require('./routes/index');
const chatRoutes = require('./routes/chatRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})