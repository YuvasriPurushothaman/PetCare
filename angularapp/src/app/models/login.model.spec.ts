import { Login } from "./login.model";

describe('Login', () => {
  let login: Login;

  beforeEach(() => {
    // Create a new instance of the Login class before each test
    login = new Login();
  });

  fit('Frontend_should allow setting email and password values', () => {
    // Set values for email and password
    (login as any).email = 'test@example.com';
    (login as any).password = 'password123';

    // Check that the values were set correctly
    expect((login as any).email).toBe('test@example.com');
    expect((login as any).password).toBe('password123');
  });
});
