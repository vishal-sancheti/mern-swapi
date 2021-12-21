const express = require('express');
const router = express.Router();

//Main API Endpoint
router.get('/', (req,res) => {
    return res.status(200).json({
        success: true,
        message: "This is an API Endpoint"
    });
});

const peopleRouter = require('./routes/peopleRoutes');
router.use('/people',peopleRouter);

//404 Error Handling
router.use(function(req, res) {
    res.status(404).json({
        success: false,
        message: "Not found"
    });
});

module.exports = router;