module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, defaultValue: '' },
    
  })

  Collection.associate = (models) => {
    Collection.belongsTo(models.User)
    Collection.belongsTo(models.Topic)
    Collection.hasOne(models.ItemPattern)
    Collection.hasMany(models.Item)
  }

  return Collection
}
