import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import App from './app';
import { validateEnv } from './core/utils';
import DocRoute from './modules/api-docs.route';
import { AuthRoute } from './modules/auth';
import { IndexRoute } from './modules/index';
import { MigrateRoute } from './modules/migrate';
import { RoleRoute } from './modules/role';
import { UserRoute } from './modules/user';

dotenv.config();

validateEnv();

const routes = [
    new DocRoute(),
    new IndexRoute(),
    new MigrateRoute(),
    new AuthRoute(),
    new RoleRoute(),
    new UserRoute(),
];

const app = new App(routes);

const server = http.createServer(app.app); // Create HTTP server

app.app.use(
    cors({
        origin: '*', // Allow all origins for testing purposes
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

server.listen(app.port, () => {
    console.log(`Server is running at port ${app.port}`);
});
