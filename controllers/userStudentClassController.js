const Student = require('../models/student');

exports.getAllStudent = async (req, res) => {
    try {
        const student = await Student.findAll();
        res.json({ data: student, message: "Get all student success" });
    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
}


exports.getStudentClassView = async (req, res) => {

    try {

        const query = "select * from student_with_class";
        const [results] = await Student.sequelize.query(query);
        res.json({ data: results, message: "Get student class view success" });
       

    } catch (error) {

        res.json({ message: 'internal server error' })

    }


}

exports.getSCByProcedure = async (req, res) => {
    try {
        const [results] = await Student.sequelize.query(
            "CALL getStudentClassProce(1)"
        );

        res.json({
            message: "Success",
            data: results
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};