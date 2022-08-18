import AgreementService from './agreement.service';
import { Container } from 'typedi';
let AgreementServiceInstance = Container.get(AgreementService);
export default [
  /**
   * @title /agreement
   * @method POST
   * @description 동의서 등록
   */
  {
    path: '/agreement',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AgreementServiceInstance.insertAgreement(
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
  /**
   * @title /alimtalk/:company_id
   * @method GET
   * @description 동의서 목록 조회
   */
  {
    path: '/agreement/form/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await AgreementServiceInstance.getAgreementFormList(
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
   * @title /agreement
   * @method GET
   * @description 동의서 조회
   */
  {
    path: '/agreement/:company_id/:customer_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AgreementServiceInstance.getAgreement(
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
   * @title /agreement
   * @method POST
   * @description 동의서 등록
   */
  {
    path: '/agreement/form',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AgreementServiceInstance.insertAgreementForm(
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
  /**
   * @title /agreement/form
   * @method POST
   * @description 동의서 등록
   */
  {
    path: '/agreement/form',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AgreementServiceInstance.updateAgreementForm(
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
  /**
   * @title /agreement/form
   * @method DELETE
   * @description 동의서 폼 삭제
   */
  {
    path: '/agreement/form',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AgreementServiceInstance.deleteAgreementForm(
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
