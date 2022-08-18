import MedicalTablbeService from './medical.table.service';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import Alimtalk from '../../utils/alimtalk/alimtalk';

let MedicalTablbeServiceInstance = Container.get(MedicalTablbeService);
export default [
  {
    path: '/medical',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.insertMedicalTable(
          req.body
        );

        if (result) {
          const [rresult] = await MedicalTablbeServiceInstance.getAlimtalkData(
            result.data
          );
          const alim = new Alimtalk();
          // console.log(rresult)
          await alim.sendMessageExisting(rresult);
        }
        const { code, data, message } = result;

        // return res.status(200).json({
        //   resultCode: 200,
        //   resultData: result,
        //   resultMessage: 'Success',
        // });
        return res.status(code).json({
          resultCode: code,
          resultData: data,
          resultMessage: message,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          resultMessage: 'failure',
          resultCode: 500,
          resultData: error,
        });
      }
    },
  },
  {
    path: '/medical',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.getMedicalListAll();
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/medical/detail/:medical_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { medical_id } = req.params;
        // console.log(customer_id);
        const result = await MedicalTablbeServiceInstance.getMedicalDetail(
          medical_id
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/medical/customer/:customer_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { customer_id } = req.params;
        // console.log(customer_id);
        const result = await MedicalTablbeServiceInstance.checkCustomerMedical(
          customer_id
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/medical/:company_id/:type',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.getMedicalTable(
          req.params
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/medical',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.updateMedicalTable(
          req.body
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/subject',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.insertSubjectCode(
          req.body
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/subject',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.getMedicalSubject();
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/subject/:subject_code_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { subject_code_id } = req.params;
        const result = await MedicalTablbeServiceInstance.searchMedicalSubject(
          subject_code_id
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/subject',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.updateMedicalSubject(
          req.body
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
  {
    path: '/subject',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const result = await MedicalTablbeServiceInstance.deleteMedicalSubject(
          req.body
        );
        res.status(200).json({
          resultCode: 200,
          resultData: result,
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
