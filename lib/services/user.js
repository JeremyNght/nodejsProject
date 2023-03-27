'use strict';

const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');
const jeremyencrypt = require('@jeremm/iut-encrypt');
const tokenKey = process.env.API_KEY;

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        user.password = await jeremyencrypt.hash(user.password);
        return User.query().insertAndFetch(user);
    }

    async update(user) {
        const { User } = this.server.models();
        if (user.password) {
            user.password = await jeremyencrypt.hash(user.password);
        }
        return User.query().patch(user).findById(user.id);
    }

    async deleteUserById(request) {
        const { id } = request.payload;
        const { User } = request.models();
        await User.query().deleteById(id);
    }

    getAll(request) {
        const { User } = request.models();
        return User.query().select();
    }

    async login(user) {
        try {
            const { User } = this.server.models();
            const userSearch = await User.query().findOne({
                mail: user.mail
            });
            const isValidPassword = await jeremyencrypt.compare(user.password, userSearch.password);

            if (isValidPassword){
                const token = generateToken(userSearch);
                return {token: token}
            }
            return {login: "invalid password"};
        } catch (error) {
            return {statusCode: 401, "error": "Unauthorized"};
        }
    }
}

function generateToken(user) {
    return Jwt.token.generate(
        {
            aud: 'urn:audience:iut',
            iss: 'urn:issuer:iut',
            userName: user.userName,
            firstName: user.firstName,
            scope: user.role,
            lastName: user.lastName,
            email: user.mail,
        },
        {
            key: tokenKey, // La clé qui est définit dans lib/auth/strategies/jwt.js
            algorithm: 'HS512'
        },
        {
            ttlSec: 14400 // 4 hours
        }
    );
};
