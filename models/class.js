const { DataType } = requires('sequlise');
const sequlise = require('../config/db')

const Class = sequlise.define('class', {

    classId: {
        type: DataType.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    className: {
        type: DataType.STRING(255),
    },
    classNumber: {
        type: DataType.INTIGER
    }

}, {
    timestamps: false
});

module.exports = Class;