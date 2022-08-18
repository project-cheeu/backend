import CustomerService from './customer.serivce';
import MedicalTablbeService from '../medical.table/medical.table.service';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import Alimtalk from '../../utils/alimtalk/alimtalk';
let CustomerServiceInstance = Container.get(CustomerService);
let MedicalTablbeServiceInstance = Container.get(MedicalTablbeService);

export default [
  /**
   * @title /customer
   * @method POST
   * @description 사용자 등록
   * @param { customer_nm, customer_tel customer_addr, customer_num, agree_date, access_platform, company_id } body
   */
  {
    path: '/customer',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.insertCustomer(
          req.body
        );
        // console.log(resultData);
        if (resultData) {
          const [rresult] = await MedicalTablbeServiceInstance.getAlimtalkData(
            resultData
          );
          // console.log(rresult);
          const alim = new Alimtalk();
          await alim.sendMessageNewFace(rresult);
        }

        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
   * @title /customer/:company_id
   * @method GET
   * @description 사용자 전체 조회
   * @param {}
   */
  {
    path: '/customer',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerAll();
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
  /**
   * @title /customer/search/:customer_tel
   * @method POST
   * @description 사용자 가입여부 조회
   * @param {}
   */
  {
    path: '/customer/search',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { customer_tel } = req.body;
        const resultData = await CustomerServiceInstance.searchCustomer(
          customer_tel
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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

  /**
   * @title /customer/recently/:customer_id
   * @method POST
   * @description 고객 최근 방문 병원
   * @param {}
   */
  {
    path: '/customer/recently/:customer_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerRecently(
          req.params
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
  /**
   * FIXME
   * @title /customer/:company_id
   * @method GET
   * @description 회사별 사용자 전체 조회
   * @param {company_id} params
   */
  {
    path: '/customer/:company_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await CustomerServiceInstance.getCustomer(
          company_id
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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

  /**
   * @title /customer/detail
   * @method POST
   * @description 사용자 상세정보 등록
   * @param { customer_id, visiting_path, medical_history, customer_insurance } body
   */
  {
    path: '/customer/detail',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        // console.log(req.body);
        const resultData = await CustomerServiceInstance.insertCustomerDetail(
          req.body
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
   * [PUT] 사용자 상세 정보 수정
   * --
   */
  {
    path: '/customer/detail',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.updateCustomerDetail(
          rea.body
        );
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: resultData,
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
   * @title /customer/:company_id/:customer_id
   * @method GET
   * @description 사용자 상세 조회
   * @param {customer_id, company_id} params
   */
  {
    path: '/customer/:company_id/:customer_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerDetail(
          req.params
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
   * @title /customer/medical/:customer_id
   * @method GET
   * @description 사용자 상세 조회
   * @param {customer_id} params
   */
  {
    path: '/customer/medical/:customer_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerMedical(
          req.params
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
   * @title /customer
   * @method PUT
   * @description 사용자 수정
   * @param {customer_id, customer_nm, customer_tel, customer_addr, member_id} body
   */
  {
    path: '/customer',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.updateCustomer(
          req.params
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
  /**
   * @title /customer
   * @method DELETE
   * @description 사용자 삭제
   * @param { customer_id,customer_num } body
   */
  {
    path: '/customer',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.deleteCustomer(
          req.params
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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

  /**
   * @title /customer/single
   * @method POST
   * @description 사용자 다중 등록
   */
  {
    path: '/customer/single',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.insertSingleCustomer(
          req.body
        );

        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
   * @title /customer/bulk
   * @method POST
   * @description 사용자 다중 등록
   */
  {
    path: '/customer/bulk',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.insertBulkCustomer(
          req.body
        );

        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
        });
      } catch (error) {
        // console.log(error);
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error.message,
        });
      }
    },
  },

  /**
   * [POST] 회원 의료정보 최초 등록
   * --
   */
  {
    path: '/customer/emergency',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await CustomerServiceInstance.insertCustomerEmergency(req.body);
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: resultData,
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
   * [PUT] 회원정보 수정
   * --
   */
  {
    path: '/customer/emergency',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.putCustomerEmergency(
          req.body
        );
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: resultData,
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
   * [GET] 고객 덤프 데이터 조회
   * --
   */
  {
    path: '/dump/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerDumpList(
          req.params
        );
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
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
   * [GET] 고객 덤프 데이터 조회
   * --
   */
  {
    path: '/dump/search/:company_id/:customer_tel',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.searchCustomerDump(
          req.params
        );
        return res.status(200).json({
          resultCode: 200,
          message: 'success',
          resultData: resultData,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message: 'failed',
          data: error,
        });
      }
    },
  },
];
