import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import NoticeQuery from './query';
export default class CompanyNoticeService {
  /**
   * 병원별 공지사항 정보 등록
   * @param {Object} noticeInfo
   * @returns
   */
  async insertNotice(noticeInfo) {
    try {
      const result = await models.company_notice.create(noticeInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CompanyNoticeService][insertNotice] Error ${e.message}`);
      throw e.message;
    }
  }
  /**
   * 병원별 공지사항 조회
   * --
   * @param {Object} companyInfo
   * @returns
   */
  async getNoticeList(companyInfo) {
    try {
      const { company_id } = companyInfo;
      const query = NoticeQuery.getNoticeList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CompanyNoticeService][getNoticeList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 수정
   * --
   * @param {Object} noticeInfo
   * @returns
   */
  async updateNotice(noticeInfo) {
    try {
      const {
        notice_title,
        notice_content,
        company_id,
        notice_id,
        notice_order,
      } = noticeInfo;
      const result = await models.notice.update(
        { notice_title, notice_content, notice_order },
        { where: { company_id, notice_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CompanyNoticeService][updateNotice] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 순서 정보 수정
   * --
   * @param {Object} noticeInfo
   * @returns
   */
  async updateNoticeOrder(noticeInfo) {
    try {
      const { notice_id, company_id, notice_order } = noticeInfo;
      const result = await models.company_notice.update(
        { notice_order },
        { where: { notice_id, company_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyNoticeService][updateNoticeOrder] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 공지사항 삭제
   * --
   * @param {Object} noticeInfo
   * @returns
   */
  async deleteNotice(noticeInfo) {
    try {
      const { company_id, notice_id } = noticeInfo;
      const result = await models.company_notice.destroy({
        where: { company_id, notice_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CompanyNoticeService][deleteNotice] Error ${e.message}`);
      throw e.message;
    }
  }
}
