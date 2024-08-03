const express = require('express');
const path = require('path');
const newSign = require('../controllers/login');
const router = express.Router();

router.post('/login', newSign.login);

router.post('/add-task', newSign.addTask);

router.get('/tasks/:userId', newSign.getTasks);

router.post('/delete-task/:userId/:taskId', newSign.deleteTask);
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.post('/signup',newSign.OldSignUp);

router.get('/signup',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'signup.html'));
})

module.exports = router;
