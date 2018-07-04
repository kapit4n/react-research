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


function CardCustom(props) {
  return props.items.map((item) => {
    return (
      <Card className={props.classes.card} key={item.id}>
        <CardMedia
          className={props.classes.media}
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
          <Button size="small" color="primary" onClick={() => props.removeItem(item.id)}>
            remove
            </Button>
          <Button size="small" color="primary">
            Open
            </Button>
        </CardActions>
      </Card>
    )
  });
}

export default CardCustom;