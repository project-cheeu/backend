import { BOOLEAN, CHAR, ENUM, FLOAT, INTEGER, STRING, UUIDV4 } from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const survey_questions = sequelize.define(
    'survey_questions',
    /* Properties */
    {
      questions_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '질문 코드',
      },
      questions_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '질문명',
      },
      questions_type: {
        type: ENUM(['SINGLE', 'MULTI', 'TEXT']),
        allowNull: false,
        defaultValue: 'SINGLE',
        comment: '응답 타입',
      },
      questions_rate: {
        type: FLOAT,
        allowNull: false,
        comment: '응답 가중치',
      },
      questions_qty: {
        type: INTEGER,
        allowNull: true,
        comment: '복수 선택수',
      },
      questions_order: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '질문 순서',
      },
      questions_usage: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '질문 사용 여부',
      },
    },
    /* options */
    {
      tableName: 'survey_questions',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  survey_questions.associate = (models) => {
    survey_questions.belongsTo(models.survey, {
      foreignKey: {
        name: 'survey_id',
      },
    });
    survey_questions.hasMany(models.survey_replys, {
      foreignKey: { name: 'questions_id' },
    });
  };

  return survey_questions;
};
