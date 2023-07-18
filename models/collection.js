module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.TEXT, allowNull: false },
    img: { type: DataTypes.TEXT, defaultValue: '' },
    requiredField1_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Name',
    },
    integerField1_name: { type: DataTypes.STRING, allowNull: true },
    integerField2_name: { type: DataTypes.STRING, allowNull: true },
    integerField3_name: { type: DataTypes.STRING, allowNull: true },
    stringField1_name: { type: DataTypes.STRING, allowNull: true },
    stringField2_name: { type: DataTypes.STRING, allowNull: true },
    stringField3_name: { type: DataTypes.STRING, allowNull: true },
    multilineField1_name: { type: DataTypes.STRING, allowNull: true },
    multilineField2_name: { type: DataTypes.STRING, allowNull: true },
    multilineField3_name: { type: DataTypes.STRING, allowNull: true },
    booleanField1_name: { type: DataTypes.STRING, allowNull: true },
    booleanField1_name: { type: DataTypes.STRING, allowNull: true },
    booleanField1_name: { type: DataTypes.STRING, allowNull: true },
    dateField1_name: { type: DataTypes.STRING, allowNull: true },
    dateField2_name: { type: DataTypes.STRING, allowNull: true },
    dateField3_name: { type: DataTypes.STRING, allowNull: true },
  })

  Collection.associate = (models) => {
    Collection.belongsTo(models.User)
    Collection.belongsTo(models.Topic)
    Collection.hasMany(models.Item)
  }

  return Collection
}
