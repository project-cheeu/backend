import DeptService from './dept.serivce';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';

let DeptServiceInstance = Container.get(DeptService);
export default [
  /**
   * [POST] /dept
   * [Description] 회사 부서 등록
   * @param {dept_nm, company_id, dept_manager} body
   */
  {
    path: '/dept',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await DeptServiceInstance.insertDept(req.body);
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
   * @title /dept/:company_id
   * @method GET
   * @description 회사 부서 정보 조회
   * @param company_id:String
   */
  {
    path: '/dept/:company_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await DeptServiceInstance.getDeptList(company_id);
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
   * [PUT] /dept
   * [Description] 회사 부서 수정
   * @param {dept_nm, company_id, dept_manager, modify_at} body
   */
  {
    path: '/dept',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await DeptServiceInstance.updateDept(req.body);
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
   * [DELETE] /dept
   * [Description] 회사 부서 삭제
   * @param {company_id, dept_id} body
   */
  {
    path: '/dept',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await DeptServiceInstance.deleteDept(req.body);
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
   * @title /dept/member
   * @method POST
   * @description 부서 사원 등록
   * @param {} body
   */
  {
    path: '/dept/member',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await DeptServiceInstance.registDeptMember(req.body);
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
   * @title /dept/member
   * @method PUT
   * @description 부서 사원 등록
   * @param {} body
   */
  {
    path: '/dept/member',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await DeptServiceInstance.updateDeptMember(req.body);
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
   * @title /dept/member
   * @method DELETE
   * @description 부서 사원 삭제
   * @param {} body
   */
  {
    path: '/dept/member',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await DeptServiceInstance.unregistDeptMember(
          req.body
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
];
