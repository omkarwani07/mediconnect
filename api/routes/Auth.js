const express = require('express');
const router = express.Router();

const {register, login, editProfile, addEducation, addCertificate, addExperience, createPost, showConnections} = require('../controllers/Auth');

router.post('/register', register);
router.post('/login', login);
router.post('/edit', editProfile);
router.post('/education/add', addEducation);
router.post('/experience/add', addExperience);
router.post('/certificate/add', addCertificate);
router.post('/post/create', createPost);
router.post('/connection/show', showConnections);

module.exports = router;