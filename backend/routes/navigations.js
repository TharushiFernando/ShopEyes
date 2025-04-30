const router = require("express").Router();
let Navigation = require("../models/navigation");

router.route("/add").post((req, res) => {
    const routeNo = req.body.navigationText;
    const navigationText = req.body.navigationText;

    const newNavigation = new Navigation({
        routeNo,
        navigationText
    })

    newNavigation.save().then(() => {
        res.json("Navigation Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Navigation.find().then((navigations) => {
        res.json(navigations)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {routeNo, navigationText} = req.body; // names in front end
    const updateNavigation = {
        routeNo,
        navigationText
    }

    const update = await Navigation.findByIdAndUpdate(userId, updateNavigation).then(() => {
        res.status(200).send({status: "Navigation updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Navigation.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Navigation.findById(userId)
    .then((item) => {
        res.status(200).send({status: "Navigation Fetched!", item});
    }).catch((error) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

module.exports = router;