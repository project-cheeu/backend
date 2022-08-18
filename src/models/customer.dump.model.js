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
  const customer_dump = sequelize.define(
    'customer_dump',
    /* Properties */
    {
      dump_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '사용자 코드',
      },
      customer_tel: {
        type: STRING(255),
        allowNull: false,
        comment: '사용자 전화번호',
      },
      customer_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '사용자이름',
      },
      customer_num: {
        type: STRING(13),
        allowNull: false,
        unique: true,
        comment: '사용자 주민등록번호',
      },
      customer_addr: {
        type: STRING(255),
        allowNull: true,
        comment: '사용자 주소',
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
    },
    /* options */
    {
      tableName: 'customer_dump',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  customer_dump.associate = (models) => {
    customer_dump.belongsTo(models.company, { foreignKey: 'company_id' });
  };

  return customer_dump;
};
