import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { API_PATH } from '../core/constants';
import swaggerSpec from '../swaggerConfig';

class DocRoute {
    public path = API_PATH.API_DOCS;
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(this.path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}

export default DocRoute;
