import DashboardService from './dashboard.service';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
let DashboardServiceInstance = Container.get(DashboardService);

export default [
  {
    path: '/dashboard',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await DashboardServiceInstance.getAdminDashboard();
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
    path: '/dashboard/calendar/:company_id/:month',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        // const { month } = req.params;
        const resultData = await DashboardServiceInstance.getDashboardCalendar(
          req.params
        );
        return res.status(200).json({
          resultMessage: 'success',
          resultCode: 200,
          resultData: resultData,
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
    path: '/dashboard/company/:company_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const { company_id } = req.params;
        const resultData = await DashboardServiceInstance.getDashboard(
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
];
