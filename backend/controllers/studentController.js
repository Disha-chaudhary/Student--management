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
                success:true,
                message:"Student added Successfully!!",
                student,
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

const getAllStudents =async (req,res)=>{
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

const getStudentById = async (req,res)=>{
    try{
    const id = req.params.id;

   const found = await Student.findById(id);
   if(!found){
    return res.status(404).json({
        success:false,
        message:"student not found!!",
    }) ;
}
    res.status(200).json({
        success:true,
        message:"student is found",
        student: found,
    })
   
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal server error",
    });
}

}

const updateStudent = async (req,res)=>{
    try{
    const id = req.params.id;
    const {name,rollNumber, department,year,phone} = req.body;
    const existingStudent = await Student.findById(id);

    if(!existingStudent){
        return res.status(404).json({
            success:false,
            message:"Student not found",
        });
    }
    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
            name,
            rollNumber,
            department,
            year,
            phone,
        },
        {
            new: true,
        }
    );
    res.status(200).json({
        success:true,
        message:"Student updated successfully",
    });
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Internal server error",
    });
}
}

const searchStudent = async (req,res)=>{
    try{
        const name = req.query.name;

        const students = await Student.find({
            name: {
                $regex: name,
                $options: "i",
            },
        });
        res.status(200).json({
            success: true,
            students,
        });
    } catch (error){
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error!!",
        });

    }
}

const getStudentsWithPagination = async (req,res)=>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page-1)*limit;

        const students = await Student.find().skip(skip).limit(limit);

        res.status(200).json({
            success:true,
            page,
            limit,
            students,

        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"internal server error "
        })
    }
}
module.exports={
    addStudent,getAllStudents,getStudentById,updateStudent,deleteStudent,searchStudent,getStudentsWithPagination,
}