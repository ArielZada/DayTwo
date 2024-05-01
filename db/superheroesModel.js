const db = require('./dbConnection');

const provider = db.provider;
const superHeroesSchema = provider.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    alias: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    powers: {
        type: Array,
        required: true,
    },
    weaknesses: {
        type: Array,
        default: undefined
    },
    foes:{
        type: Array,
        default: undefined
    }
});
superHeroesSchema.plugin(db.timestamp);
const SuperHeroes = provider.model('SuperHeroes', superHeroesSchema);
module.exports = SuperHeroes;
