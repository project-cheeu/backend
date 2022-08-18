'use strict';

const { INTEGER, literal } = require('sequelize');
const Sequelize = require('sequelize');

const { UUIDV4, STRING, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const company_video = sequelize.define(
    'company_video',
    /* Properties */
    {
      video_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '영상 코드',
      },
      video_title: {
        type: STRING(255),
        allowNull: true,
        comment: '영상 URL',
      },
      video_url: {
        type: STRING(255),
        allowNull: true,
        comment: '영상 URL',
      },
      video_yn: {
        type: STRING(255),
        allowNull: true,
        defaultValue: true,
        comment: '영상 사용 여부',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '영상 생성일',
      },
    },
    /* options */
    {
      tableName: 'company_video',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  company_video.associate = (models) => {
    company_video.belongsTo(models.company, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'company_id',
        allowNull: true,
      },
    });
  };

  return company_video;
};
