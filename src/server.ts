import dotenv from 'dotenv';
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

app.listen();
