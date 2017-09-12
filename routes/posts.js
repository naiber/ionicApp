var express = require('express');
var router = express.Router();
var Post = require('../models/post');
/* GET users listing. */

router.get('/',function(req, res,next)
{
    Post.find({},function (err ,posts) {
        if (err) return res.status(500).json({error: err});
        res.json(posts);
    })
})

router.get('/:id',function(req, res,next)
{
    Post.find({_id:req.params.id},function (err ,posts) {

        if (err) return res.status(500).json({error: err});
        res.json(200,posts);

    })
});

router.post('/',function(req,res,next)
    {
        var newPost = new Post(req.body);

        newPost.save(function(err)
        {
            if (err) return res.status(500).json({error: err});
            res.status(201).json(newPost);
        })

    }
);

router.put('/:id', function (req, res,next) {
        Post.findOne({_id: req.params.id}, function (err ,posts) {

                if (err) return res.status(500).json({error: err});

                if(!posts) return res.status(404).json({message:'post non trovato'});

                for(key in req.body){//for Hash : cicla i campi nel body della request
                    posts[key] = req.body[key];
                }

                posts.save(function(err)
                {
                    if (err) return res.status(500).json({error: err});
                    res.json(posts);
                })
            }

        )
    }
);

router.delete('/:id',function (req, res,next)
    {
        Post.remove({_id:req.params.id}, function(err)
        {
            if(err) return res.status(500).json({error:err})
            res.json({message:'Post eliminato correttamente'})
        })
    }
);


module.exports = router;
