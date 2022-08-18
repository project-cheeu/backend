import { CHAR } from 'sequelize';
import member from './member.model';
import dept from './dept.model';
('use strict');
module.exports = (sequelize) => {
  const member_dept = sequelize.define(
    'member_dept',
    /* Properties */
    {
      member_id: {
        type: CHAR(36),
        primaryKey: true,
        references: {
          model: member,
          key: 'mebmer_id',
        },
      },
      dept_id: {
        type: CHAR(36),
        primaryKey: true,
        references: {
          model: dept,
          key: 'dept_id',
        },
      },
    },
    /* options */
    {
      tableName: 'member_dept',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  member_dept.associate = (models) => {
    member_dept.belongsTo(models.dept, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'dept_id',
        allowNull: true,
      },
    });
    member_dept.belongsTo(models.member, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'member_id',
        allowNull: true,
      },
    });
  };

  return member_dept;
};
