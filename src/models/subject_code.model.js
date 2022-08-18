import { CHAR, STRING, UUIDV4 } from 'sequelize';
('use strict');
module.exports = (sequelize) => {
  const subject_code = sequelize.define(
    'subject_code',
    /* Properties */
    {
      subject_code_id: {
        type: CHAR(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '내방사유코드',
      },
      subject_nm: {
        type: STRING(45),
        allowNull: false,
        comment: '내방 사유',
      },
      subject_desc: {
        type: STRING(255),
        allowNull: false,
        comment: '내방 사유 설명',
      },
    },
    /* options */
    {
      tableName: 'subject_code',
      freezeTableName: false,
      underscored: true,
      timestamps: false,
    }
  );

  subject_code.associate = (models) => {};

  return subject_code;
};
