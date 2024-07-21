const { User } = require('../models');
const bcrypt = require('bcrypt');

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

// const seedUsers = () => User.bulkCreate(userData);

//hashes passwords before seeding the database
const seedUsers = async () => {
    for (const user of userData) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
    await User.bulkCreate(userData, {
      individualHooks: true, // Ensures hooks are called if defined in the model
    });
  };

module.exports = seedUsers;