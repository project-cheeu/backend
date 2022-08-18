import fetch from 'node-fetch';
import moment from 'moment';
import models from '../../models';
import 'moment/locale/ko';
import { josa } from 'josa';
import { logger } from '../winstonLogger';
const env = process.env.NODE_ENV;

const newCustomer =
  '[치유 - 진료 접수 알림]\n\n안녕하세요! :customer_nm님 만나서\n반갑습니다.\n\n접수가 완료되어 안내드립니다.\n\n-이름 : :customer_nm\n-병원 : :company_nm\n-일자 : :date\n-시간 : :time\n-문의 : :company_tel\n\n감사합니다.\nCheeU - "당신을 위한 치유"\n\n※예약 일정이 맞지 않거나\n수신에 미동의 하신 환자 분일\n경우 :contact 연락\n부탁드리겠습니다.';

const existingCustomer =
  '[치유 - 진료 접수 알림]\n\n안녕하세요! :customer_nm님\n재방문해주셔서 감사합니다.\n\n접수가 완료되어 안내드립니다.\n\n-이름 : :customer_nm\n-병원 : :company_nm\n-일자 : :date\n-시간 : :time\n-문의 : :company_tel\n\n감사합니다.\nCheeU - "당신을 위한 치유"\n\n※예약 일정이 맞지 않거나\n수신에 미동의 하신 환자 분일\n경우 :contact 연락\n부탁드리겠습니다.';
export default class Alimtalk {
  constructor() {
    if (!Alimtalk.instance) {
      Alimtalk.instance = this;
    }
    return Alimtalk.instance;
  }

  /**
   * 구환 알림톡 메시지 전송
   * template003
   * @param body(customer_tel, customer_nm, company_nm, company_tel, created_at, url, reserveDt)
   * @param tmplId
   */
  async sendMessageExisting(
    body,
    tmplId = 'img_sendms_Old',
    reserveDt = '00000000000000'
  ) {
    try {
      if (env === 'development') {
        return true;
      }
      const {
        customer_id,
        company_id,
        customer_tel,
        customer_nm,
        company_nm,
        company_tel,
        created_at,
        ebook_url,
      } = body;

      const temp = existingCustomer
        .replaceAll(':customer_nm', customer_nm)
        .replace(':company_nm', company_nm)
        .replace(':company_name', josa(`${company_nm}#{를}`))
        .replace(':contact', josa(`${company_nm}#{으로}`))
        .replace(':company_tel', company_tel)
        .replace(':date', moment(created_at * 1000).format('LL'))
        .replace(':time', moment(created_at * 1000).format('LT'));
      // .replace(':url', ebook_url);
      const [, middle, end] = customer_tel.split('-');
      const phn = `8210${middle}${end}`;
      const postData = [
        {
          phn,
          message_type: 'AI',
          profile: process.env.BIZM_PROFILE,
          tmplId,
          msg: temp,
          imgUrl: 'https://cheeu.kr/img/alimtalk.png',
          reserveDt,
          button1: {
            name: '병원 바로가기',
            type: 'WL',
            url_mobile: ebook_url,
            url_pc: ebook_url,
          },
        },
      ];
      const apiResult = await fetch(`${process.env.BIZM_URL}/v2/sender/send`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          userId: process.env.BIZM_ACCOUNT_ID,
        },
        body: JSON.stringify(postData),
      }).then((res) => res.json());
      const [res] = apiResult;
      const result = res.code;
      // console.log(apiResult);
      if (result === 'success') {
        await models.alimtalk.create({
          sender: company_id,
          receiver: customer_id,
          content: JSON.stringify(postData),
          apiResult: true,
          resultDetail: JSON.stringify(apiResult),
          type: tmplId,
        });
        return true;
      } else {
        await models.alimtalk.create({
          sender: company_id,
          receiver: customer_id,
          content: JSON.stringify(postData),
          apiResult: false,
          resultDetail: JSON.stringify(apiResult),
          type: tmplId,
        });
        return false;
      }
    } catch (e) {
      logger.error(`[Alimtalk][existingCustomer] Error: ${e.message}`);
      throw e;
    }
  }
  /**
   * 신환 알림톡 메시지 전송
   * template003
   * @param body(customer_tel, customer_nm, company_nm, company_tel, created_at, url, reserveDt)
   * @param tmplId
   */
  async sendMessageNewFace(
    body,
    tmplId = 'img_sendms_new',
    reserveDt = '00000000000000'
  ) {
    try {
      if (env === 'development') {
        return true;
      }
      const {
        company_id,
        customer_id,
        customer_tel,
        customer_nm,
        company_nm,
        company_tel,
        created_at,
        ebook_url,
      } = body;
      // console.log(body);
      const temp = newCustomer
        .replaceAll(':customer_nm', customer_nm)
        .replace(':company_nm', company_nm)
        .replace(':company_name', josa(`${company_nm}#{를}`))
        .replace(':contact', josa(`${company_nm}#{으로}`))
        .replace(':company_tel', company_tel)
        .replace(':date', moment(created_at * 1000).format('LL'))
        .replace(':time', moment(created_at * 1000).format('LT'));
      // .replace(':url', ebook_url);
      const [, middle, end] = customer_tel.split('-');
      const phn = `8210${middle}${end}`;
      const postData = [
        {
          phn,
          message_type: 'AI',
          profile: process.env.BIZM_PROFILE,
          tmplId,
          msg: temp,
          reserveDt,
          imgUrl: 'https://cheeu.kr/img/alimtalk_logo.png',
          button1: {
            name: '병원 바로가기',
            type: 'WL',
            url_mobile: ebook_url,
            url_pc: ebook_url,
          },
        },
      ];
      // console.log(postData);
      const apiResult = await fetch(`${process.env.BIZM_URL}/v2/sender/send`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          userId: process.env.BIZM_ACCOUNT_ID,
        },
        body: JSON.stringify(postData),
      }).then((res) => res.json());
      const [res] = apiResult;
      const result = res.code;
      // console.log(apiResult);
      if (result === 'success') {
        await models.alimtalk.create({
          sender: company_id,
          receiver: customer_id,
          content: JSON.stringify(postData),
          apiResult: true,
          resultDetail: JSON.stringify(apiResult),
          type: tmplId,
        });
        return true;
      } else {
        await models.alimtalk.create({
          sender: company_id,
          receiver: customer_id,
          content: JSON.stringify(postData),
          apiResult: false,
          resultDetail: JSON.stringify(apiResult),
          type: tmplId,
        });
        return false;
      }
    } catch (e) {
      // console.log(error);
      logger.error(`[Alimtalk][newCustomer] Error: ${e.message}`);
      throw e;
    }
  }
}
