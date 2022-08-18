import { CHAR, FLOAT, INTEGER, STRING, UUIDV4 } from 'sequelize';
import survey_questions from './survey.questions.model';
('use strict');
module.exports = (sequelize) => {
  const survey_replys = sequelize.define(
    'survey_replys',
    /* Properties */
    {
      replys_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '응답 코드',
      },
      questions_id: {
        type: CHAR(36),
        primaryKey: true,
        references: {
          model: survey_questions,
          key: 'questions_id',
        },
        comment: '질문 코드',
      },
      replys_value: {
        type: STRING(255),
        allowNull: true,
        comment: '응답 값',
      },
      replys_rate: {
        type: FLOAT,
        allowNull: true,
        comment: '응답 가중치',
      },
      replys_order: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 1,
        comment: '응답지 순서',
      },
    },
    /* options */
    {
      tableName: 'survey_replys',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  survey_replys.associate = (models) => {
    survey_replys.belongsTo(models.survey_questions, {
      foreignKey: {
        name: 'questions_id',
        allowNull: true,
      },
      foreignKeyConstraint: true,
      onDelete: 'CASCADE',
    });
  };

  return survey_replys;
};
