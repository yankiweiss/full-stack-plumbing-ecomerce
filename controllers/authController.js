const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const fsPromises = require('fs').promises;

const path = require('path')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ "message": "Username and Password are required!" })

    const foundUser = usersDB.users.find(person => person.username === user);

    if (!foundUser) return res.status(401).json({ "message": "Your Username has not been found!" });

    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        res.json({
            "message": `${user} is now successfully logged in!`
        })
    } else {
        res.sendStatus(401)
    }
}


module.exports = {
    handleLogin
}