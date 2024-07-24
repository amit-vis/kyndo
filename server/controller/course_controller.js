const Course = require("../model/course/course");
const Syllabus = require("../model/course/syllabus");

module.exports.create = async (req, res)=>{
    try {
        const {title, description, syllabus} = req.body;
        let course = await Course.findOne({title: title});
        if(course){
            return res.status(400).json({
                message: "same name course is already exist!",
                success: false
            })
        }
        
        const syllabusItemSchem = await Promise.all(syllabus.map(async (item)=>{
            const newItem = new Syllabus(item);
            await newItem.save();
            return newItem._id
        }))

        course = await Course.create({
            title: title,
            description: description,
            syllabus: syllabusItemSchem,
            tutor: req.user._id
        })
        return res.status(200).json({
            message: "course is created successfully!",
            success: true,
            course
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in creating the course",
            success: false
        })
    }
}

