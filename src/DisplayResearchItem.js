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
import CardCustom from "./CardCustom";

const styles = theme => ({
  cardContain: {
    width: "100%",
    display: "inline-block"
  },
  card: {
    width: "30%",
    display: "inline-block"
  },

  media: {
    height: 100,
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
  let goalListCards: CardCustom;

  if (props.displayItem.researchGoals) {
    goalListCards = props.displayItem.researchGoals.map(item => (
      <CardCustom
        key={item.id}
        item={item}
        classes={props.classes}
        removeItem={props.removeItem}
        chips={[item.name]}
      />
    ));
  }

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
      <div>

      <Card className={props.classes.cardContain} key={props.displayItem.id}>
        <CardMedia
          className={props.classes.media}
          image={props.displayItem.imageUrl}
          title="Contemplative Reptile"
          />
        <CardContent style={{height: 500}}>
          <Typography gutterBottom variant="headline" component="h3">
            {props.displayItem.name}
          </Typography>
          <Typography component="p">{props.displayItem.description}</Typography>
          <div style={{height: 400, overflow:'scroll'}}>
            {goalListCards}
          </div>
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
      </div>
    </Dialog>
  );
}

export default withStyles(styles)(DisplayResearchItem);
