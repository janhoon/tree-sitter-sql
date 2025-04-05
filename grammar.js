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

  conflicts: $ => [
    [$.reference, $.string_literal],
    [$.table_reference, $.joined_table],
    [$.table_reference, $.subquery],
    [$.joined_table, $.table_reference],
    [$.joined_table],
    [$.subquery],
    [$.table_reference],
  ],

  rules: {
    source_file: ($) => repeat($._statement),

    _statement: ($) => seq(
      choice(
        $.select_statement,
        $.insert_statement,
        $.update_statement,
        $.delete_statement,
        $.create_table_statement,
        $.alter_table_statement,
        $.drop_statement
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
    string_literal: ($) => prec.right(0, $._single_quoted_reference),
    boolean_literal: () => choice(/true/i, /false/i),
    null_literal: () => keywords.NULL,

    _alias: ($) => seq(optional(keywords.AS), $.reference),

    // Expressions
    _expression: ($) => choice(
      $.wildcard,
      $.column_reference,
      $._literal,
      $.function_call,
      $.binary_expression,
      $.unary_expression,
      $.parenthesized_expression,
      $.case_expression,
      $.cast_expression,
      $.subquery
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

    binary_expression: ($) => choice(
      prec.left(2, seq($._expression, '+', $._expression)),
      prec.left(2, seq($._expression, '-', $._expression)),
      prec.left(3, seq($._expression, '*', $._expression)),
      prec.left(3, seq($._expression, '/', $._expression)),
      prec.left(3, seq($._expression, '%', $._expression)),
      prec.left(1, seq($._expression, keywords.AND, $._expression)),
      prec.left(1, seq($._expression, keywords.OR, $._expression)),
      prec.left(0, seq($._expression, '=', $._expression)),
      prec.left(0, seq($._expression, '<>', $._expression)),
      prec.left(0, seq($._expression, '!=', $._expression)),
      prec.left(0, seq($._expression, '<', $._expression)),
      prec.left(0, seq($._expression, '<=', $._expression)),
      prec.left(0, seq($._expression, '>', $._expression)),
      prec.left(0, seq($._expression, '>=', $._expression)),
      prec.left(0, seq($._expression, keywords.LIKE, $._expression)),
      prec.left(0, seq($._expression, keywords.ILIKE, $._expression)),
      prec.left(0, seq($._expression, keywords.IN, $._expression))
    ),

    unary_expression: ($) => choice(
      prec(4, seq('-', $._expression)),
      prec(4, seq('+', $._expression)),
      prec(4, seq(keywords.NOT, $._expression))
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
      optional($.with_clause),
      keywords.SELECT,
      optional(choice(keywords.DISTINCT, keywords.ALL)),
      $.select_list,
      optional($.from_clause),
      optional($.where_clause),
      optional($.group_by_clause),
      optional($.having_clause),
      optional($.order_by_clause),
      optional($.limit_clause),
      optional($.offset_clause)
    ),

    with_clause: ($) => seq(
      keywords.WITH,
      optional(keywords.RECURSIVE),
      $.cte_definition,
      repeat(seq($._list_separator, $.cte_definition))
    ),

    cte_definition: ($) => seq(
      field("name", $.reference),
      optional(seq(
        '(',
        $.column_name,
        repeat(seq($._list_separator, $.column_name)),
        ')'
      )),
      keywords.AS,
      '(',
      $.select_statement,
      ')'
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

    object_reference: ($) => prec.right(1, choice(
      $.table_reference,
      $.subquery,
      $.joined_table
    )),

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

    joined_table: ($) => prec.left(1, choice(
      seq($.table_reference, keywords.CROSS_JOIN, $.table_reference),
      seq($.table_reference, keywords.INNER_JOIN, $.table_reference, $.join_condition),
      seq($.table_reference, keywords.LEFT_JOIN, $.table_reference, $.join_condition),
      seq($.table_reference, keywords.RIGHT_JOIN, $.table_reference, $.join_condition),
      seq($.table_reference, keywords.FULL_JOIN, $.table_reference, $.join_condition),
      seq($.table_reference, keywords.JOIN, $.table_reference, $.join_condition)
    )),

    join_condition: ($) => choice(
      seq(keywords.ON, $._expression),
      seq(keywords.USING, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')')
    ),

    subquery: ($) => prec.right(1, seq(
      '(',
      $.select_statement,
      ')',
      optional($._alias)
    )),

    where_clause: ($) => seq(
      keywords.WHERE,
      $._expression
    ),

    group_by_clause: ($) => seq(
      keywords.GROUP_BY,
      $._expression,
      repeat(seq($._list_separator, $._expression))
    ),

    having_clause: ($) => seq(
      keywords.HAVING,
      $._expression
    ),

    order_by_clause: ($) => seq(
      choice(
        keywords.ORDER_BY,
        seq(keywords.ORDER, keywords.BY)
      ),
      $.order_by_item,
      repeat(seq($._list_separator, $.order_by_item))
    ),

    order_by_item: ($) => seq(
      $._expression,
      optional(choice(/asc/i, /desc/i)),
      optional(choice(/nulls first/i, /nulls last/i))
    ),

    limit_clause: ($) => seq(
      keywords.LIMIT,
      choice($.number_literal, $._reference, /all/i)
    ),

    offset_clause: ($) => seq(
      keywords.OFFSET,
      $.number_literal,
      optional(choice(/row/i, /rows/i))
    ),

    // INSERT statement
    insert_statement: ($) => seq(
      keywords.INSERT,
      keywords.INTO,
      $.table_reference,
      optional(seq(
        '(',
        $.column_name,
        repeat(seq($._list_separator, $.column_name)),
        ')'
      )),
      choice(
        $.values_clause,
        $.select_statement
      ),
      optional($.returning_clause)
    ),

    values_clause: ($) => seq(
      keywords.VALUES,
      $.value_list,
      repeat(seq($._list_separator, $.value_list))
    ),

    value_list: ($) => seq(
      '(',
      $._expression,
      repeat(seq($._list_separator, $._expression)),
      ')'
    ),

    returning_clause: ($) => seq(
      keywords.RETURNING,
      choice(
        '*',
        seq(
          $.select_list_item,
          repeat(seq($._list_separator, $.select_list_item))
        )
      )
    ),

    // UPDATE statement
    update_statement: ($) => seq(
      keywords.UPDATE,
      $.table_reference,
      keywords.SET,
      $.update_item,
      repeat(seq($._list_separator, $.update_item)),
      optional($.where_clause),
      optional($.returning_clause)
    ),

    update_item: ($) => seq(
      field("column", $.column_name),
      '=',
      field("value", $._expression)
    ),

    // DELETE statement
    delete_statement: ($) => seq(
      keywords.DELETE,
      keywords.FROM,
      $.table_reference,
      optional($.where_clause),
      optional($.returning_clause)
    ),

    // CREATE TABLE statement
    create_table_statement: ($) => seq(
      keywords.CREATE,
      optional(/temp|temporary/i),
      keywords.TABLE,
      optional(/if not exists/i),
      $.table_reference,
      '(',
      $.column_definition,
      repeat(seq($._list_separator, $.column_definition)),
      optional(seq($._list_separator, repeat($.table_constraint))),
      ')'
    ),

    column_definition: ($) => seq(
      field("name", $.reference),
      $.data_type,
      repeat($.column_constraint)
    ),

    column_constraint: ($) => choice(
      keywords.NOT_NULL,
      keywords.NULL,
      keywords.UNIQUE,
      $.primary_key_constraint,
      $.foreign_key_constraint,
      $.check_constraint,
      $.default_constraint
    ),

    primary_key_constraint: ($) => keywords.PRIMARY_KEY,

    foreign_key_constraint: ($) => seq(
      keywords.REFERENCES,
      $.table_reference,
      optional(seq(
        '(',
        $.column_name,
        repeat(seq($._list_separator, $.column_name)),
        ')'
      )),
      optional(/on delete/i),
      optional(/on update/i)
    ),

    check_constraint: ($) => seq(
      keywords.CHECK,
      '(',
      $._expression,
      ')'
    ),

    default_constraint: ($) => seq(
      keywords.DEFAULT,
      $._expression
    ),

    table_constraint: ($) => choice(
      seq(keywords.PRIMARY_KEY, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')'),
      seq(keywords.UNIQUE, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')'),
      seq(keywords.FOREIGN_KEY, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')', $.foreign_key_constraint),
      seq(keywords.CHECK, '(', $._expression, ')')
    ),

    // ALTER TABLE statement
    alter_table_statement: ($) => seq(
      keywords.ALTER,
      keywords.TABLE,
      $.table_reference,
      $.alter_table_action
    ),

    alter_table_action: ($) => choice(
      seq(/add column/i, $.column_definition),
      seq(/drop column/i, $.column_name),
      seq(/alter column/i, $.column_name, $.alter_column_action),
      seq(/add/i, $.table_constraint),
      seq(/drop constraint/i, $.reference)
    ),

    alter_column_action: ($) => choice(
      seq(/set default/i, $._expression),
      /drop default/i,
      /set not null/i,
      /drop not null/i,
      seq(/type/i, $.data_type)
    ),

    // DROP statement
    drop_statement: ($) => seq(
      keywords.DROP,
      choice(
        seq(keywords.TABLE, optional(/if exists/i), $.table_reference),
        seq(/index/i, optional(/if exists/i), $.reference),
        seq(/view/i, optional(/if exists/i), $.reference),
        seq(/schema/i, optional(/if exists/i), $.reference),
        seq(/sequence/i, optional(/if exists/i), $.reference)
      )
    ),

    // Column name (for backward compatibility)
    column_name: ($) => $.column_reference,
  },
});
