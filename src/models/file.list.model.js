'use strict';

const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING, INTEGER, literal, UUIDV4, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const fileList = sequelize.define(
    'fileList',
    /* Properties */
    {
      file_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '파일 고유 코드',
      },
      file_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '파일명',
      },
      file_type: {
        type: STRING(255),
        allowNull: false,
        comment: '파일 타입',
      },
      reference_tb: {
        type: STRING(36),
        allowNull: true,
        comment: '관련 테이블',
      },
      reference_id: {
        type: STRING(36),
        allowNull: true,
        comment: '관련 아이디',
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
      tableName: 'fileList',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  fileList.associate = (models) => {};

  return fileList;
};
