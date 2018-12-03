const router = require('express').Router()

// @route    GET /api/posts/test
// @desc     Test route
// @access   Public
router.get('/test', (req, res) => res.json({msg:'Ahoy posts!'}))

module.exports = router
