const Course = require("../model/course");
const cloudinary = require("../config/cloudnary");

module.exports.create = async (req, res) => {
    try {
        const { title, description, prerequisites, syllabus } = req.body;

        // Check if a course with the same title already exists
        let course = await Course.findOne({ title: title });
        if (course) {
            return res.status(400).json({
                message: "A course with the same name already exists!",
                success: false
            });
        }

        // Function to upload files to Cloudinary
        const uploadFile = async (file, folder, resourceType) => {
            try {
                return await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: folder,
                    resource_type: resourceType
                });
            } catch (error) {
                console.error(`Error uploading file to Cloudinary:`, error);
                throw new Error(`Failed to upload file`);
            }
        };

        let videoUrl = '';
        let courseNotes = '';
        let courseAssignments = '';
        let courseThumbnail = '';

        // Upload video if present
        if (req.files && req.files.videoUrl) {
            const videoFile = req.files.videoUrl;
            const result = await uploadFile(videoFile, "Amit/videos", 'video');
            videoUrl = result.secure_url;
        }

        // Upload course notes if present
        if (req.files && req.files.courseNotes) {
            const notesFile = req.files.courseNotes;
            const result = await uploadFile(notesFile, "Amit/notes", 'raw');
            courseNotes = result.secure_url;
        }

        // Upload course assignments if present
        if (req.files && req.files.courseAssignments) {
            const assignmentFile = req.files.courseAssignments;
            const result = await uploadFile(assignmentFile, "Amit/assignments", 'raw');
            courseAssignments = result.secure_url;
        }

        // Upload course thumbnail if present
        if (req.files && req.files.courseThumbnail) {
            const imageFile = req.files.courseThumbnail;
            const result = await uploadFile(imageFile, "Amit/thumbnails", 'image');
            courseThumbnail = result.secure_url;
        }

        let parsedSyllabus = [];
        if (syllabus) {
            parsedSyllabus = JSON.parse(syllabus).map(week => ({ chapters: week.chapters }));
        }

        // Create new course
        const newCourse = await Course.create({
            title: title,
            author: req.body.author || req.user.name,
            description: description,
            videoUrl: videoUrl,
            prerequisites: prerequisites,
            syllabus: parsedSyllabus,
            courseNotes: courseNotes,
            courseThumbnail: courseThumbnail,
            courseAssignments: courseAssignments,
            tutor: req.user._id
        });

        return res.status(200).json({
            message: "Course created successfully!",
            success: true,
            course: newCourse
        });
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            message: "Internal server error in creating the course",
            success: false
        });
    }
};

module.exports.getCourse = async (req, res)=>{
    try {
        const course = await Course.find({}).sort({createdAt: -1})
        return res.status(200).json({
            message: "Here is the course!!",
            course
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the course!",
            success: false
        });
    }
}

module.exports.getSingleCourse = async (req, res)=>{
    try {
        const course = await Course.findById(req.params.id);
        return res.status(200).json({
            message: "Here is the course!!",
            course
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in getting the course!",
            success: false
        });
    }
}

module.exports.editCourse = async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}