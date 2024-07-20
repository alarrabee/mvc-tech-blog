const { Post } = require('../models');

const postData = [
    {
        title: 'Tutorial One',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget tempor mauris, non tristique ante. Nullam id tincidunt neque. Curabitur non elit finibus, dictum quam nec, ultrices sapien. Phasellus gravida pulvinar augue sit amet mollis. Donec eu tellus libero. Curabitur fringilla vitae libero id ultricies. Ut pellentesque pretium euismod. Pellentesque facilisis cursus tortor, quis vestibulum lectus suscipit vitae. Donec a bibendum metus, non tempor urna. Mauris velit sapien, bibendum sed quam id, scelerisque facilisis metus. Integer sit amet magna eleifend mauris egestas ullamcorper a at arcu. Fusce porta, est a lacinia hendrerit, leo ex aliquet purus, a pellentesque augue diam in mi. Vestibulum egestas eget ante ut ultrices. Fusce blandit urna orci, tempor rhoncus quam imperdiet vitae.',
        user_id: 1,
    },
    {
        title: 'Tutorial Two',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam felis nunc, venenatis ac sodales a, aliquam in ipsum. Quisque in erat efficitur risus congue fringilla pretium fringilla neque. Integer ac odio arcu. Fusce mattis eros eu ligula commodo, at blandit lorem congue. Mauris vestibulum dui felis, ut accumsan massa rhoncus sed. Ut nec hendrerit ex, in convallis nulla. Morbi molestie elit tortor, nec ullamcorper metus imperdiet in. Nulla facilisi. Proin tristique felis dignissim commodo cursus. Proin luctus, lectus et viverra malesuada, tellus est faucibus purus, et imperdiet libero nunc id quam. Nullam id orci ipsum. Mauris ut diam at nibh porttitor lobortis id at nunc. Mauris hendrerit luctus lorem nec posuere. Suspendisse risus ipsum, maximus vitae orci vel, malesuada mattis odio. Quisque nec dolor sit amet tellus pretium sagittis. Quisque vehicula scelerisque sollicitudin.',
        user_id: 1,
    },
    {
        title: 'My First Post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non mattis arcu, quis iaculis nulla. Aenean vestibulum orci arcu, quis molestie arcu maximus in. Phasellus euismod fermentum felis. Donec metus odio, dignissim et convallis ut, pellentesque vulputate tellus. Pellentesque sit amet justo vitae est imperdiet semper id non felis. Ut pulvinar lobortis cursus. Sed vel facilisis ex.',
        user_id: 2,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;