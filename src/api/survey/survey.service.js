import models from '../../models';
import moment from 'moment';
import { logger } from '../../utils/winstonLogger';
import SurveyQuery from './query';
export default class SurveyService {
  async insertSurveyList(surveyInfo) {
    try {
      const result = await models.survey.create(surveyInfo);
      const { survey_id } = result;
      return survey_id;
    } catch (e) {
      logger.error(`[SurveyService][insertSurveyList] Error: ${e.message}`);
      throw e;
    }
  }

  async getSurveyList(company_id) {
    try {
      const result = await models.survey.findAll({
        where: {
          company_id,
        },

        include: [
          {
            model: models.survey_questions,
            // where: { questions_usage: true },
            include: [
              {
                model: models.survey_replys,
              },
            ],
          },
        ],
      });

      return result;
    } catch (e) {
      logger.error(`[SurveyService][getSurveyList] Error: ${e.message}`);
      throw e;
    }
  }

  //SECTION Question
  async insertSurveyQuestions(surveyQuestion) {
    try {
      const result = await models.survey_questions.create(surveyQuestion);
      return result;
    } catch (e) {
      logger.error(
        `[SurveyService][insertSurveyQuestions] Error: ${e.message}`
      );
      throw e;
    }
  }

  async updateSurveyQuestions(surveyQuestion) {
    try {
      const {
        questions_id,
        survey_id,
        questions_nm,
        questions_type,
        questions_rate,
        questions_qty,
        questions_order,
      } = surveyQuestion;
      const result = await models.survey_questions.update(
        {
          questions_nm,
          questions_type,
          questions_rate,
          questions_qty,
          questions_order,
        },
        {
          where: {
            questions_id,
            survey_id,
          },
        }
      );
      return result;
    } catch (e) {
      logger.error(
        `[SurveyService][updateSurveyQuestions] Error: ${e.message}`
      );
      throw e;
    }
  }

  async deleteSurveyQuestions(surveyQuestion) {
    const { questions_id } = surveyQuestion;
    try {
      const result = await models.survey_questions.destroy({
        where: { questions_id },
      });
      return result;
    } catch (e) {
      logger.error(
        `[SurveyService][deleteSurveyQuestions] Error: ${e.message}`
      );
      throw e;
    }
  }

  //SECTION Reply
  async insertSurveyReplys(replysInfo) {
    try {
      // console.log(replysInfo);
      const result = await models.survey_replys.create(replysInfo);
      return result;
    } catch (e) {
      logger.error(`[SurveyService][insertSurveyReplys] Error: ${e.message}`);
      throw e;
    }
  }

  async updateSurveyReplys(replysInfo) {
    try {
      // console.log(replysInfo);

      const { replys_id, questions_id, replys_value, replys_rate } = replysInfo;
      const result = await models.survey_replys.update(
        {
          replys_value,
          replys_rate,
        },
        {
          where: {
            replys_id,
            questions_id,
          },
        }
      );
      return result;
    } catch (e) {
      logger.error(`[SurveyService][updateSurveyReplys] Error: ${e.message}`);
      throw e;
    }
  }

  async deleteSurveyReplys(replysInfo) {
    const { replys_id } = replysInfo;
    try {
      const result = await models.survey_replys.destroy({
        where: { replys_id },
      });
      return result;
    } catch (e) {
      logger.error(`[SurveyService][updateSurveyReplys] Error: ${e.message}`);
      throw e;
    }
  }

  //SECTION Answer
  // FIXME
  async insertSurveyAnswer(surveyAnswerInfo) {
    try {
      const {
        medical_id,
        customer_answer,
        survey_type = 'PRE_SURVEY',
      } = surveyAnswerInfo;
      const survey_answer = await models.survey_answer.create({
        medical_id,
        customer_answer,
        survey_type,
      });

      if (!survey_answer) {
        throw new Error('survey error ');
      }

      await models.medical_table.update(
        {
          medical_status: 'APPLICATION_COMPLETE',
          completed_at: new moment().unix(),
        },
        {
          where: {
            medical_id,
          },
        }
      );

      return true;
    } catch (e) {
      logger.error(`[SurveyService][insertSurveyAnswer] Error: ${e.message}`);
      throw e;
    }
  }

  async getSurveyAnswer(answerInfo) {
    try {
      const { medical_id, customer_id, company_id } = answerInfo;
      let result;
      if (medical_id) {
        const query = SurveyQuery.getSurvey();
        result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          raw: true,
          replacements: { company_id, customer_id, medical_id },
        });
      } else if (company_id) {
        const query = SurveyQuery.getSurveyList();
        result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          raw: true,
          replacements: { company_id, customer_id },
        });
      } else {
        const query = SurveyQuery.getSurveyListAll();
        result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          raw: true,
          replacements: { customer_id },
        });
      }

      return result;
    } catch (e) {
      // console.log(e);
      logger.error(`[SurveyService][getSurveyAnswer] Error: ${e.message}`);
      throw e;
    }
  }
  async deleteSurveyAnswer(surveyAnswerInfo) {
    try {
      const result = await models.survey_answer.destroy(surveyAnswerInfo);
      return result;
    } catch (e) {
      logger.error(`[SurveyService][deleteSurveyAnswer] Error: ${e.message}`);
      throw e;
    }
  }

  async toggleQuestion(questionInfo) {
    try {
      console.log(questionInfo);
      const { questions_usage, questions_id } = questionInfo;
      const result = await models.survey_questions.update(
        { questions_usage: !questions_usage },
        { where: { questions_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[SurveyService][toggleQuestion] Error ${e.message}`);
      throw e.message;
    }
  }
}
