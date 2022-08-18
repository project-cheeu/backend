import StatisticsService from './statistics.service';
import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';

let StatisticsServiceInstance = Container.get(StatisticsService);
export default [
  {
    path: '/statistics/customer/:type/:start_date/:end_date/:gender/:older',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await StatisticsServiceInstance.getCustomerCountByDate(
          req.params
        );
        // console.log(resultData);
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
];
