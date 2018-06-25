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
    maxWidth: 345,
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
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.setState({ open: false });
    // Make the request here
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
            <Typography variant="title" color="inherit" className={classes.flex}> Sound </Typography>
              <Button color="inherit" onClick={this.handleSave}> save </Button>
          </Toolbar>
        </AppBar>

        <TextField required id="required" label="Research Name" className={classes.textField} margin="normal" />
        <TextField required id="required" label="Research Description" className={classes.textField} margin="normal" />

      </Dialog>

      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/static/images/reptile.jpg"
          title="Contemplative Reptile"
          />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Reseach that discovers the reptile types
            on bolivia.
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


      </div>
    );
  }
}

ResearchList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResearchList);