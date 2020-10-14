const express = require("express");
const router = express.Router();
const ProductModel = require("../models/ProductModel");

router.get("/", (req, res) => {
  if (req.query.courseName) {
    // Finding all products in DB and sending it to client
    ProductModel.find({ courseName: req.query.courseName })
      .then((document) => {
        res.send(document);
      })
      .catch((e) => {
        console.log("error", e);
        res.send({ e: e });
      });
  } else {
    // Finding all products in DB and sending it to client
    ProductModel.find()
      .then((document) => {
        res.send(document);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }
});

router.post("/", (req, res) => {
  // data that will be saved in the collection
  const formData = {
    courseName: req.body.courseName,
    licence: req.body.licence,
    price: req.body.price,
  };

  // instantiating an instance of ProductModel
  const newProduct = new ProductModel(formData);

  // save to databa
  newProduct
    .save()
    .then((document) => {
      res.send(document);
    })
    .catch((e) => {
      console.log("e", e);
      res.send({ e: e });
    });
});

/*
router.post(
  "/find",
  
  (req, res) => {
    ProductModel.find({ _id: req.product.id })
      .then((document) => {
        res.send(document);
      })
      .catch((e) => {
        console.log("e", e);
        res.send({ e: e });
      });
  }
);
router.post(
  "/update",
  
  async (req, res) => {
    const formData = {
      courseName: req.body.courseName,
      licence: req.body.licence,
      price: req.body.price,
      // password: req.body.password, // will change with bcrypt
      // photoURL: '' // will be assigned by Cloudinary
    };

    

    

    // Otherwise, skip encrypting the password
     
      ProductModel.findByIdAndUpdate(req.product.id, {
        $set: formData,
      })
        .then((document) => {
          res.send(document);
        })
        .catch((e) => {
          console.log("e", e);
          res.send({ e: e });
        });
    
  }
);







router.post("/update", (req, res) => {
  updateProduct(req, res);
});

const updateProduct = (req, res) => {
  ProductModel.findOne({ _id: req.body.id }, (err, doc) => {
    doc.courseName = req.body.courseName;
    doc.licence = req.body.licence;
    doc.price = req.body.price;
    doc.save(res.send({ msg: "Changes saved" }));
  });
};
*/
module.exports = router;
