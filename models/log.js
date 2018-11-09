module.exports = function (sequelize, DataTypes) {
    const Log = sequelize.define('log', {
      ownerId: {
            type: DataTypes.INTEGER,
            allownull: false,
        },
        caption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        compose: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return Log;
}