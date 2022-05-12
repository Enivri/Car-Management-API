const { Users, Cars } = require("../models");

class UsersRepository {
    static async getByEmail({ email }) {
        const getUser = await Users.findOne({ where: { email: email } });
        
        return getUser;
    }

    static async create({ name, email, password, role }) {
        const createdUser = await Users.create({
            name,
            email,
            password,
            role
        });

        return createdUser;
    }

}

module.exports = UsersRepository;