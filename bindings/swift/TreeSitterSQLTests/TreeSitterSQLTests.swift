import XCTest
import SwiftTreeSitter
import TreeSitterSQL

final class TreeSitterSQLTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sql())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading SQL grammar")
    }
}
