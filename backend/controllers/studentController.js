const Student = require("../models/Student");


const addStudent = async(req,res)=>{
    try{
        const {name,rollNumber,department,year,phone} = req.body;
        if(!name || !rollNumber || !department || !year || !phone){
            return res.status(400).json({
                success:false,
                message: "please fill all the fields",
            });
        }
            const existingStudent = await Student.findOne({
                    rollNumber,
            });
            if(existingStudent){
                return res.status(401).json({
                    success:false,
                    message:"Student already exists",
                });
            }
            const student = await Student.create({
                name,
                rollNumber,
                department,
                year,
                phone,
            });
            res.status(201).json({
                success:false,
                message:"Student added Successfully!!",
            });

        

    }
    catch (error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Internal Server error",
        });

    }
};

const getAllStudents = (req,res)=>{
    try{
     

      const students = await  Student.find();
        res.status(200).json({
            success:true,
            message:"all students",
            students,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "Internal Server Error!!",
        });
    }

}


const deleteStudent = async (req, res) => {
    try {

        const id = req.params.id;

        const exist = await Student.findById(id);

        if (!exist) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        await Student.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Student deleted successfully",
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};
module.exports={
    addStudent,
}