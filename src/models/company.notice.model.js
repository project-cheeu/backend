'use strict';
const { literal } = require('sequelize');
const Sequelize = require('sequelize');

const { INTEGER, BOOLEAN, UUIDV4, STRING } = Sequelize;

module.exports = (sequelize) => {
  const company_notice = sequelize.define(
    'company_notice',
    /* Properties */
    {
      notice_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '공지사항 코드',
      },
      notice_title: {
        type: STRING(255),
        allowNull: false,
        comment: '공지사항 제목',
      },
      notice_content: {
        type: STRING,
        allowNull: false,
        comment: '공지사항 내용',
      },
      notice_order: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '공지사항 순서',
      },
      modified_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '공지사항 생성/수정일',
      },
      modified_yn: {
        type: BOOLEAN,
        allowNull: true,
        defaultValue: false,
        comment: '수정 여부',
      },
    },
    /* options */
    {
      tableName: 'company_notice',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  company_notice.associate = (models) => {
    company_notice.belongsTo(models.company, { foreignKey: 'company_id' });
  };

  return company_notice;
};
