const express = require('express');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
})