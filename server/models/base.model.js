const mongoose = require("mongoose");

function getModel(collectionName, schema) {
  return new mongoose.model(collectionName, schema);
}

module.exports = getModel;
