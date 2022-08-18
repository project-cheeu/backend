import moment from 'moment';
import { CHAR, ENUM, UUIDV4, INTEGER, literal } from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const medical_table = sequelize.define(
    'medical_table',
    /* Properties */
    {
      medical_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '진료코드',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        allowNull: false,
        comment: '접수시간',
      },
      completed_at: {
        type: INTEGER,
        allowNull: true,
        comment: '대기시간',
      },
      medical_subject: {
        type: CHAR(36),
        allowNull: true,
        comment: '내방사유',
      },
      medical_status: {
        type: ENUM([
          'RESERVATION',
          'RESERVATION_ACEPTING',
          'RESERVATION_CANCEL',
          'APPLICATION_COMPLETE',
          'SURVEY',
          'TREATMENT',
          'CONSULTING',
          'DONE',
          'RECEIVE',
          'APPLICATION',
          'CANCEL',
        ]),
        allowNull: false,
        defaultValue: 'APPLICATION_COMPLETE',
        comment: '상태',
      },
    },
    /* options */
    {
      tableName: 'medical_table',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  medical_table.associate = (models) => {
    medical_table.belongsTo(models.company, {
      foreignKey: {
        name: 'company_id',
        allowNull: true,
      },
    });
    medical_table.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
        allowNull: true,
      },
    });
    medical_table.hasMany(models.survey_answer, { foreignKey: 'medical_id' });
  };

  return medical_table;
};
