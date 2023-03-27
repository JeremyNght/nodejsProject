'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            userName: Joi.string().min(3).example('Jo').description('Username of the user'),
            password: Joi.string().min(8).example('Azufueh84z').description('Password of the user'),
            role: Joi.string().valid('user', 'admin', '').example('user').description('Role of the user').default('user').optional(),
            mail: Joi.string().email({tlds: {allow: false}}).example('jeremynght@gmail.com').description('Email of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        if (!this.role) {
            this.role = 'user';
        }
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};