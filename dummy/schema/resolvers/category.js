const db = require('../../dbPool.js');
const listCategory = (args) => {
    const query = `select cat.category_id,cat.category from category cat where cat.category_id not in 
    (select category_id from user_category_table where username = '${args.username}')`;
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
exports.listCategory = listCategory;