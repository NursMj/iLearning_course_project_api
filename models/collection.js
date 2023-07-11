module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, defaultValue: '' },
    requiredField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Name'},
    integerField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    integerField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    integerField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    stringField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    stringField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    stringField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    multilineField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    multilineField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    multilineField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    dooleanField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    dooleanField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    dooleanField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    dateField1_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    dateField2_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
    dateField3_name: { type: DataTypes.STRING, allowNull: false, defaultValue: ''},
  })

  Collection.associate = (models) => {
    Collection.belongsTo(models.User)
    Collection.belongsTo(models.Topic)
    Collection.hasMany(models.Item)
  }

  return Collection
}
