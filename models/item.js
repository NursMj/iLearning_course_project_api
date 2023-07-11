module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    requiredField1_name: {
      type: DataTypes.STRING,
      defaultValue: 'Name',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    requiredField1_value: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    integerField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    integerField1_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    integerField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    integerField2_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    integerField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    integerField3_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    stringField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    stringField1_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    stringField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    stringField2_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    stringField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    stringField3_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    multilineField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    multilineField1_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    multilineField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    multilineField2_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    multilineField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    multilineField3_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dooleanField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dooleanField1_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dooleanField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dooleanField2_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dooleanField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dooleanField3_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dateField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dateField1_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dateField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dateField2_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dateField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    dateField3_value: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
  })

  Item.associate = (models) => {
    Item.belongsTo(models.ItemPattern)
    Item.belongsTo(models.Collection)
    Item.belongsTo(models.User)
  }

  return Item
}
