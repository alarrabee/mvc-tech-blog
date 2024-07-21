const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan turpis id leo maximus, in egestas mi tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis.',
        user_id: 1,
        post_id: 3,
    },
    {
        comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id commodo lectus, et facilisis nibh. Nulla sed tempus sapien, id.',
        user_id: 2,
        post_id: 1,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;