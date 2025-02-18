import { ERROR_MESSAGES } from '@/utils/msg';
import { getUsers } from '@/services/api';

// Required Validation
export const validateRequired = (value) => {
    return value.trim() ? '' : ERROR_MESSAGES.REQUIRED;
};

// Email Format
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : ERROR_MESSAGES.INVALID_EMAIL;
};

// Only Letters Name
export const validateOnlyLetters = (value) => {
    const lettersRegex = /^[A-Za-z\s]+$/;
    return lettersRegex.test(value) ? '' : ERROR_MESSAGES.INVALID_NAME;
};

// Maximum Length Name
export const validateMaxLength = (value, maxLength) => {
    return value.length <= maxLength ? '' : ERROR_MESSAGES.MAX_LENGTH;
};

// Validasi Input Select
export const validateSelect = (value) => {
    return value ? '' : ERROR_MESSAGES.REQUIRED;
};

// Unique Email For Create
export const validateUniqueEmailCreate = async (email) => {
    try {
        const users = await getUsers();
        const emailExists = users.some(user => user.email === email);

        return emailExists ? ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED : '';
    } catch (error) {
        console.error('Error validating unique email:', error);
        return 'Error checking email uniqueness';
    }
};

// Unique Email For Update
export const validateUniqueEmailUpdate = async (email, currentUserId) => {
    try {
        const users = await getUsers();
        const emailExists = users.some(user => user.email === email && user.id !== currentUserId);

        return emailExists ? ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED : '';
    } catch (error) {
        console.error('Error validating unique email:', error);
        return 'Error checking email uniqueness';
    }
};