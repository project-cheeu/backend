'use strict';

const { FLOAT, ENUM, INTEGER, literal } = require('sequelize');
const Sequelize = require('sequelize');
const customer = require('./customer.model');
const { CHAR, BOOLEAN, STRING } = Sequelize;

module.exports = (sequelize) => {
  const customer_detail = sequelize.define(
    'customer_detail',
    /* Properties */
    {
      customer_id: {
        type: CHAR(36),
        primaryKey: true,
        references: {
          model: customer,
          key: 'customer_id',
        },
        comment: '사용자 코드',
      },
      blood_type: {
        type: ENUM([
          'Rh+A',
          'Rh-A',
          'Rh+B',
          'Rh-B',
          'Rh+AB',
          'Rh-AB',
          'Rh+O',
          'Rh-O',
          'A',
          'B',
          'AB',
          'O',
          'Cis-AB',
          '-D-/-D-',
          'Rh null',
          'MkMk',
          'weakA',
          'weakB',
          'weakD',
          '밀텐버거',
          '더피식',
          '데에고식',
          'Oh',
          'UNKNOWN',
        ]),
        allowNull: true,
        comment: '혈액형',
      },
      customer_height: {
        type: FLOAT,
        allowNull: true,
        comment: '키',
      },
      customer_weight: {
        type: FLOAT,
        allowNull: true,
        comment: '체중',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '최근 수정일',
      },
    },
    /* options */
    {
      tableName: 'customer_detail',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  customer_detail.associate = (models) => {
    customer_detail.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
        allowNull: true,
      },
    });
  };

  return customer_detail;
};
