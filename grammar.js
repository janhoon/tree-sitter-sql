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

    _statement: ($) => seq($.select_statement, optional(";")),

    ...keywords,

    // Basic elements
    _list_separator: () => ",",
    _quoted_reference: () => /"[^"]*"/,
    _single_quoted_reference: () => /'[^']*'/,
    _reference: () => /[a-zA-Z][a-zA-Z0-9_]*/,
    _literal: ($) =>
      choice(
        $.number_literal,
        $.string_literal,
        $.boolean_literal,
        $.null_literal,
      ),

    comment_text: () => /[^\n]*/,
    _file_start_comment: ($) => repeat1($.comment),
    comment: ($) => seq($._COMMENT, optional($.comment_text)),

    reference: ($) => choice($._quoted_reference, $._reference),

    number_literal: () => /[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/,
    string_literal: ($) => $._single_quoted_reference,
    boolean_literal: () => choice(/true/i, /false/i),
    null_literal: ($) => $._NULL,
    wildcard: ($) => $._WILDCARD,

    _alias: ($) => seq(optional($._AS), field("alias", $.reference)),

    // Expressions
    _expression: ($) =>
      choice(
        $.wildcard,
        $.column_reference,
        $._literal,
        $.function_call,
        $.parenthesized_expression,
        $.case_expression,
        $.cast_expression,
      ),

    column_reference: ($) =>
      seq(
        optional(seq(field("table_ref", $.reference), ".")),
        field("column_ref", $.reference),
      ),

    function_call: ($) =>
      seq($._reference, "(", optional($.function_arguments), ")"),

    function_arguments: ($) =>
      seq($._expression, repeat(seq($._list_separator, $._expression))),

    parenthesized_expression: ($) => seq("(", $._expression, ")"),

    case_expression: ($) =>
      seq(
        $._CASE,
        optional($._expression),
        repeat1($.when_clause),
        optional($.else_clause),
        $._END,
      ),

    when_clause: ($) =>
      seq(
        $._WHEN,
        field("when_expression", $._expression),
        $._THEN,
        field("then_expression", $._expression),
      ),

    else_clause: ($) => seq($._ELSE, $._expression),

    cast_expression: ($) =>
      seq($._CAST, "(", $._expression, $._AS, $.data_type, ")"),

    data_type: ($) =>
      choice(
        $._INTEGER,
        $._BIGINT,
        $._SMALLINT,
        $._NUMERIC,
        $._DECIMAL,
        $._REAL,
        $._DOUBLE_PRECISION,
        seq($._VARCHAR, optional(seq("(", $.number_literal, ")"))),
        seq($._CHAR, optional(seq("(", $.number_literal, ")"))),
        $._TEXT,
        $._BOOLEAN,
        $._DATE,
        $._TIME,
        $._TIMESTAMP,
        $._INTERVAL,
        $._JSON,
        $._JSONB,
        $._UUID,
      ),

    // SELECT statement
    select_statement: ($) =>
      seq(
        optional($._file_start_comment),
        $._SELECT,
        optional(choice($._DISTINCT, $._ALL)),
        $.select_list,
        optional($.from_clause),
        optional($.order_by_clause),
        optional($.limit_clause),
        optional($.offset_clause),
      ),

    select_list: ($) =>
      seq(repeat($.select_list_item_with_separator), $.select_list_item),

    select_list_item: ($) =>
      prec.right(
        seq(
          optional(field("comment", $.comment)),
          field("expression", $._expression),
          optional($._alias),
          optional(field("inline_comment", $.comment)),
          optional(/\n/),
        ),
      ),
    select_list_item_with_separator: ($) =>
      prec.right(
        seq(
          optional(field("comment", $.comment)),
          field("expression", $._expression),
          optional($._alias),
          $._list_separator,
          optional(field("inline_comment", $.comment)),
          optional(/\n/),
        ),
      ),

    from_clause: ($) =>
      seq(
        $._FROM,
        $.object_reference,
        repeat(seq($._list_separator, $.object_reference)),
      ),

    object_reference: ($) => choice($.table_reference),

    _database_schema_table_reference: ($) =>
      seq(
        field("database", $.reference),
        ".",
        field("schema", $.reference),
        ".",
        field("name", $.reference),
        optional($._alias),
      ),

    _schema_table_reference: ($) =>
      seq(
        field("schema", $.reference),
        ".",
        field("name", $.reference),
        optional($._alias),
      ),

    _direct_table_reference: ($) =>
      seq(field("name", $.reference), optional($._alias)),

    table_reference: ($) =>
      choice(
        prec(1, $._database_schema_table_reference),
        prec(2, $._schema_table_reference),
        $._direct_table_reference,
      ),

    where_clause: ($) => seq($._WHERE, $._expression),

    order_by_clause: ($) =>
      seq(
        $._ORDER_BY,
        $.order_by_item,
        repeat(seq($._list_separator, $.order_by_item)),
      ),

    order_by_item: ($) =>
      seq(
        field("expression", $._expression),
        optional(
          field("order", choice($.order_by_ascending, $.order_by_descending)),
        ),
      ),

    order_by_ascending: ($) => choice($._ASC, $._NULLS_FIRST),
    order_by_descending: ($) => choice($._DESC, $._NULLS_LAST),

    limit_clause: ($) =>
      seq($._LIMIT, choice($.number_literal, $._reference, /all/i)),

    offset_clause: ($) =>
      seq($._OFFSET, $.number_literal, optional(choice(/row/i, /rows/i))),
  },
});
