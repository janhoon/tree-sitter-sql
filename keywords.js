/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//
module.exports = {
  keywords: {
    SELECT: RegExp("select", "i"),
    WILDCARD: "*",
    FROM: RegExp("from", "i"),
  },
};
