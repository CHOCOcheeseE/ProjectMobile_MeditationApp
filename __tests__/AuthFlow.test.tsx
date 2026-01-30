import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../src/screens/Auth/SignUpScreen';

// Mock dependencies
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Icon' }));
jest.mock('../src/context/ThemeContext', () => ({
    useTheme: () => ({ theme: { background: '#fff', text: '#000', primary: 'blue' } }),
}));

// Mock Custom Components simple implementation
jest.mock('../src/components/common/CustomButton', () => {
    const { TouchableOpacity, Text } = require('react-native');
    return ({ onPress, title }: any) => (
        <TouchableOpacity onPress={onPress} testID="custom-button">
            <Text>{title}</Text>
        </TouchableOpacity>
    );
});

jest.mock('../src/components/common/CustomTextInput', () => {
    const { TextInput } = require('react-native');
    return (props: any) => (
        <TextInput {...props} testID={props.placeholder} />
    );
});


// Mock AuthContext
const mockSignUp = jest.fn().mockResolvedValue(true);
jest.mock('../src/context/AuthContext', () => ({
    useAuth: () => ({
        signUp: mockSignUp,
        signInWithGoogle: jest.fn(),
        isLoading: false,
        error: null,
    }),
}));

// Mock Navigation
const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };

describe('Auth Flow Integration Test', () => {
    it('validates form and calls signUp on valid submission', async () => {
        const { getByTestId, getByText } = render(
            <SignUpScreen navigation={mockNavigation as any} route={{} as any} />
        );

        // 1. Fill Form
        // Using testID from mocked component or placeholder
        fireEvent.changeText(getByTestId('Name'), 'Test User');
        fireEvent.changeText(getByTestId('Email address'), 'test@example.com');
        // Strong password to pass validation
        fireEvent.changeText(getByTestId('Password'), 'StrongP@ss1');

        // 2. Press Submit
        fireEvent.press(getByTestId('custom-button'));

        // 3. Verify signUp called
        await waitFor(() => {
            expect(mockSignUp).toHaveBeenCalledWith(
                'Test User',
                'test@example.com',
                'StrongP@ss1'
            );
        });
    });
});
