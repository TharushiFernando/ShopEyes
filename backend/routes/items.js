const router = require("express").Router();
let Item = require("../models/item");

router.route("/add").post((req, res) => {
    const itemCode = req.body.itemCode;
    const itemName = req.body.itemName;
    const itemCategory = req.body.itemCategory;
    const itemPrice = req.body.itemPrice;
    const itemQuantity = req.body.itemQuantity;

    const newItem = new Item({
        itemCode,
        itemName,
        itemCategory,
        itemPrice,
        itemQuantity
    })

    newItem.save().then(() => {
        res.json("Item Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Item.find().then((items) => {
        res.json(items)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {itemCode, itemName, itemCategory,  itemPrice, itemQuantity} = req.body; // names in front end
    const updateItem = {
        itemCode,
        itemName,
        itemCategory,
        itemPrice,
        itemQuantity
    }

    const update = await Item.findByIdAndUpdate(userId, updateItem).then(() => {
        res.status(200).send({status: "Item updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Item.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Item.findById(userId)
    .then((item) => {
        res.status(200).send({status: "Item Fetched!", item});
    }).catch((error) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

module.exports = router;