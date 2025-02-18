const API_URL = 'https://gorest.co.in/public/v2';
const API_TOKEN = 'dbec8972d445162afab3d263b1ab881952227b226fa3cf0744043fec3483e02a';

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
};

export const getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users.');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
};

export const createUser = async (email, name, gender, status) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, name, gender, status })
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                throw new Error(data?.message || 'Email is already registered or data is invalid.');
            }
            throw new Error('Failed to create user.');
        }

        return data;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error;
    }
};

export const checkLogin = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/users?email=${email}`, {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            throw new Error('Failed to check login.');
        }

        const users = await response.json();

        console.log('Users found:', users);

        if (users.length === 0) {
            throw new Error('Email not found.');
        }

        const user = users[0];

        const expectedPassword = user.name.split(" ").slice(-1)[0] + "123*";

        if (password === expectedPassword) {
            return user;
        } else {
            throw new Error('Invalid password.');
        }
    } catch (error) {
        console.error('Error checking login:', error.message);
        throw error;
    }
};

export const updateUser = async (userId, email, name, gender, status) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ email, name, gender, status })
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                throw new Error(data?.message || 'Email is already registered or data is invalid.');
            }
            throw new Error('Failed to update user.');
        }

        return data;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: headers
        });
  
        let data = null;
        try {
            data = await response.json();
        } catch (error) {
            data = null;
        }
    
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('User not found.');
            } else if (response.status === 422) {
                throw new Error(data?.message || 'Invalid request.');
            }
            throw new Error('Failed to delete user.');
        }
    
        return data || { message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error.message);
        throw error;
    }
};