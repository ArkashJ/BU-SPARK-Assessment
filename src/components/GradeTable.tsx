import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
//import { makeStyles, createStyles, Theme } from '@mui/styles';
//import { makeStyles,  } from '@mui/styles';
import { IUniversityClass, IAssignment, IGrades, IStudent, GridValueGetterParams, IFinalData, IfinalDisplay } from '../types/api_types';
import axios from 'axios';
import { BASE_API_URL, MY_BU_ID } from '../globals';
import {getAllClassData } from '../utils/calculate_grade'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


export const GradeTable = (props : any) => {
  //defining the state variables for each of the columns
  const [students,  setStudents]   = useState<IStudent[]>([])
  const [assignment,setAssignment] = useState<IAssignment[]>([])
  const [semester,  setSemester]   = useState<IUniversityClass[]>([])
  const [studentInfo, setStudentInfo] = useState<IFinalData[]>([])
  // const [row, setRow] = useState<any>([])
  
  useEffect(() => {
    getAllClassData(props.classID).then((response) => setStudentInfo(response))
  },[props.classID])
  
  let row : any = []
  studentInfo.map((data: IFinalData) => {
    row.push(
      {
        studentId: data.studentId,
        name: data.name,
        classId: data.classId,
        finalGrade : data.finalGrade,
      }
    )
  }) 

  return (
    <div>
      <div >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}>{col.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row :any, index: number) => (
            <TableRow key={index}>
              {columns.map((col, index) => (
                <TableCell key={index}>{row[col.field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  )

  

  
};



{/* <DataGrid
        rows={row}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[25, 50, 100]}
      />  */}
{/* */}

const columns: GridColDef[] = [
  { 
    field     : 'studentId',
    headerName: 'Student ID', 
    width     :  70, 
  },
  { 
    field     : 'name', 
    headerName: 'Student Name', 
    width     :  130 
  },
  { 
    field     : 'classId', 
    headerName: 'Class ID', 
    width     :  130 
  },
  // {
  //   field     : 'ClassName',
  //   headerName: 'Class Name',
  //   type      : 'number',
  //   width     :  90,
  // },
  // {
  //   field       : 'Semester',
  //   headerName  : 'Semester',
  //   width       :  160,
  // },
  {
    field     : 'finalGrade',
    headerName: 'Final Grades',
    type      : 'number',
    width     :  90,
  },
];

