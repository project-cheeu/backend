import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import WaitService from './wait.service';
let WaitServiceInstance = Container.get(WaitService);

export default [
  /**
   * [GET] 대기화면 병원 정보 점검
   * --
   */
  {
    path: '/wait/check/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await WaitServiceInstance.checkCompany(req.params);
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData,
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'failed',
          data: error,
        });
      }
    },
  },
  /**
   * [GET] 병원 대기 환자 목록 조회
   * --
   */
  {
    path: '/wait/list/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await WaitServiceInstance.getWaitList(req.params);
        return res.status(200).json({
          resultCode: 200,
          resultMessage: 'success',
          resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          resultMessage: 'failed',
          resultData: error,
        });
      }
    },
  },
];
