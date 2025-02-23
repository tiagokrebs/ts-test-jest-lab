import { toUpperCase } from "../Utils";

export enum PasswordErrors {
    SHORT = "Password is too short",
    NO_UPPERCASE = "Password does not contain an uppercase letter",
    NO_LOWERCASE = "Password does not contain a lowercase letter",
    NO_NUMBER = "Password does not contain a number"
}

export interface CheckResult {
    valid: boolean;
    reasons: PasswordErrors[];
}

export class PasswordChecker {
    // Password is invalid if
    // 1. length < 8
    // 2. does not contain a uppercase letter
    // 3. does not contain a lowercase letter
    // 4. Second iteration. The reason why the password is invalid should be returned
    // 5. Third iteration. Admin password should contain a number

    public checkPassword(password: string): CheckResult {
        const reasons: PasswordErrors[] = [];

        this.checkForLength(password, reasons);
        this.checkForUpperCase(password, reasons);
        this.checkForLowerCase(password, reasons);
        
        return {
            valid: reasons.length > 0 ? false : true,
            reasons: reasons
        }
    }

    public checkAdminPassword(password: string): CheckResult {
        const baseCheck = this.checkPassword(password);
        this.checkForNumber(password, baseCheck.reasons);
        
        return {
            valid: baseCheck.reasons.length > 0 ? false : true,
            reasons: baseCheck.reasons
        }
    }

    private checkForLength(password: string, reasons: PasswordErrors[]) {
        if (password.length < 8) {
            reasons.push(PasswordErrors.SHORT);
        }
    }

    private checkForUpperCase(password: string, reasons: PasswordErrors[]) {
        if (password == password.toLowerCase()) {
            reasons.push(PasswordErrors.NO_UPPERCASE);
        }
    }

    private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
        if (password == password.toUpperCase()) {
            reasons.push(PasswordErrors.NO_LOWERCASE);
        }
    }

    private checkForNumber(password: string, reasons: PasswordErrors[]) {
        const hasNumber = /\d/.test(password);
        if (!hasNumber) {
            reasons.push(PasswordErrors.NO_NUMBER);
        }
    }

}