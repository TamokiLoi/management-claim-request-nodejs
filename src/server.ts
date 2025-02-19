import dotenv from 'dotenv';
import App from './app';
import { validateEnv } from './core/utils';
import { AuthRoute } from './modules/auth';
import { ContractRoute } from './modules/contract';
import { EmployeeRoute } from './modules/employee';
import { IndexRoute } from './modules/index';
import { JobRoute } from './modules/job';
import { MigrateRoute } from './modules/migrate';
import { ProjectRoute } from './modules/project';
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
    new ContractRoute(),
    new UserRoute(),
    new EmployeeRoute(),
    new ProjectRoute()
];

const app = new App(routes);

app.listen();
