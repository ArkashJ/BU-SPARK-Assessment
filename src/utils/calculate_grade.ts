/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { useEffect } from "react";
import { IUniversityClass, IAssignment, IFinalData } from "../types/api_types";
import axios from 'axios';
import { BASE_API_URL, MY_BU_ID, CONFIG} from '../globals';

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */

// this function will recieve information from the apis that return the class information from which we take the class ID
// and the function that will return the list of assignments, which has the weight of an assignment
// we will use class ID and student ID to find the students grades



/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns Some data structure that has a list of each student and their final grade.
 */
export async function calcAllFinalGrade(classID: string): Promise<undefined> {
  return undefined;
}


//find the sum of the student's grade
const calcGrade = (weights:any) => {
  let sum :number = 0;
  for (const vals of weights) {
    sum+=vals
  }
  return (Math.round(sum * 100) / 100).toFixed(2); //rounding to 2 decimal places
}
 
//get assignments information
const assignmentsInfo = async (currClassID : any) => {
let assignmentData : any[] = []

  await axios.get(`${BASE_API_URL}/class/listAssignments/${currClassID}?buid=${MY_BU_ID}`, CONFIG).then(response => {
    assignmentData = response.data
  })

  return assignmentData
}

export const getAllClassData = async (currClassId : any) => {
  let studentData: IFinalData[] = []
  let assignmentData = await assignmentsInfo(currClassId);
  return await axios.get(`${BASE_API_URL}/class/listStudents/${currClassId}?buid=${MY_BU_ID}`, CONFIG)
  .then((response) => {
    let items = response.data;
    return Promise.all(items.map((studentId:any) => {
        
      return axios.get(`${BASE_API_URL}/student/listGrades/${studentId}/${currClassId}/?buid=${MY_BU_ID}`, CONFIG)
          .then((response) => {

              let totalPoints:any[] =  [] 
              response.data.grades.map((grade:any) => {
                assignmentData.map(assignments => {
                  totalPoints.push(grade[assignments.assignmentId] * assignments.weight/100)
                })
              }) 
              
              response.data['finalGrade'] = calcGrade(totalPoints)
              studentData.push(response.data);
              return studentId
            })
     }))
  }).then(res => {
  return studentData  
  })
}


