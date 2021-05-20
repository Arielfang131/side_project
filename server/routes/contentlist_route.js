const router = require("express").Router();

const {
    getContentList
} = require("../controllers/keywords_controller");

router.route("/keywords").post(getContentList);

module.exports = router;
