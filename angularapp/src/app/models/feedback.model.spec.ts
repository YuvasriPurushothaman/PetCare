import { Feedback } from './feedback.model'; // Adjust the import path based on your file structure

describe('Feedback Interface', () => {
  let feedback: Feedback;

  beforeEach(() => {
    feedback = {
      message: 'Great service!',
      rating: 5,
    };
  });

  fit('Frontend_should pass the message and rating properties', () => {
    // Check if the message and rating properties are correctly set
    expect(feedback.message).toBe('Great service!');
    expect(feedback.rating).toBe(5);
  });


});
