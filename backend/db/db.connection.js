const mongoose = require('mongoose');

const DatabaseConnection = async() => {
    try{
        await mongoose.connect("mongodb+srv://bhuvankaushal08112002:M8q85CYUkMJejSOJ@cluster0.0km1b1v.mongodb.net/events")
        // await mongoose.connect("mongodb://127.0.0.1:27017/collegeEvents")
        console.log("Successfully connected to mongoDB")
    } catch(error){
        console.log(`ERROR: ${error.message}`)
        process.exit(1)
    }
};

module.exports = { DatabaseConnection };
