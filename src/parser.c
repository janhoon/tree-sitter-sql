#include "tree_sitter/parser.h"

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 26
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 23
#define ALIAS_COUNT 0
#define TOKEN_COUNT 8
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 3
#define MAX_ALIAS_SEQUENCE_LENGTH 2
#define PRODUCTION_ID_COUNT 7

enum ts_symbol_identifiers {
  anon_sym_COMMA = 1,
  sym__quoted_string = 2,
  sym__reference = 3,
  anon_sym_as = 4,
  aux_sym_select_statement_token1 = 5,
  anon_sym_DOT = 6,
  aux_sym_table_expression_token1 = 7,
  sym_source_file = 8,
  sym__statement = 9,
  sym__list_separator = 10,
  sym__name_or_string = 11,
  sym__alias = 12,
  sym_alias = 13,
  sym_select_statement = 14,
  sym_select_list = 15,
  sym_column_name = 16,
  sym_select_list_item = 17,
  sym__column_table_reference = 18,
  sym_table_expression = 19,
  sym_table_name = 20,
  aux_sym_source_file_repeat1 = 21,
  aux_sym_select_list_repeat1 = 22,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_COMMA] = ",",
  [sym__quoted_string] = "_quoted_string",
  [sym__reference] = "_reference",
  [anon_sym_as] = "as",
  [aux_sym_select_statement_token1] = "select_statement_token1",
  [anon_sym_DOT] = ".",
  [aux_sym_table_expression_token1] = "table_expression_token1",
  [sym_source_file] = "source_file",
  [sym__statement] = "_statement",
  [sym__list_separator] = "_list_separator",
  [sym__name_or_string] = "_name_or_string",
  [sym__alias] = "_alias",
  [sym_alias] = "alias",
  [sym_select_statement] = "select_statement",
  [sym_select_list] = "select_list",
  [sym_column_name] = "column_name",
  [sym_select_list_item] = "select_list_item",
  [sym__column_table_reference] = "_column_table_reference",
  [sym_table_expression] = "table_expression",
  [sym_table_name] = "table_name",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
  [aux_sym_select_list_repeat1] = "select_list_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [sym__quoted_string] = sym__quoted_string,
  [sym__reference] = sym__reference,
  [anon_sym_as] = anon_sym_as,
  [aux_sym_select_statement_token1] = aux_sym_select_statement_token1,
  [anon_sym_DOT] = anon_sym_DOT,
  [aux_sym_table_expression_token1] = aux_sym_table_expression_token1,
  [sym_source_file] = sym_source_file,
  [sym__statement] = sym__statement,
  [sym__list_separator] = sym__list_separator,
  [sym__name_or_string] = sym__name_or_string,
  [sym__alias] = sym__alias,
  [sym_alias] = sym_alias,
  [sym_select_statement] = sym_select_statement,
  [sym_select_list] = sym_select_list,
  [sym_column_name] = sym_column_name,
  [sym_select_list_item] = sym_select_list_item,
  [sym__column_table_reference] = sym__column_table_reference,
  [sym_table_expression] = sym_table_expression,
  [sym_table_name] = sym_table_name,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
  [aux_sym_select_list_repeat1] = aux_sym_select_list_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [sym__quoted_string] = {
    .visible = false,
    .named = true,
  },
  [sym__reference] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_as] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_select_statement_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_DOT] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_table_expression_token1] = {
    .visible = false,
    .named = false,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [sym__statement] = {
    .visible = false,
    .named = true,
  },
  [sym__list_separator] = {
    .visible = false,
    .named = true,
  },
  [sym__name_or_string] = {
    .visible = false,
    .named = true,
  },
  [sym__alias] = {
    .visible = false,
    .named = true,
  },
  [sym_alias] = {
    .visible = true,
    .named = true,
  },
  [sym_select_statement] = {
    .visible = true,
    .named = true,
  },
  [sym_select_list] = {
    .visible = true,
    .named = true,
  },
  [sym_column_name] = {
    .visible = true,
    .named = true,
  },
  [sym_select_list_item] = {
    .visible = true,
    .named = true,
  },
  [sym__column_table_reference] = {
    .visible = false,
    .named = true,
  },
  [sym_table_expression] = {
    .visible = true,
    .named = true,
  },
  [sym_table_name] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_select_list_repeat1] = {
    .visible = false,
    .named = false,
  },
};

enum ts_field_identifiers {
  field_alias = 1,
  field_column_table_reference = 2,
  field_reference = 3,
};

static const char * const ts_field_names[] = {
  [0] = NULL,
  [field_alias] = "alias",
  [field_column_table_reference] = "column_table_reference",
  [field_reference] = "reference",
};

static const TSFieldMapSlice ts_field_map_slices[PRODUCTION_ID_COUNT] = {
  [1] = {.index = 0, .length = 1},
  [2] = {.index = 1, .length = 1},
  [3] = {.index = 2, .length = 2},
  [4] = {.index = 4, .length = 1},
  [5] = {.index = 5, .length = 1},
  [6] = {.index = 6, .length = 1},
};

static const TSFieldMapEntry ts_field_map_entries[] = {
  [0] =
    {field_reference, 0},
  [1] =
    {field_column_table_reference, 0},
  [2] =
    {field_alias, 1, .inherited = true},
    {field_reference, 0},
  [4] =
    {field_alias, 0},
  [5] =
    {field_alias, 1, .inherited = true},
  [6] =
    {field_alias, 1},
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(12);
      ADVANCE_MAP(
        '"', 2,
        ',', 13,
        '.', 27,
        'a', 15,
        'F', 22,
        'f', 22,
        'S', 17,
        's', 17,
      );
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(0);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('b' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 1:
      if (lookahead == '"') ADVANCE(2);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(1);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 2:
      if (lookahead == '"') ADVANCE(14);
      if (lookahead != 0) ADVANCE(2);
      END_STATE();
    case 3:
      if (lookahead == 'C' ||
          lookahead == 'c') ADVANCE(10);
      END_STATE();
    case 4:
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(6);
      END_STATE();
    case 5:
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(3);
      END_STATE();
    case 6:
      if (lookahead == 'L' ||
          lookahead == 'l') ADVANCE(5);
      END_STATE();
    case 7:
      if (lookahead == 'M' ||
          lookahead == 'm') ADVANCE(28);
      END_STATE();
    case 8:
      if (lookahead == 'O' ||
          lookahead == 'o') ADVANCE(7);
      END_STATE();
    case 9:
      if (lookahead == 'R' ||
          lookahead == 'r') ADVANCE(8);
      END_STATE();
    case 10:
      if (lookahead == 'T' ||
          lookahead == 't') ADVANCE(26);
      END_STATE();
    case 11:
      if (eof) ADVANCE(12);
      if (lookahead == ',') ADVANCE(13);
      if (lookahead == 'F' ||
          lookahead == 'f') ADVANCE(9);
      if (lookahead == 'S' ||
          lookahead == 's') ADVANCE(4);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(11);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(sym__quoted_string);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 's') ADVANCE(25);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'C' ||
          lookahead == 'c') ADVANCE(23);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(19);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'E' ||
          lookahead == 'e') ADVANCE(16);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 19:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'L' ||
          lookahead == 'l') ADVANCE(18);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 20:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'M' ||
          lookahead == 'm') ADVANCE(24);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 21:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'O' ||
          lookahead == 'o') ADVANCE(20);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 22:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'R' ||
          lookahead == 'r') ADVANCE(21);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 23:
      ACCEPT_TOKEN(sym__reference);
      if (lookahead == 'T' ||
          lookahead == 't') ADVANCE(24);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 24:
      ACCEPT_TOKEN(sym__reference);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 25:
      ACCEPT_TOKEN(anon_sym_as);
      if (('0' <= lookahead && lookahead <= '9') ||
          ('A' <= lookahead && lookahead <= 'Z') ||
          lookahead == '_' ||
          ('a' <= lookahead && lookahead <= 'z')) ADVANCE(24);
      END_STATE();
    case 26:
      ACCEPT_TOKEN(aux_sym_select_statement_token1);
      END_STATE();
    case 27:
      ACCEPT_TOKEN(anon_sym_DOT);
      END_STATE();
    case 28:
      ACCEPT_TOKEN(aux_sym_table_expression_token1);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 11},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 1},
  [6] = {.lex_state = 11},
  [7] = {.lex_state = 11},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 11},
  [10] = {.lex_state = 11},
  [11] = {.lex_state = 11},
  [12] = {.lex_state = 1},
  [13] = {.lex_state = 1},
  [14] = {.lex_state = 11},
  [15] = {.lex_state = 11},
  [16] = {.lex_state = 11},
  [17] = {.lex_state = 1},
  [18] = {.lex_state = 11},
  [19] = {.lex_state = 11},
  [20] = {.lex_state = 11},
  [21] = {.lex_state = 1},
  [22] = {.lex_state = 11},
  [23] = {.lex_state = 11},
  [24] = {.lex_state = 1},
  [25] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [sym__quoted_string] = ACTIONS(1),
    [sym__reference] = ACTIONS(1),
    [anon_sym_as] = ACTIONS(1),
    [aux_sym_select_statement_token1] = ACTIONS(1),
    [anon_sym_DOT] = ACTIONS(1),
    [aux_sym_table_expression_token1] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(25),
    [sym__statement] = STATE(6),
    [sym_select_statement] = STATE(6),
    [sym_table_expression] = STATE(6),
    [aux_sym_source_file_repeat1] = STATE(6),
    [ts_builtin_sym_end] = ACTIONS(3),
    [aux_sym_select_statement_token1] = ACTIONS(5),
    [aux_sym_table_expression_token1] = ACTIONS(7),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 8,
    ACTIONS(11), 1,
      sym__quoted_string,
    ACTIONS(13), 1,
      sym__reference,
    ACTIONS(15), 1,
      anon_sym_as,
    STATE(14), 1,
      sym_alias,
    STATE(16), 1,
      sym__alias,
    STATE(19), 1,
      sym__name_or_string,
    ACTIONS(9), 2,
      ts_builtin_sym_end,
      anon_sym_COMMA,
    ACTIONS(17), 2,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [27] = 8,
    ACTIONS(11), 1,
      sym__quoted_string,
    ACTIONS(13), 1,
      sym__reference,
    ACTIONS(15), 1,
      anon_sym_as,
    ACTIONS(19), 1,
      ts_builtin_sym_end,
    STATE(14), 1,
      sym_alias,
    STATE(19), 1,
      sym__name_or_string,
    STATE(23), 1,
      sym__alias,
    ACTIONS(21), 2,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [53] = 3,
    ACTIONS(27), 1,
      anon_sym_DOT,
    ACTIONS(23), 3,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      sym__quoted_string,
    ACTIONS(25), 4,
      sym__reference,
      anon_sym_as,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [68] = 6,
    STATE(2), 1,
      sym_column_name,
    STATE(4), 1,
      sym__name_or_string,
    STATE(9), 1,
      sym_select_list_item,
    STATE(20), 1,
      sym_select_list,
    STATE(21), 1,
      sym__column_table_reference,
    ACTIONS(29), 2,
      sym__quoted_string,
      sym__reference,
  [88] = 4,
    ACTIONS(5), 1,
      aux_sym_select_statement_token1,
    ACTIONS(7), 1,
      aux_sym_table_expression_token1,
    ACTIONS(31), 1,
      ts_builtin_sym_end,
    STATE(7), 4,
      sym__statement,
      sym_select_statement,
      sym_table_expression,
      aux_sym_source_file_repeat1,
  [104] = 4,
    ACTIONS(33), 1,
      ts_builtin_sym_end,
    ACTIONS(35), 1,
      aux_sym_select_statement_token1,
    ACTIONS(38), 1,
      aux_sym_table_expression_token1,
    STATE(7), 4,
      sym__statement,
      sym_select_statement,
      sym_table_expression,
      aux_sym_source_file_repeat1,
  [120] = 2,
    ACTIONS(41), 3,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      sym__quoted_string,
    ACTIONS(43), 4,
      sym__reference,
      anon_sym_as,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [132] = 4,
    ACTIONS(47), 1,
      anon_sym_COMMA,
    STATE(10), 1,
      aux_sym_select_list_repeat1,
    STATE(12), 1,
      sym__list_separator,
    ACTIONS(45), 3,
      ts_builtin_sym_end,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [147] = 4,
    ACTIONS(47), 1,
      anon_sym_COMMA,
    STATE(11), 1,
      aux_sym_select_list_repeat1,
    STATE(12), 1,
      sym__list_separator,
    ACTIONS(49), 3,
      ts_builtin_sym_end,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [162] = 4,
    ACTIONS(53), 1,
      anon_sym_COMMA,
    STATE(11), 1,
      aux_sym_select_list_repeat1,
    STATE(12), 1,
      sym__list_separator,
    ACTIONS(51), 3,
      ts_builtin_sym_end,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [177] = 5,
    STATE(2), 1,
      sym_column_name,
    STATE(4), 1,
      sym__name_or_string,
    STATE(18), 1,
      sym_select_list_item,
    STATE(21), 1,
      sym__column_table_reference,
    ACTIONS(29), 2,
      sym__quoted_string,
      sym__reference,
  [194] = 3,
    STATE(3), 1,
      sym__name_or_string,
    STATE(22), 1,
      sym_table_name,
    ACTIONS(56), 2,
      sym__quoted_string,
      sym__reference,
  [205] = 1,
    ACTIONS(58), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [212] = 1,
    ACTIONS(60), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [219] = 1,
    ACTIONS(62), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [226] = 3,
    STATE(15), 1,
      sym_alias,
    STATE(19), 1,
      sym__name_or_string,
    ACTIONS(11), 2,
      sym__quoted_string,
      sym__reference,
  [237] = 1,
    ACTIONS(51), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [244] = 1,
    ACTIONS(64), 4,
      ts_builtin_sym_end,
      anon_sym_COMMA,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [251] = 1,
    ACTIONS(66), 3,
      ts_builtin_sym_end,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [257] = 2,
    STATE(8), 1,
      sym__name_or_string,
    ACTIONS(68), 2,
      sym__quoted_string,
      sym__reference,
  [265] = 1,
    ACTIONS(70), 3,
      ts_builtin_sym_end,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [271] = 1,
    ACTIONS(72), 3,
      ts_builtin_sym_end,
      aux_sym_select_statement_token1,
      aux_sym_table_expression_token1,
  [277] = 1,
    ACTIONS(74), 2,
      sym__quoted_string,
      sym__reference,
  [282] = 1,
    ACTIONS(76), 1,
      ts_builtin_sym_end,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 27,
  [SMALL_STATE(4)] = 53,
  [SMALL_STATE(5)] = 68,
  [SMALL_STATE(6)] = 88,
  [SMALL_STATE(7)] = 104,
  [SMALL_STATE(8)] = 120,
  [SMALL_STATE(9)] = 132,
  [SMALL_STATE(10)] = 147,
  [SMALL_STATE(11)] = 162,
  [SMALL_STATE(12)] = 177,
  [SMALL_STATE(13)] = 194,
  [SMALL_STATE(14)] = 205,
  [SMALL_STATE(15)] = 212,
  [SMALL_STATE(16)] = 219,
  [SMALL_STATE(17)] = 226,
  [SMALL_STATE(18)] = 237,
  [SMALL_STATE(19)] = 244,
  [SMALL_STATE(20)] = 251,
  [SMALL_STATE(21)] = 257,
  [SMALL_STATE(22)] = 265,
  [SMALL_STATE(23)] = 271,
  [SMALL_STATE(24)] = 277,
  [SMALL_STATE(25)] = 282,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0, 0, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [9] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_select_list_item, 1, 0, 1),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(19),
  [15] = {.entry = {.count = 1, .reusable = false}}, SHIFT(17),
  [17] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_select_list_item, 1, 0, 1),
  [19] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_table_name, 1, 0, 0),
  [21] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_table_name, 1, 0, 0),
  [23] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_column_name, 1, 0, 0),
  [25] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_column_name, 1, 0, 0),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [29] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [31] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1, 0, 0),
  [33] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0),
  [35] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(5),
  [38] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(13),
  [41] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_column_name, 2, 0, 0),
  [43] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_column_name, 2, 0, 0),
  [45] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_select_list, 1, 0, 0),
  [47] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [49] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_select_list, 2, 0, 0),
  [51] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_select_list_repeat1, 2, 0, 0),
  [53] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_select_list_repeat1, 2, 0, 0), SHIFT_REPEAT(12),
  [56] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [58] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__alias, 1, 0, 4),
  [60] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__alias, 2, 0, 6),
  [62] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_select_list_item, 2, 0, 3),
  [64] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_alias, 1, 0, 0),
  [66] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_select_statement, 2, 0, 0),
  [68] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [70] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_table_expression, 2, 0, 0),
  [72] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_table_name, 2, 0, 5),
  [74] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__column_table_reference, 2, 0, 2),
  [76] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef TREE_SITTER_HIDE_SYMBOLS
#define TS_PUBLIC
#elif defined(_WIN32)
#define TS_PUBLIC __declspec(dllexport)
#else
#define TS_PUBLIC __attribute__((visibility("default")))
#endif

TS_PUBLIC const TSLanguage *tree_sitter_sql(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .field_names = ts_field_names,
    .field_map_slices = ts_field_map_slices,
    .field_map_entries = ts_field_map_entries,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
