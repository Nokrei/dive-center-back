const express = require("express");
const router = express.Router();
const PostModel = require("../models/PostModel");


router.get('/', (req,res) => {
    PostModel.find()
    .then((document) => {
      res.send(document);
    })
    .catch((e) => {
      console.log("error", e);
    });
})

router.post("/newpost", (req, res) => {
  // data that will be saved in the collection
  const formData = {
    title: req.body.title,
    body: req.body.body,
    userName: req.body.userName,
    userAvatar: req.body.userAvatar
  };
  // instantiating an instance of ProductModel
  const newPost = new PostModel(formData);

  // save to database

  newPost
    .save()
    .then((document) => {
      res.send(document);
    })
    .catch((e) => {
      console.log("e", e);
      res.send({ e: e });
    });
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.post("/addpost", (req, res) => {
  const formData = {
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tags,
  };

  PostModel.findOne({ title: req.body.tile })
    .then(async (document) => {
      if (document) {
        res.send({ msg: "A post with that title exists" });
      } else {
        const newPost = new PostModel(formData);

        newPost
          .save()
          .then((document) => {
            console.log("document", document);
            res.send(document);
          })
          .catch((e) => {
            console.log("error", e);
            res.send({ e: e });
          });
      }
    })

    .catch((e) => {
      console.log("error", e);
      res.send({ e: e });
    });
});

module.exports = router;
