import moment from 'moment';
import { CHAR, ENUM, UUIDV4, INTEGER, literal, STRING } from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const medical_reservation = sequelize.define(
    'medical_reservation',
    /* Properties */
    {
      reservation_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '예약코드',
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
      reservation_status: {
        type: ENUM(['RESERVATION', 'DONE', 'CANCEL']),
        allowNull: false,
        defaultValue: 'RESERVATION',
        comment: '상태',
      },
      reservation_date: {
        type: STRING,
        allowNull: false,
        comment: '예약시간',
      },
      reservation_time: {
        type: STRING,
        allowNull: false,
        comment: '예약시간',
      },
      reservation_comment: {
        type: STRING,
        allowNull: true,
        comment: '예약 코멘트',
      },
    },
    /* options */
    {
      tableName: 'medical_reservation',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  medical_reservation.associate = (models) => {
    medical_reservation.belongsTo(models.company, {
      foreignKey: {
        name: 'company_id',
        allowNull: true,
      },
    });
    medical_reservation.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
        allowNull: true,
      },
    });
  };

  return medical_reservation;
};
