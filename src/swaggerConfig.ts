import { glob } from 'glob';
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const apiPaths =
    process.env.NODE_ENV === 'production'
        ? ['./dist/modules/**/*.route.ts']
        : ['./src/modules/**/*.route.ts'];

const files = apiPaths.flatMap((path) => glob.sync(path));
console.log('Swagger files:', files);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'Authentication API documentation',
            contact: {
                email: 'loinguyenlamthanh@gmail.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            {
                name: 'Migrate',
                description: 'Migrate related endpoints',
            },
            {
                name: 'Auth',
                description: 'Authentication related endpoints',
            },
            {
                name: 'User',
                description: 'User related endpoints',
            },
        ],
    },
    apis: ['./src/modules/**/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
console.log('process.env.NODE_ENV:', JSON.stringify(process.env.NODE_ENV));

// Convert JSON spec to YAML
const swaggerYaml = yaml.dump(swaggerSpec);

// Define the output path for the YAML file
const outputPath = path.resolve(__dirname, '../swagger.yaml');

// Write the YAML file to disk
fs.writeFileSync(outputPath, swaggerYaml, 'utf8');
console.log('Swagger YAML file generated at:', outputPath);

export default swaggerSpec;
