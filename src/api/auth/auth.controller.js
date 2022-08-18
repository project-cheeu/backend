import AuthService from './auth.service';
import { Container } from 'typedi';
import JWTManager from '../../utils/JWTManager';
import companyAssetsController from '../company.assets/company.assets.controller';

let AuthServiceInstance = Container.get(AuthService);
export default [
  {
    path: '/verify',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { token } = req.body;
        const JM = new JWTManager();
        const result = await JM.verify(token);
        if (!result) {
          return res.status(403).json({
            resultMessage: 'Forbidden',
            resultCode: 403,
            resultData: result,
          });
        }
        return res.status(200).json({
          resultMessage: 'Success',
          resultCode: 200,
          resultData: result,
        });
      } catch (error) {
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
  {
    path: '/signin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await AuthServiceInstance.login(req.body);

        const { code, data, message } = result;
        res.status(code).json({
          resultCode: code,
          resultData: data,
          resultMessage: message,
        });
      } catch (error) {
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
  {
    path: '/signin/manager',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await AuthServiceInstance.managerLogin(req.body);

        const { code, data, message } = result;
        res.status(code).json({
          resultCode: code,
          resultData: data,
          resultMessage: message,
        });
      } catch (error) {
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
  {
    path: '/getToken',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const JM = new JWTManager();

        const token = await JM.createSign({ user: 'oneupcreative' }, '720h');
        //console.log('token: ', token);
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData: { token: token },
        });
      } catch (error) {
        // console.log(error);
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
];
