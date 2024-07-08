const { User } = require('../models');

const userData = [
    {
        username: 'user1',
        password: 'password123'
    },
    {
        username: 'user2',
        password: 'password234'
    },
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;