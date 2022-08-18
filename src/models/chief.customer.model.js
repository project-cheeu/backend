'use strict';

const Sequelize = require('sequelize');
const { BOOLEAN, STRING, INTEGER, literal } = Sequelize;

module.exports = (sequelize) => {
  const chief_customer = sequelize.define(
    'chief_customer',
    /* Properties */
    {
      customer_tel: {
        type: STRING(45),
        primaryKey: true,
        comment: '사용자 전화번호',
      },
      chief_nm: {
        type: STRING(45),
        allowNull: false,
        comment: '대표 고객 이름',
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
      tableName: 'chief_customer',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  chief_customer.associate = (models) => {
    chief_customer.hasMany(models.customer, {
      foreignKey: {
        name: 'customer_tel',
      },
    });
  };

  return chief_customer;
};
