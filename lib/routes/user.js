'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            auth: false,
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('Jeremy').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Nght').description('Lastname of the user'),
                    userName: Joi.string().required().min(3).example('JeremM').description('Username of the user'),
                    password: Joi.string().required().min(8).example('Azufueh84z').description('Lastname of the user'),
                    mail: Joi.string().email({ tlds: { allow: false } }).example('jeremynght@gmail.com').description('Email of the user')
                })
            }
        },
        handler: async (request, h) => {
            const { userService, mailServices } = request.services();
            const response = await userService.create(request.payload);
            mailServices.sendMail(request.payload);
            return response;
        }
    },

    {
        method: 'get',
        path: '/users',
        options: {
            tags: ['api']
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            return await userService.getAll(request);
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().required().example(1).description('Id of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { User } = request.models();

            const user = await User.query().deleteById(request.params.id);

            return '';
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    id: Joi.number().integer().required().example(1).description('Id unique de l\'utilisateur'),
                    firstName: Joi.string().min(3).example('Jeremy').description('Firstname of the user'),
                    lastName: Joi.string().min(3).example('Nght').description('Lastname of the user'),
                    userName: Joi.string().min(3).example('JeremM').description('Username of the user'),
                    password: Joi.string().min(8).example('Azufueh84z').description('Password of the user'),
                    role: Joi.string().valid('user', 'admin', '').example('user').description('Role of the user').default('user').optional(),
                    mail: Joi.string().email({ tlds: { allow: false } }).example('jeremynght@gmail.com').description('Email of the user')
                })
            }
        },
        handler: async (request, h) => {

            const { userService } = request.services();
            await userService.update(request.payload);
            return 'User edited';
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    mail: Joi.string().email({ tlds: { allow: false } }).example('jeremynght@gmail.com').description('Email of the user'),
                    password: Joi.string().min(8).example('Azufueh84z').description('Lastname of the user')
                })
            }
        },
        // eslint-disable-next-line require-await
        handler: async (request, h) => {

            const { userService } = request.services();

            return userService.login(request.payload);
        }
    }
];