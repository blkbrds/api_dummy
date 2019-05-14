let http = require('http');
var url = require("url");
const StringDecoder = require('string_decoder').StringDecoder;
const port = 3000;

let server = http.createServer(requestHandler);

function when(req, res, path, method, callback) {
  if(req.url === path && req.method === method) {
    callback(req, res);
  }
}

function requestHandler(req, res) {
  const userAgent = req.headers['user-agent'];
  const requestMethod = req.method;
  var url_parts = url.parse(req.url);
  console.log(url_parts);
  const urll = url_parts.pathname;
  var query = url.parse(req.url,true).query;
  if (requestMethod != 'GET') {
    const decoder = new StringDecoder('utf-8');
    console.log("khoong phai get")
    let payload = '';
    req.on('data', (data) => {
      payload += decoder.write(data);
      console.log("Query 1 : " + JSON.stringify(query))
    });

    req.on('end', () => {
      payload += decoder.end();
      if (payload) {
        query = JSON.parse(payload);
      }
      console.log("Query 2 : " + JSON.stringify(query))
      readData(query, urll, userAgent, requestMethod, req, res);
  });
  } else {
    readData(query, urll, userAgent, requestMethod, req, res);
  }
}

function readData(query, urll, userAgent, requestMethod, req, res) {
  console.log("Query : " + JSON.stringify(query));
  console.log('Request url : ' + urll);
  console.log('User Agent : ' + userAgent);
  console.log('Method :' + requestMethod);
  console.log('Authorization : ' + req.headers['authorization']);
  var link = './Home';
  var url = urll
  link = link + url + '.json';
  console.log('Url : ' + link);
  readFile(link, function (data, error) {
    console.log(error);
    if (!data) {
      var urls = urll.split("/");
      var url = ""
      for (i in urls) {
        if (cleanInt(urls[i])) {
          url = url + "/" + "number"
        } else {
          url = url + "/" + urls[i]
        }
      }
      var link = './Home';
      link = link + url + '.json';
      readFile(link, function (data, error) {
        if (!data) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          let jsonError = "{\"error\": \"sai duong dan\"}";
          res.end(jsonError);
          return;
        }
        parseFile(data, res, requestMethod, query);
        console.log("truong hop 1")
      })
    } else {
      console.log("truong hop 1")
      parseFile(data, res, requestMethod, query);
    }
    
  });
}

function parseFile(data, res, requestMethod, query) {
  try {
    JSON.parse(data);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    let jsonError = "{\"error\": \"file dummi sai, hoac khong phai la json\"}";
    res.end(jsonError);
    return;
  }
  var jsonData = JSON.parse(data);
  jsonData1 = jsonData[requestMethod.toLowerCase()]
    if (jsonData1) {
      jsonData = jsonData1
    }
  var method = jsonData["method"];
  if (method == "" || !method) {
    method = "get";
  }
  console.log("method : " + method)
  if (method.toLowerCase() != requestMethod.toLowerCase()) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    let jsonError = "{\"error\": \"method sai\"}";
    res.end(jsonError);
    return;
  }
  let params = jsonData["params"];
  if (params) {
    if (!query || Object.keys(query).length == 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      let jsonError = "{\"error\": \"khong co params\"}";
      res.end(jsonError);
      return;
    }
    var keys = Object.keys(params);
    for (i in keys) {
      let key = keys[i];
      console.log("Key + " + key);
      console.log(query[key]);
      if (!query[key]) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        let jsonError = "{\"error\": \"params SAI\"}";
        res.end(jsonError);
        return;
      }
    }
  }
  var response = jsonData.response;
  if (response) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(response));
    res.end();
    return
  }
  var response = jsonData.responses;
  if (!response) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(jsonData));
    res.end();
    return
  }
  let rKeys = Object.keys(response);
  var rsKeys = []
  for (i in rKeys) {
    let key = rKeys[i]
    console.log(key)
    let kk = key.split("/");
    console.log("kk: " + kk[0] + " " + kk[1])
    if (cleanInt(kk[1]) > 0) {
        for (i = 0; i < cleanInt(kk[1]); i += 1) {
          console.log("key: " + key)
          rsKeys.push(key)
        }
    } else {
      console.log("key2: " + key)
      rsKeys.push(key)
    }
  }
  console.log(rsKeys.length)
  let index = getRandomInt(rsKeys.length);
  console.log('Index : ' + index);
  let returnData = response[rsKeys[index]];
  let kss = rsKeys[index]
  let kk = kss.split("/")[0];
  console.log("kss: " + kss)
  console.log(kk)
  res.writeHead(Number(kk), { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(returnData));
  res.end();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function readFile(url, callback) {
  var fs = require('fs');
  var content = fs.readFile(url, 'utf8', function(error, data){
    console.log('Data: ' + data);
    console.log('Error: ' + error);
    callback(data, error);
  });
}

function cleanInt(x) {
  x = Number(x);
  return x >= 0 ? Math.floor(x) : Math.ceil(x);
}

server.listen(port, function(err){
  if (err) {
    return console.error('Error', err);
  }

  console.log(`Port ${port}`);
});