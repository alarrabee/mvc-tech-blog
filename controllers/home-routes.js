const router = require('express').Router();
const { User, Post } = require('../models');

//renders homepage
// router.get('/', async (req, res) => {
//     res.render('homepage');
// })

//GET all posts for homepage
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





//renders dashboard
router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
})


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



//Login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;