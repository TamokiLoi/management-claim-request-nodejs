import dotenv from 'dotenv';
import App from './app';
import { validateEnv } from './core/utils';
import { IndexRoute } from './modules/index';
import { MigrateRoute } from './modules/migrate';
import { RoleRoute } from './modules/role';
import { UserRoute } from './modules/user';

dotenv.config();

validateEnv();

const routes = [new IndexRoute(), new MigrateRoute(), new RoleRoute(), new UserRoute()];

const app = new App(routes);

app.listen();
