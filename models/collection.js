module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    // topicId: { type: DataTypes.STRING, allowNull: false },
    // userId: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, defaultValue: '' },
  })

  Collection.associate = (models) => {
    Collection.belongsTo(models.User)
    Collection.belongsTo(models.Topic)
    Collection.hasMany(models.Item)
    // Define other associations here
  }

  return Collection
}
