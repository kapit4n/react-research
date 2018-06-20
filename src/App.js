import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import { Switch, Route } from 'react-router-dom'
import ResearchList from './ResearchList'

function GoalsList(props) {
  return <h1>GoalsList,</h1>;
}

function StepsList(props) {
  return <h1>StepsList,</h1>;
}

function ResultsList(props) {
  return <h1>StepsList,</h1>;
}

function FeedbacksList(props) {
  return <h1>Feedback list,</h1>;
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

function App(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Research Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path='/research-list' component={ResearchList}/>
          <Route path='/goals-list' component={GoalsList}/>
          <Route path='/steps-list' component={StepsList}/>
          <Route path='/results-list' component={ResultsList}/>
          <Route path='/feedbacks-list' component={FeedbacksList}/>
        </Switch>
      </main>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);