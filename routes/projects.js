const router = require("express").Router();
const Project = require('../models/Project')
const Category = require('../models/Category')

// CREATE PROJECT
router.post("/", async (req, res) => {
    const project = new Project(req.body);
    try {
        const saved_project = await project.save(project);
        return res.status(200).json(saved_project);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// UPDATE PROJECT
router.put("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            res.status(400).json("Project not found")
        }
        const update_project = Project.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
                { new: true }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// DELETE PROJECT
router.delete("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        await project.delete();
        res.status(200).json("Post is deleted")
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET PROJECT
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

// LIST ALL PROJECT
router.get("/", async (req, res) => {
    try {
        const catName = req.query.cat;
        if (catName) {
            projects = await Project.find({
                categories: {
                $in:[catName]
            }})
        } else {
            projects = await Project.find()
        }
        res.status(200).json(projects)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router