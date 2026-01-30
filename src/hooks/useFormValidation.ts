import { useState, useMemo, useCallback } from 'react';

// Tipe untuk state form
interface FormState {
    [key: string]: any;
}

interface ValidationRules {
    [key: string]: (value: any) => string | null; // return error message or null
}

export const useFormValidation = <T extends FormState>(initialState: T) => {
    const [values, setValues] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isTouched, setIsTouched] = useState<Partial<Record<keyof T, boolean>>>({});

    // Handler untuk perubahan input
    // useCallback agar fungsi ini tidak dibuat ulang setiap render
    const handleChange = useCallback((name: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
        // Clear error saat user mengetik ulang
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    // Handler saat input kehilangan fokus (onBlur)
    const handleBlur = useCallback((name: keyof T) => {
        setIsTouched(prev => ({ ...prev, [name]: true }));
    }, []);

    // Validasi manual
    const validate = useCallback((rules: ValidationRules): boolean => {
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        Object.keys(rules).forEach((key) => {
            const fieldKey = key as keyof T;
            const errorMessage = rules[key](values[fieldKey]);
            if (errorMessage) {
                newErrors[fieldKey] = errorMessage;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [values]);

    // Derived State: Password Strength Calculation using useMemo
    // Perhitungan hanya dijalankan jika `values.password` berubah
    const passwordStrength = useMemo(() => {
        const password = values['password'] as string;
        if (!password) return 0;

        let score = 0;
        if (password.length >= 6) score += 1;
        if (password.length >= 10) score += 1;
        if (/[A-Z]/.test(password)) score += 1; // Huruf besar
        if (/[0-9]/.test(password)) score += 1; // Angka
        if (/[^A-Za-z0-9]/.test(password)) score += 1; // Simbol

        return score; // 0-5
    }, [values['password']]); // Dependency array: hanya recalc jika password berubah

    return {
        values,
        errors,
        isTouched,
        handleChange,
        handleBlur,
        validate,
        passwordStrength, // Expose derived state
        setValues,
        setErrors
    };
};
