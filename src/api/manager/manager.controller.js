import ManagerService from './manager.service';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';

let ManagerServiceInstance = Container.get(ManagerService);
export default [
  {
    path: '/manager',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await ManagerServiceInstance.insertManager(req.body);
        return res.status(200).json({
          resultCode: 200,
          resultData: result,
          resultMessage: 'Success',
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
    path: '/manager/check',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await ManagerServiceInstance.checkManager();

        if (result === 0) {
          throw result;
        }
        return res.status(200).json({
          resultCode: 200,
          resultData: result,
          resultMessage: 'Success',
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
    path: '/manager',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await ManagerServiceInstance.getManagerList();
        return res.status(200).json({
          resultCode: 200,
          resultData: result,
          resultMessage: 'Success',
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
    path: '/manager',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await ManagerServiceInstance.updateManager(req.body);
        return res.status(200).json({
          resultCode: 200,
          resultData: result,
          resultMessage: 'Success',
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
    path: '/manager',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await ManagerServiceInstance.deleteManager(req.body);
        return res.status(200).json({
          resultCode: 200,
          resultData: result,
          resultMessage: 'Success',
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
];
