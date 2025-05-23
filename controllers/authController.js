const usersDB = {
    users: require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

const bcrypt = require('bcryptjs');

const handleLogin = async (req, res) => {
    const {user, pwd } = req.body;
    if(!user|| !pwd) return res.status(400).json({"message" : "Username and Password are Required!"})

        const foundUser = usersDB.users.find(person => person.username === user)

        if(!foundUser) return res.sendStatus(401);

        const match = await bcrypt.compare(pwd, foundUser.password);

        if(match) {
            res.json({'message': `user ${user} is logged in!`})
        }else {
            res.status(401)
        }
}

module.exports = {handleLogin}