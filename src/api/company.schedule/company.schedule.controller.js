import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import CompanyScheduleService from './company.schedule.service';
let CompanyScheduleServiceInstance = Container.get(CompanyScheduleService);

export default [
  /**
   * [POST] 회사 예약 스케쥴 등록
   * --
   */
  {
    path: '/schedule',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyScheduleServiceInstance.insertSchedule(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          message: 'failed',
          resultData: error,
        });
      }
    },
  },
  /**
   * [GET] 회사별 예약 조회
   * --
   */
  {
    path: '/schedule/company/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await CompanyScheduleServiceInstance.getScheduleByCompany(req.params);
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          message: 'failed',
          resultData: error,
        });
      }
    },
  },

  /**
   * [PUT] 회사별 예약 수정
   * --
   */
  {
    path: '/schedule',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyScheduleServiceInstance.updateSchedule(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          message: 'failed',
          resultData: error,
        });
      }
    },
  },

  /**
   * [DELETE] 회사 예약 삭제
   * --
   */
  {
    path: '/schedule',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CompanyScheduleServiceInstance.deleteSchedule(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          message: 'failed',
          resultData: error,
        });
      }
    },
  },

  /**
   * [PUT] 회사 예약 긴급 정지
   * --
   */
  {
    path: '/schedule/emergency',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await CompanyScheduleServiceInstance.emergencyStopSchedule(req.body);
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          message: 'failed',
          resultData: error,
        });
      }
    },
  },

  /**
   * [DELETE] 회사 예약 정지 복구
   * --
   */
  {
    path: '/schedule/recovery',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        console.log(req.body);
        const resultData =
          await CompanyScheduleServiceInstance.recoverySchedule(req.body);
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          resultCode: 500,
          message: 'failed',
          resultData: error,
        });
      }
    },
  },
];
