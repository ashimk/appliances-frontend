import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, Typography, Container, Paper, makeStyles } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  // ... Your styles ...
}));

const ApplianceList = () => {
  const classes = useStyles();
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    // Fetch the list of appliances from the backend API
    axios.get('https://6hxx73ulo2.execute-api.us-east-1.amazonaws.com/prod', {'Access-Control-Allow-Origin': '*'})
      .then((response) => setAppliances(response.data["body-json"]["data"]))
      .catch((error) => console.error('Error fetching appliances:', error));
      console.log("appliances", appliances)
  }, []);

  const handleDelete = (serialNumber, brand, model) => {
    // Send a DELETE request to the backend API to delete the appliance
    axios.delete('https://3.94.210.15:8010/delete', {
      data: {
        serial_number: serialNumber,
        brand: brand,
        model: model,
      },
    })
      .then((response) => {
        console.log('Appliance deleted successfully:', response.data);
        // After deletion, refresh the appliance list
        axios.get('https://6hxx73ulo2.execute-api.us-east-1.amazonaws.com/prod')
          .then((response) => setAppliances(response.data["body-json"]["data"]))
          .catch((error) => console.error('Error fetching appliances:', error));
      })
      .catch((error) => console.error('Error deleting appliance:', error));
  };

  return (
    <Container component={Paper} className={classes.paper}>
      <Typography variant="h5">Appliance List</Typography>
      <List>
        {appliances && appliances.map((appliance) => (
          <ListItem key={appliance.id}>
            <ListItemText
              primary={`${appliance.brand} - ${appliance.model}`}
              secondary={`Status: ${appliance.status}, Date Bought: ${appliance.date_bought}`}
            />
            <Button variant="contained" color="secondary" onClick={() => handleDelete(appliance.serial_number, appliance.brand, appliance.model)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ApplianceList;
