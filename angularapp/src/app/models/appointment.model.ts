export interface Appointment{
    pet?: any;
    user?: any;
    appointmentId?:number,
    petId:number,
    appointmentDate:string,
    reason:string,
    userId:number,
    status:string,
    hasFeedback?: boolean
}