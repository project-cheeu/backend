'use strict';

const Sequelize = require('sequelize');

const { UUIDV4, STRING, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const company_assets = sequelize.define(
    'company_assets',
    /* Properties */
    {
      assets_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '회사 자원 코드',
      },
      logo_url: {
        type: STRING(255),
        allowNull: true,
        comment: '회사 로고 이미지 경로',
      },
      operating_time: {
        type: STRING(255),
        allowNull: true,
        comment: '운영시간',
      },
      ambient_environment: {
        type: TEXT,
        allowNull: true,
        comment: '주변환경',
      },
      company_thumbnail: {
        type: STRING(255),
        allowNull: true,
        comment: '병원 대표 사진',
      },
      company_guidance: {
        type: TEXT,
        allowNull: true,
        comment: '병원 간편 안내글',
      },
      company_signature: {
        type: TEXT,
        allowNull: true,
        comment: '병원 특성화진료항목',
      },
    },
    /* options */
    {
      tableName: 'company_assets',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  company_assets.associate = (models) => {
    company_assets.belongsTo(models.company, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'company_id',
        allowNull: true,
      },
    });
  };

  return company_assets;
};
