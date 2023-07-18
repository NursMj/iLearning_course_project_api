module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
    })
  
    Like.associate = (models) => {
        Like.belongsTo(models.Item)
        Like.belongsTo(models.User)
    }
  
    return Like
  }
  