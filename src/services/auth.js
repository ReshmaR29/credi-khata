// Mock authentication service
const users = [
    {
      id: 1,
      name: 'Shop Owner',
      email: 'owner@example.com',
      password: 'password123',
      token: 'mock-token-123'
    }
  ];
  
  export const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          resolve({
            id: user.id,
            name: user.name,
            email: user.email,
            token: user.token
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };
  
  export const signup = async (name, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: users.length + 1,
          name,
          email,
          password,
          token: `mock-token-${users.length + 1}`
        };
        users.push(newUser);
        resolve({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          token: newUser.token
        });
      }, 500);
    });
  };