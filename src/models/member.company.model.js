import { CHAR } from 'sequelize';
import company from './company.model';
import member from './member.model';
('use strict');
module.exports = (sequelize) => {
  const member_company = sequelize.define(
    'member_company',
    /* Properties */
    {
      company_id: {
        type: CHAR(36),
        primaryKey: true,
        references: {
          model: company,
          key: 'company_id',
        },
      },
      member_id: {
        type: CHAR(36),
        primaryKey: true,
        references: {
          model: member,
          key: 'member_id',
        },
      },
    },
    /* options */
    {
      tableName: 'member_company',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  member_company.associate = (models) => {
    member_company.belongsTo(models.company, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'company_id',
        allowNull: true,
      },
    });
    member_company.belongsTo(models.member, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'member_id',
        allowNull: true,
      },
    });
  };

  return member_company;
};
