import models from '../../models';
import { logger } from '../../utils/winstonLogger';
import CompanyScheduleQuery from './query';
export default class CompanyScheduleService {
  /**
   * 병원별 회사 설정 등록
   * --
   * @param {Object} scheduleInfo
   * @returns
   */
  async insertSchedule(scheduleInfo) {
    try {
      const { company_schedules } = scheduleInfo;
      if (company_schedules) {
        const result = await models.company_schedule.bulkCreate(
          company_schedules
        );
        return result;
      }
      const result = await models.company_schedule.create(scheduleInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyScheduleService][insertSchedule] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 병원별 스케쥴 조회
   * --
   * @param {Object} companyInfo
   * @returns
   */
  async getScheduleByCompany(companyInfo) {
    try {
      const { company_id } = companyInfo;
      const scheduleQuery = CompanyScheduleQuery.getScheduleByCompany();
      const schedule = await models.sequelize.query(scheduleQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });

      const SchedulePromise = await schedule.map(async (item) => {
        const {
          company_id,
          schedule_date,
          schedule_time,
          schedule_number,
          shutdown,
        } = item;
        const countQuery = CompanyScheduleQuery.getScheduleCount();
        const [{ reservation_count }] = await models.sequelize.query(
          countQuery,
          {
            type: models.sequelize.QueryTypes.SELECT,
            replacements: {
              company_id,
              schedule: `${schedule_date} ${schedule_time}`,
            },
          }
        );
        return {
          ...item,
          reservation_count,
          reservation: shutdown
            ? false
            : reservation_count >= schedule_number
            ? false
            : true,
        };
      });

      const company_schedule = await Promise.all(SchedulePromise);

      const companySchedulePromise = await company_schedule.map(
        async (item) => {
          const { company_id, schedule_date, schedule_time } = item;
          const query = CompanyScheduleQuery.getScheduleReservation();
          const schedules = await models.sequelize.query(query, {
            type: models.sequelize.QueryTypes.SELECT,
            replacements: {
              company_id,
              schedule: `${schedule_date} ${schedule_time}`,
            },
          });
          return { ...item, medical_reservation: schedules };
        }
      );

      const result = await Promise.all(companySchedulePromise);

      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyScheduleService][getScheduleByCompany] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 병원 스케쥴 변경
   * --
   * @param {Object} scheduleInfo
   * @returns
   */
  async updateSchedule(scheduleInfo) {
    try {
      const {} = scheduleInfo;
      const result = await models.company_schedule.update();
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyScheduleService][updateSchedule] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 병원 스케쥴 삭제
   * --
   * @param {Object} scheduleInfo
   * @returns
   */
  async deleteSchedule(scheduleInfo) {
    try {
      const { company_id, schedule_date, schedule_time } = scheduleInfo;
      const result = await models.company_schedule.destroy({
        where: { company_id, schedule_date, schedule_time },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyScheduleService][deleteSchedule] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 예약 긴급 정지
   * --
   * @param {Object} scheduleInfo
   * @returns
   */
  async emergencyStopSchedule(scheduleInfo) {
    try {
      const { company_id, schedule_date, schedule_time } = scheduleInfo;
      const result = await models.company_schedule.update(
        { shutdown: true },
        { where: { company_id, schedule_date, schedule_time } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyScheduleService][emergencyStopSchedule] Error ${e.message}`
      );
      throw e.message;
    }
  }
  /**
   * 예약 긴급 해제
   * --
   * @param {Object} scheduleInfo
   * @returns
   */
  async recoverySchedule(scheduleInfo) {
    try {
      const { company_id, schedule_date, schedule_time } = scheduleInfo;
      const result = await models.company_schedule.update(
        { shutdown: false },
        { where: { company_id, schedule_date, schedule_time } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyScheduleService][recoverySchedule] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
