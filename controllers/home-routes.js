const router = require('express').Router();
const { User, Post } = require('../models');

//renders homepage
// router.get('/', async (req, res) => {
//     res.render('homepage');
// })

//GET all posts for homepage and render homepage
router.get('/', async (req, res) => {
    try{
        const dbPostData = await Post.findAll();
        const posts = dbPostData.map((post) => 
            post.get({ plain: true })
        );
        res.render('homepage', {
            posts,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});



//GET one post and render post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id);
        const post = dbPostData.get({ plain: true });

        res.render('post', {post});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//renders dashboard
// router.get('/dashboard', async (req, res) => {
//     res.render('dashboard');
// })

//GET all posts for a specific user and render to dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const userId = req.session.user.user_id;

        if (!userId) {
            return res.redirect('/login');
        }

        const dbPostData = await Post.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        const posts = dbPostData.map((post) => {
            post.get({ plain:true })
        });

        res.render('dashboard', {
            posts,
            user: req.user,
        });
    } catch(err) {
        console.log(err);
        res.status(500).json;
    }
});







//CREATE new post
router.post('/dashboard', async (req, res) => {
    try {
      const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
      });
        res.status(200).json(dbPostData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //CREATE new comment
  router.post('/post', async (req, res) => {
    try {
      const dbCommentData = await Post.create({
        comment: req.body.comment_text,
      });
        res.status(200).json(dbCommentData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



//Login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;