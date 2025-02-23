import { PasswordChecker, PasswordErrors } from "./PasswordChecker";


// TDD like this need to change core tests every time a requirement changes
// i.e. if a new requirement for special characters is added, we need to change all tests, not good
// i.e. a simple change like instead of 8 chars, we need 10 chars, te implementation is simple but we need to change all tests again
describe.skip('PasswordChecker test suite', () => {
    
    let sut: PasswordChecker; // sut = System Under Test

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', () => {
        const result = sut.checkPassword('1234567');

        expect(result.valid).toBe(false);
    });

    it('Password with more than 8 chars is valid', () => {
        // mocked value need to be long enough but whit uppercase too
        const result = sut.checkPassword('12345678Ab');

        expect(result.valid).toBe(true);
    });

    it('Password with no uppercase is invalid', () => {
        // mocked value need to be long enough but no uppercase
        const result = sut.checkPassword('1234abcd');

        expect(result.valid).toBe(false);
    });

    it('Password with uppercase is valid', () => {
        // mocked value need to be long enough but no uppercase
        const result = sut.checkPassword('1234abcD');

        expect(result.valid).toBe(true);
    });

    it('Password with no lowercase is invalid', () => {
        // mocked value need to be long enough but no lowercase
        const result = sut.checkPassword('1234ABCD');

        expect(result.valid).toBe(false);
    });

    it('Password with lowercase is valid', () => {
        // mocked value need to be long enough but no lowercase
        const result = sut.checkPassword('1234ABCd');

        expect(result.valid).toBe(true);
    });

});

// new requirement, need to return the reason why the password is invalid
// now each test doesn't need to fit all requirements but only the one it's testing
describe.skip('PasswordChecker test suite - second iteration', () => {
    
    let sut: PasswordChecker; // sut = System Under Test

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', () => {
        const result = sut.checkPassword('1234567');

        expect(result.valid).toBe(false);
        expect(result.reasons).toContain(PasswordErrors.SHORT);
    });

    it('Password with more than 8 chars is valid', () => {
        const result = sut.checkPassword('12345678');

        expect(result.reasons).not.toContain(PasswordErrors.SHORT);
    });

    it('Password with no uppercase is invalid', () => {
        const result = sut.checkPassword('abcd');

        expect(result.valid).toBe(false);
        expect(result.reasons).toContain(PasswordErrors.NO_UPPERCASE);
    });

    it('Password with uppercase is valid', () => {
        const result = sut.checkPassword('abcD');

        expect(result.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
    });

    it('Password with no lowercase is invalid', () => {
        const result = sut.checkPassword('ABCD');

        expect(result.valid).toBe(false);
        expect(result.reasons).toContain(PasswordErrors.NO_LOWERCASE);
    });

    it('Password with lowercase is valid', () => {
        const result = sut.checkPassword('ABCd');

        expect(result.reasons).not.toContain(PasswordErrors.NO_LOWERCASE);
    });

    // additional test to cover all cases (all tests above valid == false need one to be true)
    it('Password with lowercase is valid', () => {
        const result = sut.checkPassword('1234abcD');

        expect(result.reasons).toHaveLength(0);
        expect(result.valid).toBe(true);
    });

});

// new requirement, Admin passwords need to have a number
// current method showcase easiness of adding new requirements
describe('PasswordChecker test suite - third iteration', () => {
    
    let sut: PasswordChecker; // sut = System Under Test

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', () => {
        const result = sut.checkPassword('1234567');

        expect(result.valid).toBe(false);
        expect(result.reasons).toContain(PasswordErrors.SHORT);
    });

    it('Password with more than 8 chars is valid', () => {
        const result = sut.checkPassword('12345678');

        expect(result.reasons).not.toContain(PasswordErrors.SHORT);
    });

    it('Password with no uppercase is invalid', () => {
        const result = sut.checkPassword('abcd');

        expect(result.valid).toBe(false);
        expect(result.reasons).toContain(PasswordErrors.NO_UPPERCASE);
    });

    it('Password with uppercase is valid', () => {
        const result = sut.checkPassword('abcD');

        expect(result.reasons).not.toContain(PasswordErrors.NO_UPPERCASE);
    });

    it('Password with no lowercase is invalid', () => {
        const result = sut.checkPassword('ABCD');

        expect(result.valid).toBe(false);
        expect(result.reasons).toContain(PasswordErrors.NO_LOWERCASE);
    });

    it('Password with lowercase is valid', () => {
        const result = sut.checkPassword('ABCd');

        expect(result.reasons).not.toContain(PasswordErrors.NO_LOWERCASE);
    });

    it('Password with lowercase is valid', () => {
        const result = sut.checkPassword('1234abcD');

        expect(result.reasons).toHaveLength(0);
        expect(result.valid).toBe(true);
    });

    // additional tests for admin password
    it('Admins password with no number is invalid', () => {
        const result = sut.checkAdminPassword('abcdABCD');

        expect(result.reasons).toContain(PasswordErrors.NO_NUMBER);
        expect(result.valid).toBe(false);
    });

    it('Admins password with number is valid', () => {
        const result = sut.checkAdminPassword('abcdABCD7');

        expect(result.reasons).not.toContain(PasswordErrors.NO_NUMBER);
    });

});