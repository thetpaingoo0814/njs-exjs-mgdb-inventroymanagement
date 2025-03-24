const {RDB} = require('./core');

const setCacheUser = async(userId,user) => {
    await RDB.set(userId,user);
}
const getCacheUser = async(userId) => await RDB.get(userId);

module.exports = {
    setCacheUser,
    getCacheUser
}