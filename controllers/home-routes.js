const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

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



//GET one post and render post with comments
router.get('/post/:id', withAuth, async (req, res) => { 
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if(!dbPostData) {
            res.status(404).json({ message: 'No post with this id' });
        }

        const post = dbPostData.get({ plain: true });

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});







//renders dashboard
// router.get('/dashboard', async (req, res) => {
//     res.render('dashboard');
// })


//GET all posts for one user and render posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log(req.session); //debug*
        const userId = req.session.user_id;

        if (!userId) {
            console.log('No user ID found in session, redirecting to login');
            return res.redirect('/login');
        }

        //fetch user specific posts
        console.log('Fetching posts for user ID:', userId); //debugging
        const dbPostData = await Post.findAll({
            where: {
                user_id: userId
            },
            include: [{
                model: User,
                attributes: ['username']  //include user information
            }]
        });

        console.log('Fetched posts data:', dbPostData); //debugging
        const posts = dbPostData.map(post => post.get({ plain: true }));
        
        console.log('Rendering dashboard with posts:', posts); //debugging
        res.render('dashboard', {
            posts,
            user: req.user 
        });
    } catch(err) {
        console.log('Error in dashboard route:', err); //debugging
        res.status(500).json(err);
    }
});




//CREATE new post
router.post('/dashboard', async (req, res) => {
    try {
      const userId = req.session.user_id; // Get user_id from session 
  
      if (!userId) {
        console.error('No user ID found in session'); //debugging
        return res.status(401).json({ message: 'You must be logged in to create a post.' });
      }
  
      console.log('Creating post for user ID:', userId); //debugging
  
      const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: userId, // Include user_id from session
      });
  
      res.status(200).json(dbPostData);
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).json(err); // Send detailed error to client
    }
  });

  //CREATE new comment
  router.post('/post/:id/comment', async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.params.id
        });

        res.status(200).json(dbCommentData);
    } catch(err) {
        console.log('Server error:', err);
        res.status(500).json(err);
    }
});


  //CREATE new comment
//   router.post('/post/:id/comment', async (req, res) => {
//     try {
//         const dbCommentData = await Comment.create({
//             comment_text: req.body.commentText,
//             user_id: req.session.user_id,
//             post_id: req.params.id
//         });

//         res.sendStatus(200).json(dbCommentData);
//     } catch(err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });


  //CREATE new comment
//   router.post('/post', async (req, res) => {
//     try {
//       const dbCommentData = await Post.create({
//         comment: req.body.comment_text,
//       });
//         res.status(200).json(dbCommentData);

//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   });



//Login route
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;