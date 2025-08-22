import { Appointment } from "./appointment.model";

describe('Appointment Interface', () => {
  let appointment: Appointment;

  beforeEach(() => {
    // Set up a sample Appointment object before each test
    appointment = {
      appointmentId: 1,
      petId: 101,
      appointmentDate: '2024-10-05',
      reason: 'Routine Checkup',
      userId: 202,
      status: 'Confirmed'
    };
  });

  fit('Frontend_should create a valid Appointment object', () => {
    // Check if the appointment object is created and valid
    expect(appointment).toBeTruthy();
    expect(appointment.appointmentId).toBe(1);
    expect(appointment.petId).toBe(101);
    expect(appointment.appointmentDate).toBe('2024-10-05');
    expect(appointment.reason).toBe('Routine Checkup');
    expect(appointment.userId).toBe(202);
    expect(appointment.status).toBe('Confirmed');
  });
});
