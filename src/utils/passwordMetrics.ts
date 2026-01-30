/**
 * Menghitung skor kekuatan password.
 * 0: Empty
 * 1: Very Weak
 * 2: Weak
 * 3: Fair
 * 4: Good
 * 5: Strong
 */
export const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;

    let score = 0;
    // Length checks
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1; // Bonus for length

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1; // Uppercase
    if (/[0-9]/.test(password)) score += 1; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Symbols

    return score;
};

export const getPasswordStrengthLabel = (score: number): string => {
    switch (score) {
        case 0: return '';
        case 1: return 'Very Weak';
        case 2: return 'Weak';
        case 3: return 'Fair'; // Medium
        case 4: return 'Good';
        case 5: return 'Strong';
        default: return 'Weak';
    }
};
