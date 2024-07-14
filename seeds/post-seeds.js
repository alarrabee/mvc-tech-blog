const { Post } = require('../models');

const postData = [
    {
        title: 'Tutorial One',
        content: 'This is the content of tutorial one.',
        user_id: 1,
    },
    {
        title: 'Tutorial Two',
        content: 'This is the content of tutorial two',
        user_id: 1,
    },
    {
        title: 'My First Post',
        content: 'This is the content of my first post',
        user_id: 2,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;