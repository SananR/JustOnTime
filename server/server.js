import express from 'express';
import cors from 'cors';
import test from './api/test.route.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/test", test);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

export default app;

//write me a function that connects to the database
function connectToDatabase() {
    mongoose.connect(config.database, { useNewUrlParser: true });
}

//write me a function that starts the server
function startServer() {
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
    });
}

//write me a function that handles the request
function handleRequest() {
    app.use('/', router);
}

//write me a function that starts everything
function start() {
    connectToDatabase();
    startServer();
    handleRequest();
}

//write me a function that stops everything
function stop() {
    mongoose.disconnect();
    app.close();
}
