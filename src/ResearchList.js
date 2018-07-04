import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { DataService } from './services/Api'

const styles = theme => ({
  card: {
    width: 400,
    display: "inline-block"
  },
  media: {
    height: 215,
    paddingTop: 16, // 16:9
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
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    width: 360,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
} 

class ResearchList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: [],
      newDescription: "",
      newName: "",
      newImageUrl: "",
      openSnack: false
    };

    this.loadItems();
  }

  handleChangeDescription = (event) => {
    this.setState({ newDescription: event.target.value });
  }

  handleChangeName = (event) => {
    this.setState({ newName: event.target.value });
  }

  handleChangeImageUrl = (event) => {
    this.setState({ newImageUrl: event.target.value });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  loadItems = () => {
    fetch(`${DataService.researchApi}`)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        this.setState({ items: data });
      });
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  handleSave = () => {
    this.setState({ open: false, openSnack: true });
    // get the new item value
    let data = {
      "name": this.state.newName,
      "imageUrl": this.state.newImageUrl,
      "startDate": "2018-06-25T16:22:57.779Z",
      "endDate": "2018-09-25T16:22:57.779Z",
      "description": this.state.newDescription
    }

    this.setState({ newName: "", newDescription: "", newImageUrl: "" });    

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      }
    }

    fetch(DataService.researchApi, fetchData)
      .then(function (response) {
        return response.json();
      }).then((data) => {
        this.loadItems();
      });
  };

  removeItem = (itemId) => {
    fetch(DataService.researchApi + "/" + itemId, { method: 'DELETE'}).then(function (response) {
      return response.json();
    }).then((data) => {
      this.loadItems();
    });
  }

  render() {
    const { classes } = this.props;

    const researchListCarts = this.state.items.map((item) => {
      return (
        <Card className={classes.card} key={item.id}>
          <CardMedia
            className={classes.media}
            image={item.imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h3">
              {item.id} : {item.name}
            </Typography>
            <Typography component="p">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => this.removeItem(item.id)}>
              remove
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
              <Typography variant="title" color="inherit" className={classes.flex}> Create new research process </Typography>
                <Button color="inherit" onClick={this.handleSave}> save </Button>
            </Toolbar>
          </AppBar>
          <TextField required id="required" label="Research Name" className={classes.textField} margin="normal" onChange={this.handleChangeName} />
          <TextField required id="required" label="Image Url" className={classes.textField} margin="normal" onChange={this.handleChangeImageUrl} />
          <TextField required id="required" label="Research Description" className={classes.textField} margin="normal" onChange={this.handleChangeDescription} />
        </Dialog>

        {researchListCarts}
        <Snackbar
          open={this.state.openSnack}
          autoHideDuration={4000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'snackbar-fab-message-id',
            className: classes.snackbarContent,
          }}
          message={<span id="snackbar-fab-message-id">Archived</span>}
          action={
            <Button color="inherit" size="small" onClick={this.handleCloseSnack}>
              Undo
              </Button>
          }
          className={classes.snackbar}
        />        
      </div>
    );
  }
}

ResearchList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResearchList);