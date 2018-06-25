import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const styles = {
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  }
};


function Transition(props) {
  return <Slide direction="up" {...props} />;
} 

class ResearchList extends React.Component {

  url = 'http://localhost:3000/api/ResearchProcesses';

  

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: []
    };
    this.loadItems();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  loadItems = () => {
    fetch(this.url)
    .then(function (response) {
      return response.json();
    }).then( (data) => {
      console.log(data);
      this.setState({items: data});
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ open: false });
    // get the new item value
    let data = {
      "name": "Research Item 1",
      "startDate": "2018-06-25T16:22:57.779Z",
      "endDate": "2018-09-25T16:22:57.779Z",
      "description": "Research description"
    }

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }

    fetch(this.url, fetchData)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        // reload items
      });
  };

  render() {
    const { classes } = this.props;

    const itemsMap = this.state.items.map((item) => {
      return (
        <Card className={classes.card} >
          <CardMedia
            className={classes.media}
            image="/static/images/reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h3">
              {item.name}
            </Typography>
            <Typography component="p">
              {item.description}
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
        </Card>
      )
    });
    
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
              <Typography variant="title" color="inherit" className={classes.flex}> Sound </Typography>
                <Button color="inherit" onClick={this.handleSave}> save </Button>
            </Toolbar>
          </AppBar>
          <TextField required id="required" label="Research Name" className={classes.textField} margin="normal" />
          <TextField required id="required" label="Research Description" className={classes.textField} margin="normal" />
        </Dialog>

        {itemsMap}
        
      </div>
    );
  }
}

ResearchList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResearchList);