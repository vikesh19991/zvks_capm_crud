const cds = require("@sap/cds");
const v2Proxy = require("@sap/cds-odata-v2-adapter-proxy");

cds.on("bootstrap", (app) => {
  app.use(v2Proxy());
});

module.exports = cds.server;
