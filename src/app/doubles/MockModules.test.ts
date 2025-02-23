
// to mock all module
// jest.mock('../../app/doubles/OtherUtils')

// to mock module partially add a factory implementation
jest.mock('../../app/doubles/OtherUtils', () => ({
    ...jest.requireActual('../../app/doubles/OtherUtils'), // preserve actual module
    calculateComplexity: () => {return 10} // always mock calculateComplexity function response
}));

// mock whole uuid module
jest.mock('uuid', () => ({
    v4: () => {return '048b68de-5705-4eb2-aef9-38aac4190cf8'}
}));

import * as OtherUtils from '../../app/doubles/OtherUtils';

describe('module tests', () => {

    test('calculate complexity', () => {
        const result = OtherUtils.calculateComplexity({} as any);
        expect(result).toBe(10);
    });

    test('keep other functions', () => {
        const result = OtherUtils.toUpperCase('abc');
        expect(result).toBe('ABC');
    });

    test('string with id', () => {
        const result = OtherUtils.toLowerCaseWithId('ABC');
        expect(result).toBe('abc048b68de-5705-4eb2-aef9-38aac4190cf8');
    });

});