'use strict';

const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING, INTEGER, literal, UUIDV4, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const alimtalk = sequelize.define(
    'alimtalk',
    /* Properties */
    {
      id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '알림톡 코드',
      },
      sender: {
        type: STRING(36),
        allowNull: false,
        comment: '병원코드',
      },
      receiver: {
        type: STRING(36),
        allowNull: false,
        comment: '수신자',
      },
      content: {
        type: TEXT,
        allowNull: false,
        comment: '발신내용',
      },
      resultDetail: {
        type: TEXT,
        allowNull: false,
        comment: '수신 결과',
      },
      apiResult: {
        type: BOOLEAN,
        allowNull: false,
        comment: '수신자',
      },
      type: {
        type: STRING(45),
        allowNull: false,
        comment: '알림톡 타입',
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
      tableName: 'alimtalk',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  alimtalk.associate = (models) => {};

  return alimtalk;
};
