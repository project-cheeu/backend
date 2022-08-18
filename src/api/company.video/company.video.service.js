import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import CompanyVideoQuery from './query';
export default class CompanyVideoService {
  /**
   * 병원 영상 등록
   * --
   * @param {Object} videoInfo
   * @returns
   */
  async insertCompanyVideo(videoInfo) {
    try {
      const result = await models.company_video.create(videoInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyVideoService][insertCompanyVideo] Error ${e.message}`
      );
      throw e.message;
    }
  }
  /**
   * 병원별 영상 정보 조회
   * --
   * @param {Object} companyInfo
   * @returns
   */
  async getCompanyVideoList(companyInfo) {
    try {
      const { company_id } = companyInfo;
      const query = CompanyVideoQuery.getCompanyVideoList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { company_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyVideoService][getCompanyVideoList] Error ${e.message}`
      );
      throw e.message;
    }
  }
  /**
   * 병원 영상 정보 수정
   * --
   * @param {Object} videoInfo
   * @returns
   */
  async updateCompanyVideo(videoInfo) {
    try {
      const { video_id, company_id, video_title, video_url, viedeo_yn } =
        videoInfo;
      const result = await models.company_video.update(
        { video_title, viedeo_yn, video_url },
        { where: { company_id, video_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyVideoService][updateCompanyVideo] Error ${e.message}`
      );
      throw e.message;
    }
  }
  /**
   * 병원 영상 정보 삭제
   * --
   * @param {Object} videoInfo
   * @returns
   */
  async deleteCompanyVideo(videoInfo) {
    try {
      const { video_id, company_id } = videoInfo;
      const result = await models.company_video.destroy({
        where: { video_id, company_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CompanyVideoService][deleteCompanyVideo] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
