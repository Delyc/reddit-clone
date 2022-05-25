const DatauriParser = require('datauri/parser')
const slug = require("mongoose-slug-generator");

const parser = new DatauriParser()

module.exports = { slug, parser };
