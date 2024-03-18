const router = require("express").Router();
const response = require("./../utils");
const helper = require("./../utils/helper");

const templateController = require("./../controllers/templateController");

router.post("/gptChat", (req, res) => {
  templateController
    .gptChat(req.body.message)
    .then((result) => {
      response.sendDataSuccess(res, "", result);
    })
    .catch((err) => {
      response.sendDataError(res, err);
    });
});

module.exports = router;
