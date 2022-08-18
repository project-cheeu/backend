'use strict';

const { BOOLEAN } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING, INTEGER, literal, UUIDV4, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const agreement_form = sequelize.define(
    'agreement_form',
    /* Properties */
    {
      form_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '동의서 고유 아이디',
      },
      form_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '동의서 제목',
      },
      form_content: {
        type: TEXT,
        allowNull: false,
        comment: '동의서 내용',
      },
      usage: {
        type: BOOLEAN,
        allowNull: true,
        defaultValue: true,
        comment: '사용 여부',
      },
      company_id: {
        type: STRING(36),
        allowNull: false,
        comment: '회사코드',
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
      tableName: 'agreement_form',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  agreement_form.associate = (models) => {};

  return agreement_form;
};
