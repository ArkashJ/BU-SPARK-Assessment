import React, { useEffect, useState, ChangeEvent} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography } from "@mui/material";
import axios from 'axios';
import { GradeTable } from "./components/GradeTable";
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, MY_BU_ID} from "./globals";
import { IUniversityClass } from "./types/api_types";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("Choose Class");
  const [classList, setClassList] = useState<string[]>([]);
  const [fallSemester, setFallSemester] = useState<IUniversityClass[]>([])
  const [springSemester, setSpringSemester] = useState<IUniversityClass[]>([])
  const [classID, setClassID] = useState<string>("")
  // const [summerSemester, setSummerSemester] = useState<IUniversityClass[]>([])

  // const classList : string[] = []
  const classNameStr : IUniversityClass[] = []

  const config = {
    headers: {
      'x-functions-key':  'fKZTwhwT1DV64q_JzG6sYoShfq-cJbPwBgjIMOImYSTiAzFuv4-H5g=='
    }
  }

  const fetchData = async() => {
    const [fall, spring] = await Promise.all([
        axios.get(`${BASE_API_URL}/class/listBySemester/fall2022?buid=${MY_BU_ID}`, config ),
        axios.get(`${BASE_API_URL}/class/listBySemester/spring2023?buid=${MY_BU_ID}`, config),
        // axios.get(`${BASE_API_URL}/class/listBySemester/summer2023?buid=${MY_BU_ID}`, config),
    ]);

    setFallSemester(fall.data);
    setSpringSemester(spring.data);
    // setSummerSemester(summer.data);
  };

  useEffect(() => {
      fetchData()
  }, [classID]);

  fallSemester.map(
    data => {
      if(data.classId){
        classList.push(data.classId)
      }
      if(data){
        classNameStr.push(data)
      }
    })


  springSemester.map(
    data => {
      if(data.classId){
        classList.push(data.classId)
      }
      if(data.title){
        classNameStr.push(data)
      }
    }
  )

  const handleChange = (event: SelectChangeEvent) => {
    setClassID(event.target.value as string)
    // setCurrClassId(event.target.value as string);
    // const selectedClass = classNameStr.find(c => c.title === event.target.value);
    // if (selectedClass && selectedClass.classId) {
    //   setClassID(selectedClass.classId);
    // }
  };

  //call the list by semester function make three arrays, append them to each other,
  //display the class options under select a class by using the map function
  //on click, pass as a prop to the gradetable class,
  //populate the gradetable , use classid to find the weight and student id to get their grade to find the final grade


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <Select fullWidth={true} label="Class" value = {classID} onChange={handleChange} >
              {
                classNameStr.map((classes) => (
                  <MenuItem 
                    key   ={classes.title}
                    value ={classes.classId}
                  >{classes.title}</MenuItem>
                ))
              }
            </Select>
          </div>
        </Grid>

        {
          classID ? 
    
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <div><GradeTable classID={classID} className={currClassId}/></div>
        </Grid> 

        : null
  }
      </Grid>
    </div>
  );
  
}

export default App;
