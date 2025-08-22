import { User } from "./user.model"; 

describe('User Class', () => {
  let user: User;

  beforeEach(() => {
    // Set up a sample User object before each test
    user = {
      userId: 1,
      email: 'testuser@gmail.com',
      password: 'password123',
      username: 'testuser',
      mobileNumber: '1234567890',
      userRole: 'Admin'
    };
  });

  fit('Frontend_should create a valid User object', () => {
    // Check if the user object is created and valid
    expect(user).toBeTruthy();
    expect(user.userId).toBe(1);
    expect(user.email).toBe('testuser@gmail.com');
    expect(user.password).toBe('password123');
    expect(user.username).toBe('testuser');
    expect(user.mobileNumber).toBe('1234567890');
    expect(user.userRole).toBe('Admin');
  });
});
