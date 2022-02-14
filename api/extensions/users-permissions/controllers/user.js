const { sanitizeEntity } = require("strapi-utils/lib");

module.exports = {
    page: async ctx => {

        async function processArray(array) {
            let newArr = [{
                users: []
            }];
            for(user of array) {
                let team = await strapi.services.team.find({
                    user: user
                })
                delete user.password;
                delete user.provider;
                delete user.resetPasswordToken;
                delete user.confirmationToken;
                delete user.confirmed;
                delete user.blocked;
                delete user.role;
                delete user.created_by;
                delete user.updated_by;
                delete user.created_at;
                delete user.created_by;
                user.team = sanitizeEntity(team, {model: strapi.models.team});
                newArr[0].users.push(user);
            }
            if(newArr.length >= 15) {
                newArr[0].nextPage = ctx.params.id+1;
            } else {
                newArr[0].nextPage = null;
            }
            return newArr;
        }

        let arr = await strapi.query('user', 'users-permissions').find({
            _start: (parseInt(ctx.params.id)-1)*15,
            _limit:15
        });
        return processArray(arr);
    },
    search: async ctx => {
        let entities = await strapi.query('user', 'users-permissions').search({
            _q: ctx.params.value.toLowerCase()
        })
        async function processArray(array) {
            let newArr = [];
            for(user of array) {
                let team = await strapi.services.team.findOne({
                    user_id: user.id
                })
                delete team.user;
                delete team.user_id;
                user.team = sanitizeEntity(team, { model: strapi.models.team });
                delete user.password;
                delete user.provider;
                delete user.resetPasswordToken;
                delete user.confirmationToken;
                delete user.confirmed;
                delete user.blocked;
                delete user.role;
                delete user.created_by;
                delete user.updated_by;
                delete user.created_at;
                delete user.created_by;
                newArr.push(user);
            }
            return newArr;
        }

        return processArray(entities);
    },
    findOne: async ctx => {
        let user = await strapi.plugins["users-permissions"].services.user.fetchAll({
            id: ctx.params.id
        });
        user = user[0];
        delete user.id;
        let team = await strapi.services.team.findOne({
            user_id: user.id
        })
        delete team.user;
        delete team.user_id;
        user.team = sanitizeEntity(team, { model: strapi.models.team });
        return sanitizeEntity(user, { model: strapi.query("user", "users-permissions").model });
    },
    me: async ctx => {
        let user = await strapi.plugins['users-permissions'].services.user.fetchAll({
            id: ctx.state.user.id
        });
        user = user[0];
        delete user.id;
        user.user_id = "#" + user.user_id;
        return sanitizeEntity(user, { model: strapi.query("user", "users-permissions").model });
    },
    find: async ctx => {
        let users = await strapi.plugins['users-permissions'].services.user.fetchAll();
        for(let user of users) {
            let team = await strapi.services.team.findOne({
                user_id: user.id
            })
            if(team) {
                delete team.user;
                delete team.user_id;
                user.team = sanitizeEntity(team, { model: strapi.models.team });
            }
        }
        return users.map(user => sanitizeEntity(user, { model: strapi.query("user", "users-permissions").model }))
    },
}