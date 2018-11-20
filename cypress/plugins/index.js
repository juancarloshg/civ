const cypressTSPreprocessor = require("./cy-ts-preprocessor");

module.exports = on => {
  on("file:preprocessor", cypressTSPreprocessor);
};
