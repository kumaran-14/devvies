const router = require('express').Router()

// @route    GET /api/users/test
// @desc     Test route
// @access   Public
router.get('/test', (req, res) => res.json({msg:'Ahoy users!'}))

module.exports = router
