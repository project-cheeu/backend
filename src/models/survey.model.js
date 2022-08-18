import moment from 'moment';
import { CHAR, ENUM, INTEGER, literal, UUIDV4 } from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const survey = sequelize.define(
    'survey',
    /* Properties */
    {
      survey_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '설문지 코드',
      },
      survey_date: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '설문 등록일자',
      },
      survey_type: {
        type: ENUM(['PRE_SURVEY', 'SURVEY']),
        allowNull: false,
        defaultValue: 'PRE_SURVEY',
        comment: '설문 타입',
      },
    },
    /* options */
    {
      tableName: 'survey',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  survey.associate = (models) => {
    survey.belongsTo(models.company, {
      foreignKey: {
        name: 'company_id',
      },
    });
    survey.hasMany(models.survey_questions, {
      foreignKey: { name: 'survey_id' },
    });
  };

  return survey;
};
