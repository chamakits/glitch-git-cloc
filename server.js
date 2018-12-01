// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
// const tmp = require('tmp');
const sgit = require('simple-git');
const cloc = require('node-cloc');
const fs = require('fs-extra');
const Convert = require('ansi-to-html');
const convert = new Convert();
const json2html = require('json-to-html');
const url = require('url');
  // , html = json2html({ 'hello': 'world' });
// const prettyHtml = require('json-pretty-html').default;
const uuidv1 = require('uuid/v1');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/cloc', function(request, response) {
  const url_parts = url.parse(request.url, true);
  const query = url_parts.query;

  var tmp = require('tmp');
  tmp.dir(function _tempDirCreated(err, path, cleanupCallback) {
    let newDir = uuidv1();
    path = path + '/' + newDir;
    fs.ensureDirSync(path);
    if (err) throw err;

    console.log('Dir: ', path);
    const simpleGit = sgit();
    // const TO_CHECKOUT = "https://github.com/raszi/node-tmp.git";
    const TO_CHECKOUT = query.git;
    simpleGit.clone(TO_CHECKOUT, path, function(err, data) {
      console.log({err});
      console.log({data});
      fs.readdirSync(path).forEach(file => {
        console.log(file);
      })

      cloc(path).then((res) => {
        // cleanupCallback();
        // response.send(convert.toHtml(res));
        // response.send(JSON.stringify(res, null, 4));
        // response.send(json2html(res,4));
        fs.remove(path);
        response.json(res);
      }, (err) => {console.log(err)})
      // response.send("Hello");
    });

    // Manual cleanup
  });

});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
