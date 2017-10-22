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


  }
};
