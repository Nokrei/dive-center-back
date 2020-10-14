const express = require("express");
const router = express.Router();
const PostModel = require("../models/PostModel");

router.post("/", async (req, ress) => {
//retrieve the data
const {title, createdAt, tags, html} = req.body;

const newPost = new PostModel({
  title,
  createdAt,
  tags,
  html  
});
try{
   const savedPost = await newPost.save();
   ress.json(savedPost); 
   console.log(savedPost);
}
catch(err){
console.log(err);
}
});

router.get("/", async (req, res)=> {
    const posts = await Post.find();
    res.json(posts);
})

router.get("/:id", async (req, res)=> {
    const post = await Post.findById(req.params.id);
    res.json(post);
})


router.post(
    '/addpost',
    (req, res) => {
        const formData = {
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,

        };

        // 1. Make sure email is unique
        PostModel
        .findOne({ title: req.body.tile })
        .then(
            async (document)=> {
                // if document exists, they already have an account
                // so reject registration
                if(document) {
                    res.send({msg: "A post with that title exists"})
                }

                // otherwise, they are a new user so create their account
                else {
                    // 2. Extract password
                    const newPost = new PostModel(formData);

                    // Only if a file was sent
                    // if(Object.values(req.files).length>0) {
                    //     // 4. Upload the user's avatar
                    //     const files = Object.values(req.files);

                    //     await cloudinary.uploader.upload(
                    //         files[0].path,
                    //         (cloudinaryResult, err) => {
                    //             console.log('cloudinaryResult', cloudinaryResult);
                    //             // Then include the photoURL in formData
                    //             newUser.photoURL = cloudinaryResult.url
                    //         }
                    //     )
                    // }

                    // 3. Generate salt
                    // bcrypt.genSalt(
                    //     (err, salt) => {
                            
                    //         // 4. Use salt and password to create encrypted password
                    //         bcrypt.hash(
                    //             newUser.password,
                    //             salt,
                    //             (err, encryptedPassword) => {
                    //                 // 5. Replace password with encryption in formData
                    //                 newUser.password = encryptedPassword;

                                    // 6. Save formData in MongoDB
                                    newPost
                                    .save()
                                    .then(
                                        (document) => {
                                            console.log('document', document)
                                            res.send(document);
                                        }
                                    )
                                    .catch(
                                        (e) => {
                                            console.log('error', e);
                                            res.send({ e: e })
                                        }
                                    )
                                }
                            

                        }
                    )           
        
        .catch(
            (e) => {
                console.log('error', e);
                res.send({ e: e })
            }
        )
    }
);


module.exports = router;



