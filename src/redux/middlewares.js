import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const middlewares = [];
const logger = createLogger();
middlewares.push(logger, thunk);

export default middlewares;
