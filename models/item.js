module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    integerField1_name: { type: DataTypes.STRING, defaultValue: ''},
    integerField1_value: { type: DataTypes.STRING, defaultValue: ''},
    integerField2_name: { type: DataTypes.STRING, defaultValue: ''},
    integerField2_value: { type: DataTypes.STRING, defaultValue: ''},
    integerField3_name: { type: DataTypes.STRING, defaultValue: ''},
    integerField3_value: { type: DataTypes.STRING, defaultValue: ''},
    stringField1_name: { type: DataTypes.STRING, defaultValue: ''},
    stringField1_value: { type: DataTypes.STRING, defaultValue: ''},
    stringField2_name: { type: DataTypes.STRING, defaultValue: ''},
    stringField2_value: { type: DataTypes.STRING, defaultValue: ''},
    stringField3_name: { type: DataTypes.STRING, defaultValue: ''},
    stringField3_value: { type: DataTypes.STRING, defaultValue: ''},
    multilineField1_name: { type: DataTypes.STRING, defaultValue: ''},
    multilineField1_value: { type: DataTypes.STRING, defaultValue: ''},
    multilineField2_name: { type: DataTypes.STRING, defaultValue: ''},
    multilineField2_value: { type: DataTypes.STRING, defaultValue: ''},
    multilineField3_name: { type: DataTypes.STRING, defaultValue: ''},
    multilineField3_value: { type: DataTypes.STRING, defaultValue: ''},
    dooleanField1_name: { type: DataTypes.STRING, defaultValue: ''},
    dooleanField1_value: { type: DataTypes.STRING, defaultValue: ''},
    dooleanField2_name: { type: DataTypes.STRING, defaultValue: ''},
    dooleanField2_value: { type: DataTypes.STRING, defaultValue: ''},
    dooleanField3_name: { type: DataTypes.STRING, defaultValue: ''},
    dooleanField3_value: { type: DataTypes.STRING, defaultValue: ''},
    dataField1_name: { type: DataTypes.STRING, defaultValue: ''},
    dataField1_value: { type: DataTypes.STRING, defaultValue: ''},
    dataField2_name: { type: DataTypes.STRING, defaultValue: ''},
    dataField2_value: { type: DataTypes.STRING, defaultValue: ''},
    dataField3_name: { type: DataTypes.STRING, defaultValue: ''},
    dataField3_value: { type: DataTypes.STRING, defaultValue: ''},
  })

  Item.associate = (models) => {
    Item.belongsTo(models.ItemPattern)
    // Collection.hasMany(models.Item, {as: 'item'})
    // Define other associations here
  }
  
  return Item
}
