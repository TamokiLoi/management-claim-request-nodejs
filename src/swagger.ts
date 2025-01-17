import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';
import express from 'express';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.SWAGGER_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Swagger running at http://localhost:${PORT}/api-docs`);
});
