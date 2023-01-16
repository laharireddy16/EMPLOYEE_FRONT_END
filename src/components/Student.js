import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Employee() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[role,setRole]=useState('')
    const[email,setEmail]=useState('')
    const[employee,setEmployee]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const employee={name,role,email}
    console.log(employee)
    fetch("http://localhost:8080/employee/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(employee)

  }).then(()=>{
    console.log("New employee added")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/employee/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setEmployee(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Employee</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="employee Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="employee role" variant="outlined" fullWidth
      value={role}
      onChange={(e)=>setRole(e.target.value)}
      />
      <TextField id="outlined-basic" label="employee email" variant="outlined" fullWidth
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Employee</h1>

    <Paper elevation={3} style={paperStyle}>

      {employee.map(employee=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={employee.id}>
         Id:{employee.id}<br/>
         Name:{employee.name}<br/>
         Role:{employee.role}
         Email:{employee.email}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}
