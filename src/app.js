/**
 * app.js
 * --
 * 2020-07-02 @seongh7800
 */

import '../env/env';
import dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
/* Swagger */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './config/swaggerConfig';
/* Routes */
import { routes } from './api';
/* ORM */
import models from './models';
/* Loging */
import morgan from 'morgan';
import { logger, stream } from './utils/winstonLogger';
// session
import session from 'cookie-session';
// 파일매니저 multer
import multer from 'multer';

// 스케쥴러
import autoPurchase from './utils/AutoPurchase';

/* ENV setup */
dotenv.config();
/* express setup */
const app = express();
/* log color setup */
const errMessageColor = '\x1b[33m%s\x1b[0m';
/* swagger setup */
const swaggerSpec = swaggerJSDoc(swaggerConfig());

/* Sequelize init */
if (process.env.DB_SYNC && process.env.DB_SYNC === 'true') {
  models.sequelize
    .sync()
    .then(() => {
      console.log('Sequelize Success');
    })
    .catch((err) => {
      console.log('Sequelize Error : ', err);
    });
} else {
  console.log('not sync');
}
app.disable('x-powered-by');

// CORS 허용
app.use(cors());
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'http://localhost:3001',
//       'http://localhost:3333',
//       'https://api.oneup.codebrewing.co.kr',
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, // enable set cookie
//   })
// );

// 세션/쿠키설정
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      // domain: 'example.com',
      // path: 'foo/bar',
      expires: expiryDate,
    },
  })
);

const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * HTTP Logging
 * --
 * 로깅옵션별 양식
  - combined 
  [:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"]
  - common 
  [:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]]
  - dev 
  [:method :url :status :response-time ms - :res[content-length]]
  - short
  [:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms]
  - tiny
  [:method :url :status :res[content-length] - :response-time ms]
 */

app.use(morgan('combined', { stream }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/* 스웨거 라우터 */
app.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Routes */
routes.forEach((route) => {
  // app[route.method](route.path, [...route.middleware], route.controller);
  if (route.file)
    app[route.method](
      route.path,
      [
        ...route.middleware,
        route.file === 'single'
          ? upload.single('file')
          : upload.array('files', 10),
      ],
      route.controller
    );
  else app[route.method](route.path, [...route.middleware], route.controller);
});

// Scheduler 생성
// autoPurchase.test();
// autoPurchase.cancel();
autoPurchase.purchase();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    logger.error(`[Global error handler] Error: ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(errMessageColor, '----------------------------------------');
      console.log('Error Message: \x1b[33m%s\x1b[0m', err.message);
      console.log(errMessageColor, '----------------------------------------');

      /* 에러메시지 전체보기를 하려면 아래코드 주석해제 */
      // console.log('Error : ', err);
    }
  }
  res.status(err.status || 500);
  res.send({
    resultCode: err.status || 500,
    error: err,
  });
});

module.exports = app;
