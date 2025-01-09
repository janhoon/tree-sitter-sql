/**
 * @file Tree Sitter parser for the SQL language
 * @author Jan Hoon <janhoon97@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const { keywords } = require("./keywords");

module.exports = grammar({
  name: "sql",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($._statement),

    _statement: ($) => choice($.select_statement),

    select_statement: ($) =>
      seq(
        keywords.SELECT,
        $.select_list,
        // optional($.table_expression)
      ),

    select_list: ($) => choice(keywords.WILDCARD, repeat1($.column_name)),

    _select_list_separator: ($) => ",",

    column_name: ($) => /[a-zA-Z0-9_]+/,
  },
});
