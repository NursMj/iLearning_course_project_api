module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  Comment.associate = (models) => {
    Comment.belongsTo(models.Item)
    Comment.belongsTo(models.User)
  }

  return Comment
}
