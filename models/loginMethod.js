const db = require('../database');

module.exports = class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

     static save(username, password) {
        return db.execute('INSERT INTO user (username, password) VALUES (?, ?)', [username, password])
        
    }

    static addTask(userId, task) {
        return db.execute('INSERT INTO tasks (task, userId) VALUES (?, ?)', [task, userId]);
    }

    static fetchTasks(userId) {
        return db.execute('SELECT * FROM tasks WHERE userId = ?', [userId]);
    }
    static deleteTasks(id){
        return db.execute('DELETE from tasks WHERE id=?',[id]);
    }

    static fetchUserByUsername(username){
        return db.execute('SELECT * FROM user WHERE userName=?',[username]);
    }
};
