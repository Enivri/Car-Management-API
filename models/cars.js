'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    plate: DataTypes.STRING,
    manufacture: DataTypes.STRING,
    model: DataTypes.STRING,
    image: DataTypes.STRING,
    rentPerDay: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    transmission: DataTypes.STRING,
    type: DataTypes.STRING,
    year: DataTypes.STRING,
    options: DataTypes.ARRAY(DataTypes.STRING),
    specs: DataTypes.ARRAY(DataTypes.STRING),
    isWithDriver: DataTypes.BOOLEAN,
    availableAt: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};