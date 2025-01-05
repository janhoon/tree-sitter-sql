// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterSQL",
    products: [
        .library(name: "TreeSitterSQL", targets: ["TreeSitterSQL"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterSQL",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterSQLTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterSQL",
            ],
            path: "bindings/swift/TreeSitterSQLTests"
        )
    ],
    cLanguageStandard: .c11
)
