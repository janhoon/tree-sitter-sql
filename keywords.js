/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


const keywords = [
    // Basic query keywords
    "SELECT",
    "FROM",
    "WHERE",
    "GROUP_BY",
    "HAVING",
    "ORDER_BY",
    "LIMIT",
    "OFFSET",
    
    // Join keywords
    "JOIN",
    "INNER_JOIN",
    "LEFT_JOIN",
    "RIGHT_JOIN",
    "FULL_JOIN",
    "CROSS_JOIN",
    "ON",
    
    // Table manipulation
    "CREATE",
    "ALTER",
    "DROP",
    "TRUNCATE",
    "TABLE",
    
    // Data manipulation
    "INSERT",
    "UPDATE",
    "DELETE",
    "INTO",
    "VALUES",
    "SET",
    
    // Common clauses
    "AS",
    "AND",
    "OR",
    "NOT",
    "NULL",
    "IS",
    "IN",
    "BETWEEN",
    "LIKE",
    "ILIKE",
    
    // Order by
    "ASC",
    "DESC",
    "NULLS_FIRST",
    "NULLS_LAST",
    
    // Data types
    "INTEGER",
    "BIGINT",
    "SMALLINT",
    "NUMERIC",
    "DECIMAL",
    "REAL",
    "DOUBLE_PRECISION",
    "VARCHAR",
    "CHAR",
    "TEXT",
    "BOOLEAN",
    "DATE",
    "TIME",
    "TIMESTAMP",
    "INTERVAL",
    "JSON",
    "JSONB",
    "UUID",
    
    // Constraints
    "PRIMARY_KEY",
    "FOREIGN_KEY",
    "UNIQUE",
    "CHECK",
    "DEFAULT",
    "REFERENCES",
    "NOT_NULL",
    
    // Transactions
    "BEGIN",
    "COMMIT",
    "ROLLBACK",
    "TRANSACTION",
    
    // Common PostgreSQL functions
    "COUNT",
    "SUM",
    "AVG",
    "MIN",
    "MAX",
    "COALESCE",
    "NULLIF",
    "CAST",
    
    // PostgreSQL specific
    "WITH",
    "RECURSIVE",
    "RETURNING",
    "USING",
    "DISTINCT",
    "ALL",
    "ANY",
    "SOME",
    "CASE",
    "WHEN",
    "THEN",
    "ELSE",
    "END",
    
    // Additional PostgreSQL keywords
    "OVER",
    "PARTITION_BY",
    "WINDOW",
    "LATERAL",
    "MATERIALIZED",
    "VIEW",
    "INDEX",
    "CONCURRENTLY",
    "EXTENSION",
    "SCHEMA",
    "SEQUENCE",
    "TRIGGER",
    "FUNCTION",
    "PROCEDURE",
    "LANGUAGE",
    "RETURNS",
    "RETURN",
    "DECLARE",
    "EXCEPTION",
    "RAISE",
    "NOTICE",
    "INFO",
    "WARNING",
    "ERROR",
]

const keywordRules = {}

for (const keyword of keywords) {
  keywordRules[keyword] = toKeyword(keyword)
}

module.exports = {
  keywords: {
    ...keywordRules,
    WILDCARD: () => "*",
  },
};

/**
  * Converts a string to a keyword
  * @param {string} word
  * @returns {() => Rule}
  */
function toKeyword(word) {
  const cleanedWord = word.toLowerCase().replace(/_/g, " ");
  return () => choice(cleanedWord.toLowerCase(), cleanedWord.toUpperCase());
}
