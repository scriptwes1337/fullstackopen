export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: String;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;