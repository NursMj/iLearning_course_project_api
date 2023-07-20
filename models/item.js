module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    // requiredField1_name: {
    //   type: DataTypes.STRING,
    //   defaultValue: 'Name',
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
    requiredField1_value: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // integerField1_name: { type: DataTypes.STRING, allowNull: true },
    integerField1_value: { type: DataTypes.INTEGER, allowNull: true },
    // integerField2_name: { type: DataTypes.STRING, allowNull: true, },
    integerField2_value: { type: DataTypes.INTEGER, allowNull: true },
    // integerField3_name: { type: DataTypes.STRING, allowNull: true, },
    integerField3_value: { type: DataTypes.INTEGER, allowNull: true },
    // stringField1_name: { type: DataTypes.STRING, allowNull: true, },
    stringField1_value: { type: DataTypes.STRING, allowNull: true },
    // stringField2_name: { type: DataTypes.STRING, allowNull: true, },
    stringField2_value: { type: DataTypes.STRING, allowNull: true },
    // stringField3_name: { type: DataTypes.STRING, allowNull: true, },
    stringField3_value: { type: DataTypes.STRING, allowNull: true },
    // multilineField1_name: { type: DataTypes.STRING, allowNull: true, },
    multilineField1_value: { type: DataTypes.TEXT, allowNull: true },
    // multilineField2_name: { type: DataTypes.STRING, allowNull: true, },
    multilineField2_value: { type: DataTypes.TEXT, allowNull: true },
    // multilineField3_name: { type: DataTypes.STRING, allowNull: true, },
    multilineField3_value: { type: DataTypes.TEXT, allowNull: true },
    // dooleanField1_name: { type: DataTypes.STRING, allowNull: true, },
    booleanField1_value: { type: DataTypes.BOOLEAN, allowNull: true },
    // dooleanField2_name: { type: DataTypes.STRING, allowNull: true, },
    booleanField2_value: { type: DataTypes.BOOLEAN, allowNull: true },
    // dooleanField3_name: { type: DataTypes.STRING, allowNull: true, },
    booleanField3_value: { type: DataTypes.BOOLEAN, allowNull: true },
    // dateField1_name: { type: DataTypes.STRING, allowNull: true, },
    dateField1_value: { type: DataTypes.DATE, allowNull: true },
    // dateField2_name: { type: DataTypes.STRING, allowNull: true, },
    dateField2_value: { type: DataTypes.DATE, allowNull: true },
    // dateField3_name: { type: DataTypes.STRING, allowNull: true, },
    dateField3_value: { type: DataTypes.DATE, allowNull: true },
  })

  Item.associate = (models) => {
    Item.belongsTo(models.Collection)
    Item.belongsToMany(models.Tag, { through: 'ItemTag' })
    Item.hasMany(models.Like)
    Item.hasMany(models.Comment)
  }

  return Item
}
