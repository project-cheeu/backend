import { CHAR, ENUM, INTEGER, JSON, literal, TEXT, UUIDV4 } from 'sequelize';
// import survey from './survey.model';
('use strict');
module.exports = (sequelize) => {
  const survey_answer = sequelize.define(
    'survey_answer',
    /* Properties */
    {
      answer_id: {
        type: CHAR(36),
        primaryKey: true,
        // references: {
        //   model: survey,
        //   key: 'survey_id',
        // },
        defaultValue: UUIDV4,
        comment: '응답 코드',
      },
      customer_answer: {
        type: JSON,
        allowNull: false,
        comment: '방문자 응답',
      },
      survey_type: {
        type: ENUM(['PRE_SURVEY', 'SURVEY']),
        allowNull: false,
        comment: '방문자 응답',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '생성일',
      },
    },
    /* options */
    {
      tableName: 'survey_answer',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  survey_answer.associate = (models) => {
    survey_answer.belongsTo(models.medical_table, {
      foreignKey: {
        name: 'medical_id',
        allowNull: true,
      },
    });
  };

  return survey_answer;
};
