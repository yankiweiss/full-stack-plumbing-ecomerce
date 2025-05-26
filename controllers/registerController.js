const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {
        this.users = data
    }
}

const fsPromises = require('fs').promises;
const path = require('path')
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const {user , pwd } = req.body;

    if(!user || !pwd) return res.status(400).json({'message' : 'Username and Password are Required!' })

    const duplicate = usersDB.users.find(person => person.username === user)

    if(duplicate) return res.status(409).json({"message": "this Username exist already!"});

    try {

        const hashedPwd = await bcrypt.hash(pwd, 10)

        const newUser = {
            "username": user,
            "roles": {"Users": 1000},
             "password": hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser])

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        await res.status(201).json({'Success': `new user ${user}, was created!`})
        
    } catch (error) {
        res.status(500).json({"message": `Error while getting/sending Request! ${error.message}`})
    }

}


module.exports = {
    handleNewUser
}









