const transform = function (target, db) {
    for (let prop of Object.keys(target)) {
        target[prop] = db[prop]
    }
    return target;
};

module.exports = transform;