import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApplianceList from './components/ApplianceList';
import NewAppliance from './components/NewAppliance';
import ApplianceSearch from './components/ApplianceSearch';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  makeStyles,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    marginLeft: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();
  const [searchFilters, setSearchFilters] = useState({});

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Appliance Management</Typography>
            <Link to="/" className={classes.navLink}>
              Appliance List
            </Link>
            <Link to="/new" className={classes.navLink}>
              Add New Appliance
            </Link>
            <Link to="/search" className={classes.navLink}>
              Search Appliances
            </Link>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" className={classes.container}>
          <Paper className={classes.paper}>
            <Routes>
              <Route path="/" element={<ApplianceList searchFilters={searchFilters} />} />
              <Route path="/new" element={<NewAppliance />} />
              <Route path="/search" element={<ApplianceSearch onSearch={handleSearch} />} />
            </Routes>
          </Paper>
        </Container>
      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default App;
