import S3Manager from '../../utils/S3Manager';
import models from '../../models';
import moment from 'moment';
import { logger } from '../../utils/winstonLogger';
export default class FileService {
  /**
   * @title insertCustomerDetail
   * @description 회원 상세정보 등록
   * @return Success => true:bool
   * @return Failure => false:bool
   */
  async excelParserUpload(param) {
    try {
      const { company_id, file } = param;
      const S3 = new S3Manager();
      var result;

      const [{ mimetype }] = file;
      switch (mimetype) {
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'text/csv':
        case 'application/vnd.ms-excel':
        case 'application/vnd.ms-excel.sheet.macroEnabled.12':
        case 'application/vnd.ms-excel.sheet.binary.macroEnabled.12':
        case 'application/csv':
        case 'application/haansoftxls':
        case 'application/haansoftxlsx':
          break;
        default:
          throw new Error('파일 타입이 맞지 않습니다.');
      }

      // 성공시 실행 핸들러
      const successHandller = async (resultData) => {
        const { file, result } = resultData;
        const [file_id] = result;
        const [, id] = file_id.split('parser/');
        const tbData = {
          file_id: id,
          file_nm: file.originalname,
          file_type: file.mimetype,
          reference_tb: 'company',
          reference_id: company_id,
        };
        result = await models.fileList.create(tbData);
        return tbData;
      };

      // 실패시 실행 핸들러
      const errorHandller = (resultData) => {
        throw new Error(resultData);
      };

      // await S3.uploads('parser', origin, successHandller, errorHandller);
      await S3.uploads('parser', file, successHandller, errorHandller);
      // console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FileService][excelParserUpload] Error: ${e.message}`);
      throw e.message;
    }
  }
}
