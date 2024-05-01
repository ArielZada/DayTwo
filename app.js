const express = require('express');
const cors = require('cors')
const {API} = require('./config');
const routes = require('./controller/route');
const dbConnection = require("./db/dbConnection");
const jobs = require("./jobs/jobs");

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

routes.initRoutes(app);

const server = app.listen(API.PORT, async () => {
    console.log(`Listening on port: ${API.PORT}`);
    const connected = await dbConnection.connectToDb();
    if (connected) {
        await jobs.runJobs();
    }
});

server.on('error', (error) => {
    console.error('Server error:', error);
});
