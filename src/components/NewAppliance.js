import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, makeStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
  },
}));

const NewAppliance = ({ onApplianceAdded }) => {
  const classes = useStyles();
  const [serialNumber, setSerialNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [dateBought, setDateBought] = useState(null); // Initialize dateBought as null

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to add a new appliance to the backend API
    axios.post('https://44.202.138.177:8090/appliance', { serialNumber, brand, model, dateBought })
      .then((response) => {
        console.log('Appliance added successfully:', response.data);
        // Clear form fields after successful addition
        setSerialNumber('');
        setBrand('');
        setModel('');
        setDateBought(null); // Reset the dateBought state
        // Notify parent component about the new appliance added
        onApplianceAdded();
      })
      .catch((error) => console.error('Error adding appliance:', error));
  };


  return (
    <Container component={Paper} className={classes.paper}>
      <Typography variant="h5" gutterBottom>Add New Appliance</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Serial Number"
          name="serialNumber"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
        <TextField
          label="Brand"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <TextField
          label="Model"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <TextField
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <TextField
          label="DD/MM/YYYY"
          type="text"
          value={dateBought}
          onChange={(e) => setDateBought(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">Add Appliance</Button>
      </form>
    </Container>
  );
};

export default NewAppliance;
