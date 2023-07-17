module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    language: { type: DataTypes.STRING, defaultValue: 'en' },
    blocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    darkMode: { type: DataTypes.BOOLEAN, defaultValue: false },
  })

  User.associate = (models) => {
    User.hasMany(models.Collection)
  }

  return User
}
