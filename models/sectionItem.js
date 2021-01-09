'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SectionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SectionItem.belongsTo(models.Section);
    }
  };
  SectionItem.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    place: DataTypes.STRING,
    about: DataTypes.TEXT,
    startedAt: DataTypes.DATEONLY,
    endedAt: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'SectionItem',
  });
  return SectionItem;
};
