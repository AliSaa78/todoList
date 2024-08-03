const loginModel = require('../models/loginMethod');
const bcrypt= require('bcrypt');
exports.login = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword=await bcrypt.hash(password,10);
    loginModel.save(username, hashedPassword)
        .then(result => {
            console.log('Login succeeded');
            res.redirect(`/tasks/${result[0].insertId}`); // Redirect to tasks page with userId
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error during login');
        });
};

exports.getTasks = async (req, res, next) => {
    const userId = req.params.userId;
    console.log('Fetching tasks for User ID:', userId); // Debugging
    
    try {
        const [tasks] = await loginModel.fetchTasks(userId);
        res.render('taskpage', { userId, tasks });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching tasks');
    }
};

exports.addTask = async (req, res, next) => {
    const { taskInput, userId } = req.body;
    console.log('Task Input:', taskInput); // Debugging
    console.log('User ID:', userId); // Debugging

    try {
        await loginModel.addTask(userId, taskInput);
        res.redirect(`/tasks/${userId}`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error adding task');
    }
};

exports.deleteTask= async (req,res,next)=>{
const taskId = req.params.taskId;
const userId= req.params.userId;
try{
    await loginModel.deleteTasks(taskId)
    res.redirect(`/tasks/${userId}`);
} catch (err) {
    console.log(err);
    res.status(500).send('Error deleting task');
}


};

exports.OldSignUp =  (req, res, next) => {
   const username= req.body.username;
   const password = req.body.password;
   console.log(username);
   console.log(password);
  
   loginModel.fetchUserByUsername(username).then(result => {
      if (!result.length) {
        return res.status(404).send('User not found');
      }

      const hashedPassword = result[0];
      console.log(result);

  if (!hashedPassword) {
    return res.status(500).send('Error: Hashed password is undefined or null');
  }
      bcrypt.compare(password, hashedPassword)
        .then(match => {
          if (match) {
            return res.redirect(`/tasks/${result[0].id}`);
          } else {
            return res.status(401).send('Incorrect password');
          }
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send('Error during password comparison');
        });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send('Error during fetching user');
    });
};
