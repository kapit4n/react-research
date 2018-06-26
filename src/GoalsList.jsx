import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = {
  card: {
    maxWidth: '80%',
  },
  media: {
    height: 100,
    paddingTop: 0, // 16:9
  },
  fab: {
    position: 'absolute',
    top: 65,
    left: 245,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: '80%',
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 10,
  },
  chip: {
    margin: 10,
  }
  
};


function Transition(props) {
  return <Slide direction="up" {...props} />;
} 


class GoalsList extends React.Component {

  researchProcessApi = 'http://localhost:3000/api/ResearchProcesses';
  researchGoalApi = 'http://localhost:3000/api/ResearchGoals';
  filterIncludeResearch = "filter[include]=researchProcess";

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      researchList: [],
      goalList: [],
      newDescription: "",
      newName: "",
      research: ""
    };
    this.loadResearchList();
    this.loadGoalList();
  }

  // load all values
  loadResearchList = () => {
    // load research list
    fetch(this.researchProcessApi)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        this.setState({ researchList: data });
      });
  }

  // load all values
  loadGoalList = () => {
    fetch(`${this.researchGoalApi}/?${this.filterIncludeResearch}`)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        this.setState({ goalList: data });
      });
  }

  handleChangeDescription = (event) => {
    this.setState({ newDescription: event.target.value });
  }

  handleChangeName = (event) => {
    this.setState({ newName: event.target.value });
  }

  handleSelectChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ open: false });
    // get the new item value
    let data = {
      "researchProcessId": this.state.research,
      "name": this.state.newName,
      "description": this.state.newDescription
    }

    this.setState({ newName: "", newDescription: "" });

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }

    fetch(this.researchGoalApi, fetchData)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        console.log(data);
        this.loadGoalList();
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="fab" className={classes.fab} color='primary' onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}> Create new Goal </Typography>
              <Button color="inherit" onClick={this.handleSave}> save </Button>
            </Toolbar>
          </AppBar>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="research-native-simple">Research</InputLabel>
            <Select
              native
              value={this.state.reseachId}
              onChange={this.handleSelectChange('research')}
              inputProps={{
                name: 'research',
                id: 'research-native-simple',
              }}
            >
              <option value="" />
              {this.state.researchList.map(data => <option value={data.id}>{data.name}</option>)}
            </Select>
          </FormControl>
          <TextField required id="required" label="Research Name" className={classes.textField} margin="normal" onChange={this.handleChangeName} />
          <TextField required id="required" label="Research Description" className={classes.textField} margin="normal" onChange={this.handleChangeDescription} />
        </Dialog>

        {this.state.goalList.map(data => (<Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image="/static/images/goal1.jpeg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {data.name}
            </Typography>
            <Typography component="p">
              {data.description}
              <Chip label={data.researchProcess.name} className={classes.chip} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Like
            </Button>
            <Button size="small" color="primary">
              Open
            </Button>
          </CardActions>
        </Card>)
      )}
      </div>
    );    
  }
}

GoalsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoalsList);