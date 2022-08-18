import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ReservationService from './reservation.service';
let ReservationServiceInstance = Container.get(ReservationService);

export default [
  /**
   * [POST] 예약 등록
   * --
   */
  {
    path: '/reservation',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ReservationServiceInstance.insertReservation(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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

  /**
   * [GET] 예약 전체 목록 조회
   * --
   */
  {
    path: '/reservation/all',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await ReservationServiceInstance.getReservationListAll();
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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

  /**
   * [GET] 고객별 예약조회
   * --
   */
  {
    path: '/reservation/customer/:customer_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await ReservationServiceInstance.getReservationListByCustomer(
            req.params
          );
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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

  /**
   * [GET] 병원별 예약 조회
   * --
   */
  {
    path: '/reservation/company/:company_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        console.log(req.params);
        const resultData =
          await ReservationServiceInstance.getReservationListByCompnay(
            req.params
          );
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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

  /**
   * [PUT] 예약 정보 수정
   * --
   */
  {
    path: '/reservation',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ReservationServiceInstance.updateReservation(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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

  /**
   * [PUT] 예약 완료 처리
   * --
   */
  {
    path: '/reservation/done',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        console.log(1);
        const resultData = await ReservationServiceInstance.doneReservation(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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

  /**
   * [PUT] 예약 취소 처리
   * --
   */
  {
    path: '/reservation/cancel',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await ReservationServiceInstance.cancelReservation(
          req.body
        );
        return res.status(200).json({
          resultCode: 200,
          resultData: resultData,
          resultMessage: 'Success',
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
