const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Welcome to the blog',
        user_id: 1,
        post_id: 3,
    },
    {
        comment_text: 'Great post',
        user_id: 2,
        post_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;