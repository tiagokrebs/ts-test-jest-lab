import { toUpperCase, getStringInfo, StringUtils } from './Utils';

describe('Utils test suite', () => {

    describe('StringUtils tests', () => {

        let sut: StringUtils; // this is ok to be used with beforeEach hooks

        beforeEach(() => { // hooks ensure that the sut is always initialized before each test
            console.log('setup');
            sut = new StringUtils;
        });

        afterEach(() => { // hooks also ensure that the sut is always cleaned up after each test
            // clear mocks, teardown
            console.log('teardown');
        });

        // beforeAll(() => {}) // more used for integration tests
        // afterAll(() => {}) // more used for integration tests

        test('should return correct uppercase', () => {
            const result = sut.toUpperCase('Hallo');

            expect(result).toBe('HALLO');
            console.log('test done');
        })

        // Testing for exceptions
        test('should thrown error on undefine string', () => {
            function expectedError() {
                const result = sut.toUpperCase('');

            }
            
            expect(expectedError).toThrow;
            // expect(expectedError).toThrowError('Argument cannot be null or undefined'); // deprecated toThrowError method
            expect(expectedError).toThrow('Argument cannot be null or undefined');
        })

        test('should thrown error on undefine string - arrow function', () => {
            expect(() => {
                sut.toUpperCase('')
            }).toThrow('Argument cannot be null or undefined');
        })

        test('should thrown error on undefine string - try catch block', (done) => {
            // this is not a good method, if an error is not thrown the test will pass, but it not guaranteed that the result value is correct
            // use fail/callback functions to ensure an error is thrown
            try {
                sut.toUpperCase('')
                // fail('GetStringInfo should thrown an error fort invalid arg!'); // jest bug fail is not defined
                 // use callback instead of fail
                done('GetStringInfo should thrown an error fort invalid arg!'); // this should never be hit for an invalid argument
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message', 'Argument cannot be null or undefined');
                done();
            }
        })

        test.todo('Use todo to build a skeleton for a test that is not yet implemented');

    });


    it('should retun uppercase of a valid string', () => { // use it.only to run only this block
        // arrange 
        const sut = toUpperCase;
        const expected = 'HALLO';

        // act
        const result = sut('Hallo');

        // asser
        expect(result).toBe(expected);
    })

    describe('ToUpperCase examples', () => { // use describe.only to run only this block
        it.each([
            { input: 'Hallo', expected: 'HALLO' },
            { input: 'Welt', expected: 'WELT' },
            { input: 'abc', expected: 'ABC' },
        ])('$input toUpperCase should be $expected', ({ input, expected }) => {
            // act
            const result = toUpperCase(input);

            // assert
            expect(result).toBe(expected);
        })
    });

    // not avery good way to do it, should have many tests for each expect block, see describe('getStringInfo for arg My-St{ring should')
    it('should return info for valid string', () => {
        // act
        const result = getStringInfo('New-String');

        // assert
        expect(result.lowercase).toBe('new-string'); // toBe for primitive types
        expect(result.extraInfo).toEqual({}); // toEqual for objects

        expect(result.characters.length).toBe(10);
        expect(result.characters).toHaveLength(10); // toHaveLength is cleaner for arrays

        expect(result.characters).toEqual(['N', 'e', 'w', '-', 'S', 't', 'r', 'i', 'n', 'g']);
        expect(result.characters).toContain('N');
        expect(result.characters).toContain<string>('N');
        expect(result.characters).toEqual(
            expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'N', 'e', 'w', '-']) // out of order array
        );

        expect(result.extraInfo).not.toBe(undefined);
        expect(result.extraInfo).not.toBeUndefined();
        expect(result.extraInfo).toBeDefined();
        expect(result.extraInfo).toBeTruthy();

    })
});

describe('getStringInfo for arg My-St{ring should', () => {

    // const result = getStringInfo('New-String'); // not a good practice, tests should be independent

    test('return right length', () => {
        const result = getStringInfo('New-String');

        expect(result.characters).toHaveLength(10);
    })

    test('return right lowercase', () => {
        const result = getStringInfo('New-String');

        expect(result.lowercase).toBe('new-string');
    })

    test('return right uppercase', () => {
        const result = getStringInfo('New-String');

        expect(result.uppercase).toBe('NEW-STRING');
    })

    test('return right characters', () => {
        const result = getStringInfo('New-String');

        expect(result.characters).toEqual(['N', 'e', 'w', '-', 'S', 't', 'r', 'i', 'n', 'g']);
    })

    test('return defined extraInfo', () => {
        const result = getStringInfo('New-String');

        expect(result.extraInfo).toBeDefined();
    })

    test('return right extraInfo', () => {
        const result = getStringInfo('New-String');

        expect(result.extraInfo).toEqual({});
    })

});