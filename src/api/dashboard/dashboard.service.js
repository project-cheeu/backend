import models from '../../models';
import moment from 'moment';
import { logger } from '../../utils/winstonLogger';
import DashboardQuery from './query';
import MedicalQuery from '../medical.table/query';

export default class DashboardService {
  async getAdminDashboard() {
    try {
      const query = DashboardQuery.getAdminDashboard();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
      });
      return result;
    } catch (e) {
      logger.error(`[DashboardService][getAdminDashboard] Error: ${e.message}`);
      throw e;
    }
  }
  async getDashboard(company_id) {
    try {
      const countQuery = DashboardQuery.getDashboardCount();

      const dashboardCount = await models.sequelize.query(countQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });

      const medicalQuery = MedicalQuery.getMedicalList();
      const medical = await models.sequelize.query(medicalQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });

      const result = {
        dashboardCount,
        medical,
      };

      return result;
    } catch (e) {
      logger.error(`[DashboardService][getAdminDashboard] Error: ${e.message}`);
      throw e;
    }
  }

  async getDashboardCalendar(dashboardInfo) {
    try {
      const { company_id, month } = dashboardInfo;
      const medicalQuery = DashboardQuery.getMedicalCount();
      const [{ medical }] = await models.sequelize.query(medicalQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });

      const surveyQuery = DashboardQuery.getSurveyCount();
      const [{ survey }] = await models.sequelize.query(surveyQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });

      const alimtalkQuery = DashboardQuery.getAlimtalkCount();
      const [{ alimtalk }] = await models.sequelize.query(alimtalkQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });

      const calendarQuery = DashboardQuery.getCalendar();
      const events = await models.sequelize.query(calendarQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: { company_id },
      });

      console.log(medical, survey, alimtalk);

      const result = {
        medical,
        survey,
        alimtalk,
        events,
      };

      return result;
    } catch (e) {
      logger.error(`[DashboardService][getAdminDashboard] Error: ${e.message}`);
      throw e;
    }
  }
}
