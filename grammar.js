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
    [$._name_or_string, $.string_literal],
    [$.table_reference, $.joined_table],
    [$.table_reference, $.subquery],
    [$.joined_table, $.table_reference],
    [$.joined_table],
    [$.subquery],
    [$.subquery, $._alias]
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
    _quoted_string: () => /"[^"]*"/,
    _single_quoted_string: () => /'[^']*'/,
    _reference: () => /[a-zA-Z][a-zA-Z0-9_]*/,
    _name_or_string: ($) => prec.right(1, choice($._reference, $._quoted_string)),
    _literal: ($) => choice(
      $.number_literal,
      $.string_literal,
      $.boolean_literal,
      $.null_literal
    ),

    number_literal: () => /[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/,
    string_literal: ($) => prec.right(0, choice($._quoted_string, $._single_quoted_string)),
    boolean_literal: () => choice(/true/i, /false/i),
    null_literal: () => keywords.NULL,

    _alias: ($) => prec.right(2, seq(optional(keywords.AS), field("alias", $.alias))),
    alias: ($) => prec.right(2, $._name_or_string),

    // Expressions
    expression: ($) => choice(
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

    column_reference: ($) => seq(
      optional(seq(field("table", $._name_or_string), '.')),
      field("column", $._name_or_string)
    ),

    function_call: ($) => seq(
      field("function_name", $._name_or_string),
      '(',
      optional($.function_arguments),
      ')'
    ),

    function_arguments: ($) => seq(
      $.expression,
      repeat(seq($._list_separator, $.expression))
    ),

    binary_expression: ($) => choice(
      prec.left(2, seq($.expression, '+', $.expression)),
      prec.left(2, seq($.expression, '-', $.expression)),
      prec.left(3, seq($.expression, '*', $.expression)),
      prec.left(3, seq($.expression, '/', $.expression)),
      prec.left(3, seq($.expression, '%', $.expression)),
      prec.left(1, seq($.expression, keywords.AND, $.expression)),
      prec.left(1, seq($.expression, keywords.OR, $.expression)),
      prec.left(0, seq($.expression, '=', $.expression)),
      prec.left(0, seq($.expression, '<>', $.expression)),
      prec.left(0, seq($.expression, '!=', $.expression)),
      prec.left(0, seq($.expression, '<', $.expression)),
      prec.left(0, seq($.expression, '<=', $.expression)),
      prec.left(0, seq($.expression, '>', $.expression)),
      prec.left(0, seq($.expression, '>=', $.expression)),
      prec.left(0, seq($.expression, keywords.LIKE, $.expression)),
      prec.left(0, seq($.expression, keywords.ILIKE, $.expression)),
      prec.left(0, seq($.expression, keywords.IN, $.expression))
    ),

    unary_expression: ($) => choice(
      prec(4, seq('-', $.expression)),
      prec(4, seq('+', $.expression)),
      prec(4, seq(keywords.NOT, $.expression))
    ),

    parenthesized_expression: ($) => seq(
      '(',
      $.expression,
      ')'
    ),

    case_expression: ($) => seq(
      keywords.CASE,
      optional($.expression),
      repeat1($.when_clause),
      optional($.else_clause),
      keywords.END
    ),

    when_clause: ($) => seq(
      keywords.WHEN,
      $.expression,
      keywords.THEN,
      $.expression
    ),

    else_clause: ($) => seq(
      keywords.ELSE,
      $.expression
    ),

    cast_expression: ($) => seq(
      keywords.CAST,
      '(',
      $.expression,
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
    select_statement: ($) => prec.right(1, seq(
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
    )),

    with_clause: ($) => seq(
      keywords.WITH,
      optional(keywords.RECURSIVE),
      $.cte_definition,
      repeat(seq($._list_separator, $.cte_definition))
    ),

    cte_definition: ($) => seq(
      field("name", $._name_or_string),
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
      choice(
        seq(
          $.select_list_item,
          repeat(seq($._list_separator, $.select_list_item))
        ),
        '*'
      )
    ),

    select_list_item: ($) => seq(
      field("expression", $.expression),
      optional($._alias)
    ),

    from_clause: ($) => seq(
      keywords.FROM,
      $.table_reference,
      repeat(seq($._list_separator, $.table_reference))
    ),

    table_reference: ($) => prec.right(1, choice(
      $.table_name,
      $.subquery,
      $.joined_table
    )),

    table_name: ($) => seq(
      field("name", $._name_or_string),
      optional($._alias)
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
      seq(keywords.ON, $.expression),
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
      $.expression
    ),

    group_by_clause: ($) => seq(
      keywords.GROUP_BY,
      $.expression,
      repeat(seq($._list_separator, $.expression))
    ),

    having_clause: ($) => seq(
      keywords.HAVING,
      $.expression
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
      $.expression,
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
      $.table_name,
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
      $.expression,
      repeat(seq($._list_separator, $.expression)),
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
      $.table_name,
      keywords.SET,
      $.update_item,
      repeat(seq($._list_separator, $.update_item)),
      optional($.where_clause),
      optional($.returning_clause)
    ),

    update_item: ($) => seq(
      field("column", $.column_name),
      '=',
      field("value", $.expression)
    ),

    // DELETE statement
    delete_statement: ($) => seq(
      keywords.DELETE,
      keywords.FROM,
      $.table_name,
      optional($.where_clause),
      optional($.returning_clause)
    ),

    // CREATE TABLE statement
    create_table_statement: ($) => seq(
      keywords.CREATE,
      optional(/temp|temporary/i),
      keywords.TABLE,
      optional(/if not exists/i),
      $.table_name,
      '(',
      $.column_definition,
      repeat(seq($._list_separator, $.column_definition)),
      optional(seq($._list_separator, repeat($.table_constraint))),
      ')'
    ),

    column_definition: ($) => seq(
      field("name", $._name_or_string),
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
      $.table_name,
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
      $.expression,
      ')'
    ),

    default_constraint: ($) => seq(
      keywords.DEFAULT,
      $.expression
    ),

    table_constraint: ($) => choice(
      seq(keywords.PRIMARY_KEY, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')'),
      seq(keywords.UNIQUE, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')'),
      seq(keywords.FOREIGN_KEY, '(', $.column_name, repeat(seq($._list_separator, $.column_name)), ')', $.foreign_key_constraint),
      seq(keywords.CHECK, '(', $.expression, ')')
    ),

    // ALTER TABLE statement
    alter_table_statement: ($) => seq(
      keywords.ALTER,
      keywords.TABLE,
      $.table_name,
      $.alter_table_action
    ),

    alter_table_action: ($) => choice(
      seq(/add column/i, $.column_definition),
      seq(/drop column/i, $.column_name),
      seq(/alter column/i, $.column_name, $.alter_column_action),
      seq(/add/i, $.table_constraint),
      seq(/drop constraint/i, $._name_or_string)
    ),

    alter_column_action: ($) => choice(
      seq(/set default/i, $.expression),
      /drop default/i,
      /set not null/i,
      /drop not null/i,
      seq(/type/i, $.data_type)
    ),

    // DROP statement
    drop_statement: ($) => seq(
      keywords.DROP,
      choice(
        seq(keywords.TABLE, optional(/if exists/i), $.table_name),
        seq(/index/i, optional(/if exists/i), $._name_or_string),
        seq(/view/i, optional(/if exists/i), $._name_or_string),
        seq(/schema/i, optional(/if exists/i), $._name_or_string),
        seq(/sequence/i, optional(/if exists/i), $._name_or_string)
      )
    ),

    // Column name (for backward compatibility)
    column_name: ($) => $.column_reference,
  },
});
