module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: { type: DataTypes.STRING, allowNull: false },
  })

  Topic.associate = (models) => {
    Topic.hasMany(models.Collection)
  }

  return Topic
}
