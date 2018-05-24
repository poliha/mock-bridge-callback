var moment = require('moment');
var net = require('net');

const NODE_ERROR = -1;
const NODE_TIMEOUT = -2;

function checkNode(node) {
  return new Promise((resolve, reject) => {
    let client = new net.Socket();
    let start = moment();
    client.setTimeout(10 * 1000);
    console.log("checkNode: connecting to: " + node.host)

    client.connect(node.port, node.host, function () {
      client.end();
      console.log("connected");
      resolve({
        id: node.id,
        connectedIn: moment().diff(start)
      });
    });

    client.on('error', () => {
      client.end();
      console.log("error");
      resolve({
        id: node.id,
        connectedIn: NODE_ERROR
      });
    });

    client.on('timeout', () => {
      client.end();
      console.log("timeout");
      resolve({
        id: node.id,
        connectedIn: NODE_TIMEOUT
      });
    });
  });
}

module.exports = {
  configure: function(app) {

    // Bridge Callbacks
    app.post('/receive/',function(req, res) {
      console.log("---RECEIVE---\n");
      console.log(req.body);
      return res.status(200).send("Ok");
    });

    app.post('/error/',function(req, res) {
      console.log("---ERROR---\n");
      console.log(req.body);
      return res.status(200).send("Ok");
    });

    // Compliance Tx Status Callback
    app.post('/sanctions/',function(req, res) {
      console.log("---SANCTIONS---\n");
      console.log(req.body);
      return res.status(200).send("Ok");
    });

    app.post('/ask_user/',function(req, res) {
      console.log("---ASK_USER---\n");
      console.log(req.body);
      return res.status(200).send("Ok");
    });

    app.post('/fetch_info/',function(req, res) {
      console.log("---FETCH_INFO---\n");
      console.log(req.body);
      var customer_data = {
      	"name": "John Doe",
      	"address": "ce60::a4dc:c6ff:fe70:7aca",
      	"date_of_birth": "1999-12-31"
      };
      return res.status(200).send(customer_data);
    });

    app.get('/tx_status/',function(req, res) {
      console.log("---TX_STATUS---\n");
      console.log(req.query);
      var rp = {	"status": "status code see below",
               "recv_code": "arbitrary string",
                "refund_tx": "tx_hash",
                "msg": "arbitrary string"
              };
      return res.status(200).send(rp);
    });

    app.get('/check-node/:port/:host', function (req, res) {
      console.log("---CHECK NODE---\n");
      console.log(req.params);

      var node = {
        "id": "007", 
        "host": req.params.host,
        "port": req.params.port
      };
      checkNode(node);
      // return res.status(200).send(checkNode(node));
    });

    app.get('/.well-known/stellar.toml',function(req, res) {
      console.log("---stellar.toml---\n");
      console.log(req.query);
     
      var options = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'Access-Control-Allow-Origin': "*",
            'x-timestamp': Date.now(),
            'x-sent': true
        }
      };
    
      var fileName = "stellar.toml";
      res.sendFile(fileName, options, function (err) {
        if (err) {
          next(err);
        } else {
          console.log('Sent:', fileName);
        }
      });
    
    });


  }
};
