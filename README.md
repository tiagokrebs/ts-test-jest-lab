# ts-test-jest-local

Use AAA:
- Arrange
- Act
- Assert

Setup and Teardown

FIRST
- Fast
- Independent
- Repeatable
- Self-validating
- Thorough

Properties
- only
- skip
- todo
- concurrent

Aliases
- it
- test
- xit (it.skip)
- fit (it.only)

Watch mode (see package.json)

Debug Jest Tests (relative open file)
https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests

Ignore artifacts
https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md
/* istanbul ignore next */

Practice
Kata: Good practice made through great ideas of small software projects
https://github.com/gamontal/awesome-katas

Doubles
- Stubs
- Fakes
- Mocks
- Spies
- Mock Modules

Test styles (¬¬)
- Chicago
    - collection of pieces
    - test for broader view
    - little use of mocks
- London
    -  mock lots of dependencies if not all
- As always a temperate approach is better
    - test the requirement

Simple reservation handler app example
