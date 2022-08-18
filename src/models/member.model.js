import moment from 'moment';
import {
  STRING,
  ENUM,
  DATE,
  NOW,
  CHAR,
  UUIDV4,
  BOOLEAN,
  INTEGER,
  literal,
} from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const member = sequelize.define(
    'member',
    /* Properties */
    {
      member_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '사원 코드',
      },
      member_login_id: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '사원 로그인 아이디',
      },
      member_login_pw: {
        type: STRING(255),
        allowNull: false,
        comment: '사원 로그인 비밀번호',
      },
      member_pin: {
        type: CHAR(4),
        allowNull: false,
        comment: '사원 핀 비밀번호',
      },
      member_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '사원명',
      },
      member_div: {
        type: ENUM(['ADMIN', 'WRITE', 'READ']),
        allowNull: false,
        defaultValue: 'READ',
        comment: '사원 구분',
      },
      created_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '생성일자',
      },
      modify_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '수정일자',
      },
      use_yn: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '사원 사용여부',
      },
    },
    /* options */
    {
      tableName: 'member',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  /* Relations */
  member.associate = (models) => {
    member.hasOne(models.member_dept, { foreignKey: 'member_id' });
    member.hasOne(models.member_company, { foreignKey: 'member_id' });
  };

  return member;
};
