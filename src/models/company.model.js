'use strict';

const { unix } = require('moment');
const moment = require('moment');
const { literal } = require('sequelize');
const Sequelize = require('sequelize');

const { INTEGER, BOOLEAN, UUIDV4, STRING, NOW, DATE } = Sequelize;

module.exports = (sequelize) => {
  const company = sequelize.define(
    'company',
    /* Properties */
    {
      company_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '회사 코드',
      },
      company_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '회사명',
      },
      company_tel: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '회사 대표 전화번호',
      },
      company_addr: {
        type: STRING(255),
        allowNull: false,
        comment: '회사 대표 주소',
      },
      company_mail: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '회사 대표 메일',
      },
      company_num: {
        type: STRING(255),
        allowNull: true,
        unique: true,
        comment: '회사 법인번호',
      },
      company_regist_num: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '회사 사업자등록번호',
      },
      ebook_url: {
        type: STRING(255),
        allowNull: true,
        comment: 'ebook',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '회사 생성일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '회사 수정일',
      },
      use_yn: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '회사 사용여부',
      },
    },
    /* options */
    {
      tableName: 'company',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  company.associate = (models) => {
    company.hasOne(models.member_company, { foreignKey: 'company_id' });
    company.hasOne(models.company_assets, { foreignKey: 'company_id' });
    company.hasMany(models.dept, { foreignKey: 'company_id' });
    company.hasMany(models.survey, { foreignKey: 'company_id' });
    company.hasMany(models.medical_table, { foreignKey: 'company_id' });
    company.hasMany(models.medical_reservation, { foreignKey: 'company_id' });
    company.hasMany(models.company_notice, { foreignKey: 'company_id' });
  };

  return company;
};
