import models from '../../models';
import { logger } from '../../utils/winstonLogger';

/**
 * @title CompanyAssets
 * @description 회사 자원 관리
 */
export default class CompanyAssetsService {
  /**
   * @title insertCompanyAssets
   * @description 회사 자원 등록
   * @param insertCompanyAssetsInfo:assets(logo_url,	voice_text,	title_text,	welcome_text,	visit_text,	revisit_text,	company_id)
   * @return Success => assets_id:String
   * @return Failure => 0
   */
  async insertCompanyAssets(insertCompanyAssetsInfo) {
    try {
      const result = await models.company_assets.create(
        insertCompanyAssetsInfo
      );

      const { assets_id } = result;
      return assets_id;
    } catch (e) {
      logger.error(
        `[CompanyAssetsService][insertCompanyAssets] Error: ${e.message}`
      );
      throw e;
    }
  }

  /**
   * @title getCompanyAssets
   * @description 회사 자원 조회
   * @param company_id:String
   * @return Success => assets(assets_id, logo_url,	voice_text,	title_text,	welcome_text,	visit_text,	revisit_text,	company_id)
   * @return Failure =>
   */
  async getCompanyAssets(company_id) {
    try {
      const result = await models.company_assets.findOne({
        where: {
          company_id: company_id,
        },
      });
      return result;
    } catch (error) {
      // console.log(error);
      logger.error(
        `[CompanyAssetsService][getCompanyAssets] Error: ${e.message}`
      );
      throw e;
    }
  }

  /**
   * @title getCompanyAssets
   * @description 회사 자원 전체 조회
   * @param -
   * @return Success => assets[](assets_id, logo_url,	voice_text,	title_text,	welcome_text,	visit_text,	revisit_text,	company_id)
   * @return Failure =>
   */
  async getCompanyAssetsList() {
    try {
      const result = await models.company_assets.findAll();
      return result;
    } catch (e) {
      logger.error(
        `[CompanyAssetsService][getCompanyAssetsList] Error: ${e.message}`
      );
      throw e;
    }
  }

  /**
   * @title updateCompanyAssets
   * @description 회사 자원 정보 수정
   * @param assets[](assets_id, logo_url,	voice_text,	title_text,	welcome_text,	visit_text,	revisit_text,	company_id)
   * @return Success => 1
   * @return Failure => 0
   */
  async updateCompanyAssets(updateCompanyData) {
    try {
      const { assets_id } = updateCompanyData;

      const result = await models.company_assets.update(updateCompanyData, {
        where: {
          assets_id: assets_id,
        },
      });
      return result;
    } catch (e) {
      logger.error(
        `[CompanyAssetsService][updateCompanyAssets] Error: ${e.message}`
      );
      throw e;
    }
  }
}
