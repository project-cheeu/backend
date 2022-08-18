import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ReservationQuery from './query';
import 'moment/locale/ko';
export default class ReservationService {
  /**
   * 예약 등록
   * --
   * @param {Object} reservationInfo 예약 정보
   * @returns
   */
  async insertReservation(reservationInfo) {
    try {
      const result = await models.medical_reservation.create(reservationInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ReservationService][insertReservation] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 예약 전체 목록 조회
   * --
   * @returns
   */
  async getReservationListAll() {
    try {
      const query = ReservationQuery.getReservationListAll();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ReservationService][getReservationListAll] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 병원별 예약정보 조회
   * --
   * @param {Object} compnayInfo 병원 정보
   * @returns
   */
  async getReservationListByCompnay(compnayInfo) {
    try {
      const { company_id } = compnayInfo;
      const query = ReservationQuery.getReservationListByCompnay();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ReservationService][getReservationListByCompnay] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 고객별 예약정보 조회
   * --
   * @param {Object} customerInfo 고객 정보
   * @returns
   */
  async getReservationListByCustomer(customerInfo) {
    try {
      const { customer_id } = customerInfo;
      const query = ReservationQuery.getReservationListByCustomer();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ReservationService][getReservationListByCustomer] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 예약 수정
   * --
   * @param {Object} reservationInfo 예약정보
   * @returns
   */
  async updateReservation(reservationInfo) {
    try {
      const { reservation_id, medical_subject, reservation_time } =
        reservationInfo;
      const res_time = new moment(reservation_time).unix();
      const result = await models.medical_reservation.update(
        { reservation_time: res_time, medical_subject },
        { where: { reservation_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ReservationService][updateReservation] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 예약 완료처리
   * --
   * @param {Object} reservationInfo 예약 정보
   * @returns
   */
  async doneReservation(reservationInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { reservation_id } = reservationInfo;
      const result = await models.medical_reservation.update(
        {
          completed_at: new moment().unix(),
          reservation_status: 'DONE',
        },
        { where: { reservation_id } },
        { transaction }
      );

      const query = ReservationQuery.getReservatinById();

      const [medical] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { reservation_id },
      });

      await models.medical_table.create(medical, { transaction });
      await transaction.commit();
      return result;
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      logger.error(`[ReservationService][doneReservation] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 예약 취소 처리
   * --
   * @param {Object} reservationInfo 예약정보
   * @returns
   */
  async cancelReservation(reservationInfo) {
    try {
      const { reservation_id } = reservationInfo;
      const result = await models.medical_reservation.update(
        { reservation_status: 'CANCEL', completed_at: new moment().unix() },
        { where: { reservation_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ReservationService][cancelReservation] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
