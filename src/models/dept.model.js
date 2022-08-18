import moment from 'moment';
import { STRING, UUIDV4, BOOLEAN, INTEGER, literal } from 'sequelize';

('use strict');
module.exports = (sequelize) => {
  const dept = sequelize.define(
    'dept',
    /* Properties */
    {
      dept_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '부서 코드',
      },
      dept_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '부서명',
      },
      dept_manager: {
        type: STRING(255),
        allowNull: false,
        comment: '부서 관리자',
      },
      created_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '부서 생성일자',
      },
      modify_at: {
        type: INTEGER,
        allowNull: false,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '부서 수정일자',
      },
      dept_yn: {
        type: BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: '부서 사용여부',
      },
    },
    /* options */
    {
      tableName: 'dept',
      freezeTableName: false,
      underscored: false,
      timestamps: false,
    }
  );

  dept.associate = (models) => {
    dept.belongsTo(models.company, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'company_id',
        allowNull: true,
      },
    });
  };

  return dept;
};
