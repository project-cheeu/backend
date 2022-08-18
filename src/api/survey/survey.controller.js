import SurveyService from './survey.service';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
let SurveyServiceInstance = Container.get(SurveyService);
export default [
  // SECTION Survey
  {
    path: '/survey',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyList(
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
  {
    path: '/survey/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        // console.log(company_id);
        const resultData = await SurveyServiceInstance.getSurveyList(
          company_id
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
  {
    path: '/survey',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyList(
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
  {
    path: '/survey',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyList(
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
  {
    path: '/survey/answer',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyAnswer(
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
  //SECTION Questions
  {
    path: '/survey/questions',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyQuestions(
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
  {
    path: '/survey/questions',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyList(
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
  {
    path: '/survey/questions',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.updateSurveyQuestions(
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

  {
    path: '/survey/questions/toggle',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.toggleQuestion(req.body);
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
  {
    path: '/survey/questions',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.deleteSurveyQuestions(
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
  //SECTION Reply
  {
    path: '/survey/reply',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyReplys(
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
  {
    path: '/survey/reply',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.insertSurveyList(
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
  {
    path: '/survey/reply',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.updateSurveyReplys(
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
  {
    path: '/survey/reply',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.deleteSurveyReplys(
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
  {
    path: '/survey/answer/:customer_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.getSurveyAnswer(
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
  {
    path: '/survey/answer/:customer_id/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.getSurveyAnswer(
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
  {
    path: '/survey/answer/:customer_id/:company_id/:medical_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await SurveyServiceInstance.getSurveyAnswer(
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
];
