import dotenv from 'dotenv';
import App from './app';
import { validateEnv } from './core/utils';
import { AuthRoute } from './modules/auth';
import { IndexRoute } from './modules/index';
import { JobRoute } from './modules/job';
import { MigrateRoute } from './modules/migrate';
import { RoleRoute } from './modules/role';
import { UserRoute } from './modules/user';

dotenv.config();

validateEnv();

const routes = [
    new IndexRoute(),
    new MigrateRoute(),
    new AuthRoute(),
    new RoleRoute(),
    new JobRoute(),
    new UserRoute(),
];

const app = new App(routes);

app.listen();
