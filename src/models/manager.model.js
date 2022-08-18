import moment from 'moment';
import { CHAR, INTEGER, literal, STRING } from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const manager = sequelize.define(
    'manager',
    /* Properties */
    {
      manager_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '관리자 코드',
      },
      manager_login_id: {
        type: STRING(255),
        allowNull: false,
        comment: '관리자 로그인 아이디',
      },
      manager_login_pw: {
        type: STRING(255),
        allowNull: false,
        comment: '관리자 비밀번호',
      },
      manager_pin: {
        type: CHAR(4),
        allowNull: false,
        comment: '관리자 핀 비밀번호',
      },
      manager_nm: {
        type: STRING(45),
        allowNull: true,
        comment: '관리자명',
      },
      created_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '생성일',
      },
      modified_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '최근 수정일',
      },
    },
    /* options */
    {
      tableName: 'manager',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  return manager;
};
