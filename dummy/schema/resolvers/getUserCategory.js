const db = require('../../dbPool.js');
const getUserCategory = (args) => {
    const query = `select cat.category_id,cat.category from category cat, user_category_table uct
     where cat.category_id = uct.category_id and uct.username = '${args.username}'`;
    return db.conn.many(query)
        .then(data => {
            let responseObject = [];
            data.forEach(datum => {
                let object = {};
                object.id = datum.category_id;
                object.name = datum.category;
                responseObject.push(object);
            });
            return responseObject;
        })
        .catch(err => {
            return 'The error is' + err;
        });
}
exports.getUserCategory = getUserCategory;