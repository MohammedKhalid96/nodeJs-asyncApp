const express = require('express');
const hbs = require('hbs'); // handlebars
const fs = require('fs');

const port = process.env.PORT || 3000; // for heroku
var app = express();

// partials 
hbs.registerPartials(__dirname + '/views/partials')
app.set('View engine', 'hbs');

// middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`; 
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// middleware to stop the site nothing will be excuted after this middleware..
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// get current year
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// home page
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome!',
        welcomeMessage: 'Hello!',
    });
});

// new route
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page!',
    });
});

// test 
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

// listen to porn no. 3000
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});