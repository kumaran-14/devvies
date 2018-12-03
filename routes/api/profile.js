const router = require('express').Router()

// @route    GET /api/profile/test
// @desc     Test route
// @access   Public
router.get('/test', (req, res) => res.json({msg:'Ahoy profile!'}))

module.exports = router
