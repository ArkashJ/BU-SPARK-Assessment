/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */
export interface IUniversityClass {
  classId?         : string;
  title?           : string;
  description?     : string;
  meetingTime?     : string;
  meetingLocation? : string;
  status?          : string;
  semester?        : string;
}
// represents assignment returned by the API
export interface IAssignment {
  assignmentId? : string;
  classID?	    : string;
  date?         : string;
  weight?       : number;
}
// represents student information
export interface IStudent {
  dateEnrolled?  : string;
  name           : string; // name is required 
  status?        : string; 
  universityId   : string; // university id is required 
}
// represents grades
export interface IGrades {
  classId?     : string;
  name?        : string;
  studentId?   : string;
  grades?      : {[key: string]: string}; //set it up as key value pairs
}

export interface IfinalDisplay {
  StudentID: string;
  StudentName: string;
  ClassID: string;
  FinalGrades: number;
}


export interface IFinalData {
  classId?     : string;
  finalGrade?  : number;
  studentId?   : string;
  name?        : string;
  grades?      : number[]; //set it up as key value pairs
}


export interface GridValueGetterParams<T>{
  data         : T
}