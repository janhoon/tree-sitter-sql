/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = {
  keywords: {
    // Basic query keywords
    WILDCARD: token(prec(10, /\*/i)),
    SELECT: token(prec(10, /select/i)),
    FROM: token(prec(10, /from/i)),
    WHERE: token(prec(10, /where/i)),
    GROUP_BY: token(prec(10, /group\s+by/i)),
    HAVING: token(prec(10, /having/i)),
    ORDER_BY: token(prec(10, /order\s+by/i)),
    LIMIT: token(prec(10, /limit/i)),
    OFFSET: token(prec(10, /offset/i)),
    
    // Join keywords
    JOIN: token(prec(10, /join/i)),
    INNER_JOIN: token(prec(10, /inner\s+join/i)),
    LEFT_JOIN: token(prec(10, /left(\s+outer)?\s+join/i)),
    RIGHT_JOIN: token(prec(10, /right(\s+outer)?\s+join/i)),
    FULL_JOIN: token(prec(10, /full(\s+outer)?\s+join/i)),
    CROSS_JOIN: token(prec(10, /cross\s+join/i)),
    ON: token(prec(10, /on/i)),
    
    // Table manipulation
    CREATE: token(prec(10, /create/i)),
    ALTER: token(prec(10, /alter/i)),
    DROP: token(prec(10, /drop/i)),
    TRUNCATE: token(prec(10, /truncate/i)),
    TABLE: token(prec(10, /table/i)),
    
    // Data manipulation
    INSERT: token(prec(10, /insert/i)),
    UPDATE: token(prec(10, /update/i)),
    DELETE: token(prec(10, /delete/i)),
    INTO: token(prec(10, /into/i)),
    VALUES: token(prec(10, /values/i)),
    SET: token(prec(10, /set/i)),
    
    // Common clauses
    AS: token(prec(10, /as/i)),
    AND: token(prec(10, /and/i)),
    OR: token(prec(10, /or/i)),
    NOT: token(prec(10, /not/i)),
    NULL: token(prec(10, /null/i)),
    IS: token(prec(10, /is/i)),
    IN: token(prec(10, /in/i)),
    BETWEEN: token(prec(10, /between/i)),
    LIKE: token(prec(10, /like/i)),
    ILIKE: token(prec(10, /ilike/i)),
    
    // Order by
    ASC: token(prec(10, /asc/i)),
    DESC: token(prec(10, /desc/i)),
    NULLS_FIRST: token(prec(10, /nulls\s+first/i)),
    NULLS_LAST: token(prec(10, /nulls\s+last/i)),
    
    // Data types
    INTEGER: token(prec(10, /integer|int/i)),
    BIGINT: token(prec(10, /bigint/i)),
    SMALLINT: token(prec(10, /smallint/i)),
    NUMERIC: token(prec(10, /numeric/i)),
    DECIMAL: token(prec(10, /decimal/i)),
    REAL: token(prec(10, /real/i)),
    DOUBLE_PRECISION: token(prec(10, /double\s+precision/i)),
    VARCHAR: token(prec(10, /varchar/i)),
    CHAR: token(prec(10, /char/i)),
    TEXT: token(prec(10, /text/i)),
    BOOLEAN: token(prec(10, /boolean|bool/i)),
    DATE: token(prec(10, /date/i)),
    TIME: token(prec(10, /time/i)),
    TIMESTAMP: token(prec(10, /timestamp/i)),
    INTERVAL: token(prec(10, /interval/i)),
    JSON: token(prec(10, /json/i)),
    JSONB: token(prec(10, /jsonb/i)),
    UUID: token(prec(10, /uuid/i)),
    
    // Constraints
    PRIMARY_KEY: token(prec(10, /primary\s+key/i)),
    FOREIGN_KEY: token(prec(10, /foreign\s+key/i)),
    UNIQUE: token(prec(10, /unique/i)),
    CHECK: token(prec(10, /check/i)),
    DEFAULT: token(prec(10, /default/i)),
    REFERENCES: token(prec(10, /references/i)),
    NOT_NULL: token(prec(10, /not\s+null/i)),
    
    // Transactions
    BEGIN: token(prec(10, /begin/i)),
    COMMIT: token(prec(10, /commit/i)),
    ROLLBACK: token(prec(10, /rollback/i)),
    TRANSACTION: token(prec(10, /transaction/i)),
    
    // Common PostgreSQL functions
    COUNT: token(prec(10, /count/i)),
    SUM: token(prec(10, /sum/i)),
    AVG: token(prec(10, /avg/i)),
    MIN: token(prec(10, /min/i)),
    MAX: token(prec(10, /max/i)),
    COALESCE: token(prec(10, /coalesce/i)),
    NULLIF: token(prec(10, /nullif/i)),
    CAST: token(prec(10, /cast/i)),
    
    // PostgreSQL specific
    WITH: token(prec(10, /with/i)),
    RECURSIVE: token(prec(10, /recursive/i)),
    RETURNING: token(prec(10, /returning/i)),
    USING: token(prec(10, /using/i)),
    DISTINCT: token(prec(10, /distinct/i)),
    ALL: token(prec(10, /all/i)),
    ANY: token(prec(10, /any/i)),
    SOME: token(prec(10, /some/i)),
    CASE: token(prec(10, /case/i)),
    WHEN: token(prec(10, /when/i)),
    THEN: token(prec(10, /then/i)),
    ELSE: token(prec(10, /else/i)),
    END: token(prec(10, /end/i)),
    
    // Additional PostgreSQL keywords
    OVER: token(prec(10, /over/i)),
    PARTITION_BY: token(prec(10, /partition\s+by/i)),
    WINDOW: token(prec(10, /window/i)),
    LATERAL: token(prec(10, /lateral/i)),
    MATERIALIZED: token(prec(10, /materialized/i)),
    VIEW: token(prec(10, /view/i)),
    INDEX: token(prec(10, /index/i)),
    CONCURRENTLY: token(prec(10, /concurrently/i)),
    EXTENSION: token(prec(10, /extension/i)),
    SCHEMA: token(prec(10, /schema/i)),
    SEQUENCE: token(prec(10, /sequence/i)),
    TRIGGER: token(prec(10, /trigger/i)),
    FUNCTION: token(prec(10, /function/i)),
    PROCEDURE: token(prec(10, /procedure/i)),
    LANGUAGE: token(prec(10, /language/i)),
    RETURNS: token(prec(10, /returns/i)),
    RETURN: token(prec(10, /return/i)),
    DECLARE: token(prec(10, /declare/i)),
    EXCEPTION: token(prec(10, /exception/i)),
    RAISE: token(prec(10, /raise/i)),
    NOTICE: token(prec(10, /notice/i)),
    INFO: token(prec(10, /info/i)),
    WARNING: token(prec(10, /warning/i)),
    ERROR: token(prec(10, /error/i)),
  },
};
