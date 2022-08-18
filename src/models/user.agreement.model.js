'use strict';
const Sequelize = require('sequelize');
const { STRING, INTEGER, literal, UUIDV4 } = Sequelize;
import company from './company.model';
import customer from './customer.model';

module.exports = (sequelize) => {
  const user_agreement = sequelize.define(
    'user_agreement',
    /* Properties */
    {
      agreement_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '동의 고유 코드',
      },
      company_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: company,
          key: 'company_id',
        },
      },
      customer_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: customer,
          key: 'customer_id',
        },
      },
      img_url: {
        type: STRING(255),
        allowNull: false,
        comment: '동의서 경로',
      },
      form_id: {
        type: STRING(36),
        allowNull: false,
        comment: '동의서 양식',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        allowNull: false,
        comment: '생성일자',
      },
    },
    /* options */
    {
      tableName: 'user_agreement',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  user_agreement.associate = (models) => {};

  return user_agreement;
};
