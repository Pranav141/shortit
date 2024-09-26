const express = require('express');
const { login, register, verify } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const Url = require('../models/url.model');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify', verify);
router.get('/:userId/urls', auth, async (req, res) => {
    const userId = req.params.userId;
    const urls = await Url.find({ userId: userId })
        .select('originalUrl hashedUrl isEnabled totalVisits _id createdAt updatedAt');
    if (urls) {
        res.status(200).send({ urls });
    }
    else {
        res.status(400).send({ message: "No urls found" });
    }
}) 

router.get('/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
    if(mongoose.Types.ObjectId.isValid(userId) === false) {
        return res.status(400).send({ message: "Invalid userId" });
    }
    const data = await Url.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId) // Use the converted ObjectId here
            }
        },
        {
            $group: {
                _id: null,
                totalUrls: { $sum: 1 },
                totalVisits: { $sum: "$totalVisits" },
                totalEnabled: {
                    $sum: { $cond: [{ $eq: ["$isEnabled", true] }, 1, 0] }
                }
            }
        },
        {
            $project: {
                _id: 0, // Exclude _id field from the result
                totalUrls: 1,
                totalVisits: 1,
                totalEnabled: 1
            }
        }
    ]);

    
    res.status(200).send({ data: data });
})

module.exports = router