const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

export const userService = {
    getUsers: () => {
        return Promise.resolve(users);
    },

    getUser: (id) => {
        const user = users.find(u => u.id === parseInt(id));
        return Promise.resolve(user);
    },

    createUser: (userData) => {
        const newUser = {
            id: users.length + 1,
            ...userData
        };
        users.push(newUser);
        return Promise.resolve(newUser);
    },

    updateUser: (id, userData) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            return Promise.resolve(users[index]);
        }
        return Promise.reject(new Error('User not found'));
    },

    deleteUser: (id) => {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            users.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.reject(new Error('User not found'));
    }
};