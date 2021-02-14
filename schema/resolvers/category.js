const db = require('../../dbPool.js');

const listCategory = (args) => {
    const query = `select cat.category_id,cat.category,uct.username from category cat left join user_category_table uct
    on cat.category_id = uct.category_id and uct.username = '${args.username}' where cat.category_id != 1 order by cat.category`;
    return db.conn.many(query)
        .then(data => {
            let responseObject = [];
            data.forEach(datum => {
                let object = {};
                object.id = datum.category_id;
                object.name = datum.category;
                object.username = datum.username;
                responseObject.push(object);
            });
            return responseObject;
        })
        .catch(err => {
            return 'The error is' + err;
        });
}
exports.listCategory = listCategory;