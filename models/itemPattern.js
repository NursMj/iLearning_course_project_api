module.exports = (sequelize, DataTypes) => {
    const ItemPattern = sequelize.define('ItemPattern', {
      integerField1_name: { type: DataTypes.STRING, defaultValue: ''},
      integerField2_name: { type: DataTypes.STRING, defaultValue: ''},
      integerField3_name: { type: DataTypes.STRING, defaultValue: ''},
      stringField1_name: { type: DataTypes.STRING, defaultValue: ''},
      stringField2_name: { type: DataTypes.STRING, defaultValue: ''},
      stringField3_name: { type: DataTypes.STRING, defaultValue: ''},
      multilineField1_name: { type: DataTypes.STRING, defaultValue: ''},
      multilineField2_name: { type: DataTypes.STRING, defaultValue: ''},
      multilineField3_name: { type: DataTypes.STRING, defaultValue: ''},
      dooleanField1_name: { type: DataTypes.STRING, defaultValue: ''},
      dooleanField2_name: { type: DataTypes.STRING, defaultValue: ''},
      dooleanField3_name: { type: DataTypes.STRING, defaultValue: ''},
      dataField1_name: { type: DataTypes.STRING, defaultValue: ''},
      dataField2_name: { type: DataTypes.STRING, defaultValue: ''},
      dataField3_name: { type: DataTypes.STRING, defaultValue: ''},
    })
  
    ItemPattern.associate = (models) => {
        ItemPattern.belongsTo(models.Collection)
        ItemPattern.hasMany(models.Item)
      // Collection.hasMany(models.Item, {as: 'item'})
      // Define other associations here
    }
    
    return ItemPattern
  }
  