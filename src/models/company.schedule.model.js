'use strict';
const { literal } = require('sequelize');
const Sequelize = require('sequelize');
const { INTEGER, BOOLEAN, UUIDV4, STRING, NOW, DATE } = Sequelize;
import company from './company.model';

module.exports = (sequelize) => {
  const company_schedule = sequelize.define(
    'company_schedule',
    /* Properties */
    {
      company_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        references: {
          model: company,
          key: 'company_id',
        },
        comment: '회사 코드',
      },
      schedule_date: {
        type: STRING(255),
        allowNull: false,
        comment: '예약일',
      },
      schedule_time: {
        type: STRING(255),
        allowNull: false,
        comment: '예약 시간',
      },
      schedule_number: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 3,
        comment: '예약 최대 인원',
      },
      shutdown: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '긴급종료',
      },
    },
    /* options */
    {
      tableName: 'company_schedule',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  company_schedule.associate = (models) => {};

  return company_schedule;
};
