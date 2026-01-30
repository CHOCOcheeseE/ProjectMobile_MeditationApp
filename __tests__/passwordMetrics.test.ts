import { calculatePasswordStrength } from '../src/utils/passwordMetrics';

describe('Password Metrics Unit Test', () => {

    it('should return 0 for empty password', () => {
        expect(calculatePasswordStrength('')).toBe(0);
    });

    it('should return 1 for password length >= 6 (Weak)', () => {
        // "abcdef" -> length >= 6 (+1)
        expect(calculatePasswordStrength('abcdef')).toBe(1);
    });

    it('should score 3 for mixed case and numbers with length >= 6 (Fair)', () => {
        // "Abc12345" -> len>=6 (+1), Uppercase (+1), Number (+1)
        expect(calculatePasswordStrength('Abc12345')).toBe(3);
    });

    it('should score 5 for strong password (length >= 10, mixed, symbol)', () => {
        // "StrongP@ssw0rd" 
        // len>=6 (+1)
        // len>=10 (+1)
        // Upper (+1)
        // Number (+1)
        // Symbol (+1)
        expect(calculatePasswordStrength('StrongP@ssw0rd')).toBe(5);
    });
});
