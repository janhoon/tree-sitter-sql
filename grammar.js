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
    source_file: ($) => repeat($._statement),

    _statement: ($) => choice($.select_statement, $.table_expression),

    _list_separator: () => ",",
    _quoted_string: () => /"[^"]*"/,
    _reference: () => /[a-zA-Z0-9_]+/,
    _name_or_string: ($) => choice($._reference, $._quoted_string),

    _alias: ($) => seq(optional("as"), field("alias", $.alias)),

    alias: ($) => $._name_or_string,

    select_statement: ($) => seq(keywords.SELECT, $.select_list),

    select_list: ($) =>
      seq(
        $.select_list_item,
        repeat(seq($._list_separator, $.select_list_item)),
      ),

    column_name: ($) =>
      seq(optional($._column_table_reference), $._name_or_string),

    select_list_item: ($) =>
      seq(field("reference", $.column_name), optional($._alias)),

    _column_table_reference: ($) =>
      seq(field("column_table_reference", $._name_or_string), "."),

    table_expression: ($) => seq(keywords.FROM, $.table_name),

    table_name: ($) => seq($._name_or_string, optional($._alias)),
  },
});
