const { User } = require('../models');

const userData = [
    {
        username: 'WittyKitty10',
        password: 'password123'
    },
    {
        username: 'LaughingLlama',
        password: 'password234'
    },
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;