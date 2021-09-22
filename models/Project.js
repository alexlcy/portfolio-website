const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true,
    },
    desc: {
        type: String,
        required: true,
    },
    long_desc: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        default:""
    },
    categories: {
        type: Array,
        required:false,
    },
},
    {timestamps:true}
)

module.exports = mongoose.model("Project", ProjectSchema)