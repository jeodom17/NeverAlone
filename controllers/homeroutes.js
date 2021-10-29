const router = require('express').Router();
const { User, Post, Comments } = require('../models/');
const {withAuth} = require('../utils/auth');


router.get('/', async (req,res) => {
    try {
        if(req.session.loggedIn) {
            res.redirect('/homepage');
            return;
        }

        res.render('login');
    } catch(err) {
        res.status(500).json(err);
    }
});


router.get('/sign-up', async (req,res) => {
    try {
        if(req.session.loggedIn){
            res.redirect('/homepage');
        }
        res.render('signup');
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req,res) => {
   try {
     if (req.session.loggedIn) {
        res.redirect('/homepage');
        return;
        }
     res.render('login');
   }catch (err) {
        res.status(500).json(err);
   } 
});

router.get('/profile', withAuth, async (req,res) => {
    try {
        res.render('profile');
    } catch(err) {
        res.status(500).json(err);
    }
})

router.get('/homepage', withAuth, async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
          });
      
          const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage');
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
