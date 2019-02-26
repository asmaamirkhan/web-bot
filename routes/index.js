var express = require("express");
var router = express.Router();
const rp = require("request-promise");
const cheerio = require("cheerio");

router.post("/", function(req, res, next) {
  let url = req.body.url;
  rp(url)
    .then(function(html) {
      const $ = cheerio.load(html);
      console.log("Content is ready to use");
      let nums = [];
      $(".fa-phone").each((i, element) => {
        nums.push(element.next.data.replace(/[\n \t]/g, ""));
      });
      res.json({ nums: nums });
    })
    .catch(function(err) {
      res.json(err.response);
    });
});

module.exports = router;
