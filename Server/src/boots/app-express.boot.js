import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
// import routers
import routes from '../routes/index.routes';
// import response
import {
    ResponseConfig
} from '../config/response-config/response.config';

export function AppExpress() {
    const app = express();

    app.disable('x-powered-by');
    // logger
    app.use(morgan('dev'));

    app.use(bodyParser.json());

    app.use(cors());

    app.use(ResponseConfig.middlewareResponse);

    app.use('/', routes);

    return app;
}
