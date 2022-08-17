import http from 'http';
import { config } from 'dotenv';
import app from './app.js';
config();

const port = process.env.PORT || 8080;
// const host = process.env.HOST;

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server listen to http://localhost:8080');
})