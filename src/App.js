import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ApplianceList from './components/ApplianceList';
import NewAppliance from './components/NewAppliance';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  makeStyles,
  Link as MuiLink,
  Grid,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    marginBottom: theme.spacing(2),
    background: theme.palette.primary.main, // Changing the primary color to green
  },
  headerTitle: {
    flexGrow: 1,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },
  link: {
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main, // Changing the link color to orange
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  mainContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className={classes.root}>
          <AppBar position="static" className={classes.header}>
            <Container maxWidth="lg">
              <Toolbar>
                <Typography variant="h6" className={classes.headerTitle}>
                  Appliance Management App
                </Typography>
                <MuiLink component={Link} to="/" color="inherit" className={classes.link}>
                  Appliance Lists
                </MuiLink>
                <MuiLink component={Link} to="/new" color="inherit" className={classes.link}>
                  Add New Appliances
                </MuiLink>
              </Toolbar>
            </Container>
          </AppBar>

          <Container maxWidth="lg" className={classes.mainContent}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Routes>
                  <Route path="/" element={<ApplianceList />} />
                  <Route path="/new" element={<NewAppliance />} />
                </Routes>
              </Grid>
            </Grid>
          </Container>

          <footer>
            <Container maxWidth="lg">
              <Typography variant="body2" align="center" color="textSecondary">
                © {new Date().getFullYear()} Appliance Management App. All rights reserved.
              </Typography>
            </Container>
          </footer>
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default App;
