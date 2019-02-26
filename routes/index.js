var express = require("express");
var router = express.Router();
const rp = require("request-promise");
const cheerio = require("cheerio");

router.post("/", function(req, res, next) {
  console.log("hi");
  let url = req.body.url;
  rp(url)
    .then(function(html) {
      console.log("hi");
      //console.log($('big > i', html).length);
      const $ = cheerio.load(html);
      let nums = [];
      //console.log(nums);
      for (let i = 0; i < $("i").length; i++) {
        if ($("i")[i].attribs.class == "fa fa-phone") {
          let temp = $("i")[i].next.data;
          temp = temp.split("\t").join("");
          temp = temp.split("\n").join("");
          temp = temp.split(" ").join("");

          nums.push(temp);
        }
        // console.log($('i')[i])
      }
      console.log(nums);
      console.log(nums.length);
      res.end(JSON.stringify({ nums: nums }));
      //console.log($("i", html));
      //console.log($("i", html).length);
      //let nums = [];
      /*
      for (var i = 0; i < $("i", html).length; i++) {
        if ($("i", html)[i].next) {
          if ($("i", html)[i].next.data) {
            
            let sample = $("i", html)[i].next.data;
            console.log(sample);
            sample = sample.split('\t').join('');
            sample = sample.split('\n').join('');
            sample = sample.split(' ').join('');
            let m = sample;
            
            sample = sample.split(')').join('');
            sample = sample.split('(').join('');
            sample = sample.split('+').join('');
            sample = sample.split('/').join('');
            
            
           
            if (isFinite(sample) && sample!="") {
              //console.log("sample " + sample);
              nums.push(m);
              //nums.push(sample);
            }
          }
        }
      }*/

      //console.log(html);
      // res.json({num: nums});
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
