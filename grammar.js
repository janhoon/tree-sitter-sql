/**
 * @file Tree Sitter parser for the PostgreSQL language
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

    _statement: ($) => seq(
      choice(
        $.select_statement,
      ),
      optional(';')
    ),

    // Basic elements
    _list_separator: () => ",",
    _quoted_reference: () => /"[^"]*"/,
    _single_quoted_reference: () => /'[^']*'/,
    _reference: () => /[a-zA-Z][a-zA-Z0-9_]*/,
    reference: ($) => choice($._quoted_reference, $._reference),
    _literal: ($) => choice(
      $.number_literal,
      $.string_literal,
      $.boolean_literal,
      $.null_literal
    ),

    number_literal: () => /[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/,
    string_literal: ($) => $._single_quoted_reference,
    boolean_literal: () => choice(/true/i, /false/i),
    null_literal: () => keywords.NULL,

    _alias: ($) => seq(optional(keywords.AS), $.reference),

    // Expressions
    _expression: ($) => choice(
      $.wildcard,
      $.column_reference,
      $._literal,
      $.function_call,
      $.parenthesized_expression,
      $.case_expression,
      $.cast_expression
    ),

    wildcard: () => keywords.WILDCARD,

    column_reference: ($) => seq(
      optional(seq(field("table_ref", $.reference), '.')),
      field("column_ref", $.reference)
    ),

    function_call: ($) => seq(
       $._reference,
      '(',
      optional($.function_arguments),
      ')'
    ),

    function_arguments: ($) => seq(
      $._expression,
      repeat(seq($._list_separator, $._expression))
    ),

    parenthesized_expression: ($) => seq(
      '(',
      $._expression,
      ')'
    ),

    case_expression: ($) => seq(
      keywords.CASE,
      optional($._expression),
      repeat1($.when_clause),
      optional($.else_clause),
      keywords.END
    ),

    when_clause: ($) => seq(
      keywords.WHEN,
      field("when_expression", $._expression),
      keywords.THEN,
      field("then_expression", $._expression)
    ),

    else_clause: ($) => seq(
      keywords.ELSE,
      $._expression
    ),

    cast_expression: ($) => seq(
      keywords.CAST,
      '(',
      $._expression,
      keywords.AS,
      $.data_type,
      ')'
    ),

    data_type: ($) => choice(
      keywords.INTEGER,
      keywords.BIGINT,
      keywords.SMALLINT,
      keywords.NUMERIC,
      keywords.DECIMAL,
      keywords.REAL,
      keywords.DOUBLE_PRECISION,
      seq(keywords.VARCHAR, optional(seq('(', $.number_literal, ')'))),
      seq(keywords.CHAR, optional(seq('(', $.number_literal, ')'))),
      keywords.TEXT,
      keywords.BOOLEAN,
      keywords.DATE,
      keywords.TIME,
      keywords.TIMESTAMP,
      keywords.INTERVAL,
      keywords.JSON,
      keywords.JSONB,
      keywords.UUID
    ),

    // SELECT statement
    select_statement: ($) => seq(
      keywords.SELECT,
      optional(choice(keywords.DISTINCT, keywords.ALL)),
      $.select_list,
      optional($.from_clause),
      optional($.order_by_clause),
      optional($.limit_clause),
      optional($.offset_clause)
    ),

    select_list: ($) => seq(
      seq(
        $.select_list_item,
        repeat(seq($._list_separator, $.select_list_item))
      )
    ),

    select_list_item: ($) => seq(
      field("expression", $._expression),
      optional(field("alias", $._alias))
    ),

    from_clause: ($) => seq(
      keywords.FROM,
      $.object_reference,
      repeat(seq($._list_separator, $.object_reference))
    ),

    object_reference: ($) => choice(
      $.table_reference,
    ),

    _database_schema_table_reference: ($) => seq(
      field("database", $.reference),
      '.',
      field("schema", $.reference),
      '.',
      field("name", $.reference),
      optional(field("alias", $._alias))
    ),

    _schema_table_reference: ($) => seq(
      field("schema", $.reference),
      '.',
      field("name", $.reference),
      optional(field("alias", $._alias))
    ),

    _direct_table_reference: ($) => seq(
      field("name", $.reference),
      optional(field("alias", $._alias))
    ),

    table_reference: ($) => choice(
      prec(1, $._database_schema_table_reference),
      prec(2, $._schema_table_reference),
      $._direct_table_reference
    ),

    where_clause: ($) => seq(
      keywords.WHERE,
      $._expression
    ),

    order_by_clause: ($) => seq(
      keywords.ORDER_BY,
      $.order_by_item,
      repeat(seq($._list_separator, $.order_by_item))
    ),

    order_by_item: ($) => seq(
      field("expression", $._expression),
      optional(field("order", choice($.order_by_ascending, $.order_by_descending)))
    ),

    order_by_ascending: ($) => choice(keywords.ASC, keywords.NULLS_FIRST),
    order_by_descending: ($) => choice(keywords.DESC, keywords.NULLS_LAST),

    limit_clause: ($) => seq(
      keywords.LIMIT,
      choice($.number_literal, $._reference, /all/i)
    ),

    offset_clause: ($) => seq(
      keywords.OFFSET,
      $.number_literal,
      optional(choice(/row/i, /rows/i))
    ),
  },
});
