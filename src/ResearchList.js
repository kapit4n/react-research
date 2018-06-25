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
  }
};

function ResearchList(props) {
  const { classes } = props;
  return (
    <div>

      <Button variant="fab" className={classes.fab} color='primary'>
        <AddIcon />
      </Button>

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

ResearchList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResearchList);