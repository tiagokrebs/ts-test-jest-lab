import { calculateComplexity, OtherStringUtils, toUpperCaseWithCallback } from './OtherUtils';

// Stubs type of doubles == incomplete objects
// Fakes type of doubles == simplified working implementations
describe('OtherUtils test suite', () => {

    // Stubs
    test('calculates complexity', () => {
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: 'value1',
                field2: 'value2'
            }
        }

        const result = calculateComplexity(someInfo as any);

        expect(result).toBe(10);
    });

    // Fakes
    test('toUpperCase - calls callback for invalid argument', () => {
        const result = toUpperCaseWithCallback('', ()=>{}); // "()=>{}" is the Fake callback
        expect(result).toBeUndefined();
    });

    // This will returns as 100% coverage, but the the response for an undefined arg was not actually tested
    test('toUpperCase - calls callback for valid argument', () => {
        const result = toUpperCaseWithCallback('abc', ()=>{});
        expect(result).toBe('ABC');
    });

    // Mock
    describe('Tracking callbacks', () => {

        let cbArgs = [];
        let timesCalled = 0;

        function callBackMock(arg: string) {
            cbArgs.push(arg);
            timesCalled++;
        }

        // ensures timesCalled and cbArgs are reset before each test
        afterEach(() => {
            cbArgs = [];
            timesCalled = 0;
        });

        test('toUpperCase - calls callback for invalid argument - track calls', () => {
            const result = toUpperCaseWithCallback('', callBackMock);
            expect(result).toBeUndefined();
            expect(cbArgs).toContain('Invalid argument');
            expect(timesCalled).toBe(1);
        });

        test('toUpperCase - calls callback for valid argument - track calls', () => {
            const result = toUpperCaseWithCallback('abc', callBackMock);
            expect(result).toBe('ABC');
            expect(cbArgs).toContain('Called function with abc');
            expect(timesCalled).toBe(1);
        });

    });

    // Mock - better integration with Jest
    describe('Tracking callbacks with Jest Mocks', () => {

        const callBackMock = jest.fn();

        afterEach(() => {
            callBackMock.mockClear();
        });

        test('toUpperCase - calls callback for invalid argument - track calls', () => {
            const result = toUpperCaseWithCallback('', callBackMock);
            expect(result).toBeUndefined();
            expect(callBackMock).toHaveBeenCalledWith('Invalid argument');
            expect(callBackMock).toHaveBeenCalledTimes(1);
        });

        test('toUpperCase - calls callback for valid argument - track calls', () => {
            const result = toUpperCaseWithCallback('abc', callBackMock);
            expect(result).toBe('ABC');
            expect(callBackMock).toHaveBeenCalledWith('Called function with abc');
            expect(callBackMock).toHaveBeenCalledTimes(1);
        });

    });

    // Spy
    describe('Tracking console.log', () => {
        
        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });

        test('toUpperCase - use spy to track calls', () => {
            // spy on public method
            const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
            sut.toUpperCase('abc');
            expect(toUpperCaseSpy).toHaveBeenCalledWith('abc');
            expect(toUpperCaseSpy).toHaveReturnedWith('ABC');
            expect(toUpperCaseSpy).toHaveBeenCalledTimes(1);
        });

        test('logString - use spy to track other modules', () => {
            // spy on internal public method function
            const consoleLogSpy = jest.spyOn(console, 'log');
            sut.logString('abc');
            expect(consoleLogSpy).toHaveBeenCalledWith('abc');
        });

        test('callExternalService - use spy to replace the implementation of a private method', () => {
            // spy on private method and change its implementation
            // we should not call private methods directly on tests, this is an hack
            jest.spyOn(sut as any, 'callExternalService').mockImplementation(() => {
                console.log('Calling private mocked implementation :|');
            });
            (sut as any).callExternalService();
        });

        test('publicCallExternalService - use spy to replace the implementation of a public method', () => {
            // spy on public method and change its implementation
            jest.spyOn(sut, 'publicCallExternalService').mockImplementation(() => {
                console.log('Calling public mocked implementation :|');
            });
            sut.publicCallExternalService();
        });


    });

    // Mock modules



});