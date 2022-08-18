import moment from 'moment';
const {
  CHAR,
  BOOLEAN,
  UUIDV4,
  STRING,
  ENUM,
  INTEGER,
  literal,
} = require('sequelize');

('use strict');
module.exports = (sequelize) => {
  const customer = sequelize.define(
    'customer',
    /* Properties */
    {
      customer_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '사용자 코드',
      },
      customer_tel: {
        type: STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: customer,
          key: 'customer_tel',
        },
        comment: '사용자 전화번호',
      },
      customer_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '사용자이름',
      },
      customer_num: {
        type: STRING(13),
        allowNull: true,
        defaultValue: '000000-0000000',
        comment: '사용자 주민등록번호',
      },
      customer_addr: {
        type: STRING(255),
        allowNull: true,
        comment: '사용자 주소',
      },
      customer_addr_sido: {
        type: STRING(255),
        allowNull: true,
        comment: '사용자 주소1',
      },
      customer_addr_sigungu: {
        type: STRING(255),
        allowNull: true,
        comment: '사용자 주소2',
      },
      customer_addr_bname: {
        type: STRING(255),
        allowNull: true,
        comment: '사용자 주소3',
      },
      agree_date: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        allowNull: false,
        comment: '개인정보 수집 동의일',
      },
      agree_optional: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: '선택 수집 동의항목',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        allowNull: false,
        comment: '생성일자',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        allowNull: false,
        comment: '수정일자',
      },
      access_platform: {
        type: ENUM(['DEFAULT', 'KAKAO', 'NAVER']),
        arrowNull: false,
        defaultValue: 'DEFAULT',
        comment: '접근 플랫폼',
      },
      customer_yn: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '사용자 사용 여부',
      },
    },
    /* options */
    {
      tableName: 'customer',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  customer.associate = (models) => {
    customer.hasMany(models.medical_table, { foreignKey: 'customer_id' });
    customer.hasMany(models.medical_reservation, { foreignKey: 'customer_id' });
    customer.hasMany(models.survey_answer, { foreignKey: 'customer_id' });
    customer.hasOne(models.customer_detail, { foreignKey: 'customer_id' });
    customer.hasOne(models.customer_emergency, { foreignKey: 'customer_id' });
    customer.belongsTo(models.chief_customer, { foreignKey: 'customer_tel' });
  };

  return customer;
};
