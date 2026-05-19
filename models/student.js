const {DataTypes} = require('sequelize');
const sequeize = require('../config/db');

const student = sequeize.define('student', {
    studentId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    studentName:{
        type:DataTypes.STRING(255),
    },
    classId:{
        type:DataTypes.BIGINT,
    }
},{
    timestamps:false
});

module.exports = student;