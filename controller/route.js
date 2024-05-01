const superheroes = require('./superheroes');
const timers = require('./timers');
const base = require('./base');

module.exports.initRoutes = (app) => {
    app.use(superheroes);
    app.use(timers);
    app.use(base);
}
