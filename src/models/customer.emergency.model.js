'use strict';

const { FLOAT } = require('sequelize');
const Sequelize = require('sequelize');
const customer = require('./customer.model');
const { CHAR, BOOLEAN, STRING } = Sequelize;

module.exports = (sequelize) => {
  const customer_emergency = sequelize.define(
    'customer_emergency',
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
      emergency_nm: {
        type: STRING(45),
        allowNull: true,
        comment: '이름',
      },
      emergency_relation1: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '관계1',
      },
      emergency_relation2: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '관계2',
      },
      emergency_relation3: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '관계3',
      },
      emergency_relation4: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '관계4',
      },
      emergency_tel1: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처1',
      },
      emergency_subtel1: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처 보조1',
      },
      emergency_tel2: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처1',
      },
      emergency_subtel2: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처 보조1',
      },
      emergency_tel3: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처2',
      },
      emergency_subtel3: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처 보조3',
      },
      emergency_tel4: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처4',
      },
      emergency_subtel4: {
        type: STRING(45),
        allowNull: true,
        defaultValue: '',
        comment: '연락처 보조4',
      },
    },
    /* options */
    {
      tableName: 'customer_emergency',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  customer_emergency.associate = (models) => {
    customer_emergency.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
        allowNull: true,
      },
    });
  };

  return customer_emergency;
};
