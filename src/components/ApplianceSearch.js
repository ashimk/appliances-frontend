import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, makeStyles, List, ListItem, ListItemText } from '@material-ui/core';

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

const ApplianceSearch = ({ onSearch }) => {
  const classes = useStyles();
  const [serialNumber, setSerialNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [status, setStatus] = useState('');
  const [dateBought, setDateBought] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the search object with the provided filters
    const searchFilters = {
      serialNumber,
      brand,
      model,
      status,
      dateBought,
    };

    try {
      // Make the API call to search appliances
      const response = await axios.post('https://3.94.210.15:8010/search', { serial_number:serialNumber, brand, model, date_bought:dateBought,status ,

      });

      setSearchResults(response.data["data"]);

      console.log("Hello", response.data["data"])
      console.log("World", response.data)



      console.log("searchResults ",searchResults)

      // Pass the search results to the parent component's onSearch function
      onSearch(response.data);
    } catch (error) {
      console.error('Error searching appliances:', error);
      // You can also handle error messages here if needed
    }
  };

  return (
    <Container component={Paper} className={classes.paper}>
      <Typography variant="h5" gutterBottom>Search Appliances</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Serial Number"
          name="serialNumber"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
        <TextField
          label="Brand"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <TextField
          label="Model"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <TextField
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <TextField
          label="Date Bought"
          name="dateBought"
          value={dateBought}
          onChange={(e) => setDateBought(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </form>
      <List className={classes.resultList}>
        {searchResults && searchResults.map((appliance) => (
          <ListItem key={appliance.id}>
            <ListItemText primary={`${appliance.brand} - ${appliance.model}`} secondary={`Status: ${appliance.status}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ApplianceSearch;
