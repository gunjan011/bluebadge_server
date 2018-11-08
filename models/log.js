module.exports = function (sequelize, DataTypes) {
    const Log = sequelize.define('log', {
      poemId: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true
        },
        caption: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        compose: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Log;
}