module.exports = {
  configure: function(app) {

    // Bridge Callbacks
    app.post('/receive/',function(req, res) {
      console.log("------\n");
      console.log(req.body);
      return res.status(200).send("Ok");
    });

    app.post('/error/',function(req, res) {
      console.log("------\n");
      console.log(req.body);
      return res.status(200).send("Ok");
    });

    // Compliance Tx Status Callback
    app.get('/tx_status/',function(req, res) {
      console.log("------\n");
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
