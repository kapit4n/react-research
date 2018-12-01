import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
  card: {
    width: "100%",
    display: "inline-block"
  },
  media: {
    height: 215,
    paddingTop: 16 // 16:9
  },
  fab: {
    position: "absolute",
    top: 65,
    left: 245
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  textField: {
    marginLeft: 10,
    marginRight: 10,
    width: "100%"
  },
  snackbar: {
    position: "absolute"
  },
  snackbarContent: {
    width: 360
  }
});

function DisplayResearchItem(props) {
  return (
    <Dialog
      fullScreen
      open={props.openDisplay}
      onClose={props.handleCloseDisplay}
      TransitionComponent={props.Transition}
    >
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={props.handleCloseDisplay}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={props.classes.flex}
          >
            {" "}
            Display research process{" "}
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className={props.classes.card} key={props.displayItem.id}>
        <CardMedia
          className={props.classes.media}
          image={props.displayItem.imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h3">
            {props.displayItem.name}
          </Typography>
          <Typography component="p">{props.displayItem.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => props.removeItem(props.displayItem.id)}
          >
            remove
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={() => props.handleClickOpenEdit(props.displayItem)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}

export default withStyles(styles)(DisplayResearchItem);
