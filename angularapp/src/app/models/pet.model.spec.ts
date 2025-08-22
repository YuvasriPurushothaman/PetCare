import { Pet } from "./pet.model";

describe('Pet Interface', () => {
  let pet: Pet;

  beforeEach(() => {
    // Set up a sample Pet object before each test
    pet = {
      petId: 1,
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      dateOfBirth: '2020-03-15',
      userId: 101,
      status: 'Active'
    };
  });

  fit('Frontend_should create a valid Pet object', () => {
    // Check if the pet object is created and valid
    expect(pet).toBeTruthy();
    expect(pet.petId).toBe(1);
    expect(pet.name).toBe('Buddy');
    expect(pet.species).toBe('Dog');
    expect(pet.breed).toBe('Golden Retriever');
    expect(pet.dateOfBirth).toBe('2020-03-15');
    expect(pet.userId).toBe(101);
    expect(pet.status).toBe('Active');
  });
});
