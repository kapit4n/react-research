import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  card: {
    width: 400,
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

function EditResearchItem(props) {
  return (
    <Dialog
      fullScreen
      open={props.openEdit}
      onClose={props.handleCloseEdit}
      TransitionComponent={props.Transition}
    >
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={props.handleCloseEdit}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            color="inherit"
            className={props.classes.flex}
          >
            {" "}
            Edit research process{" "}
          </Typography>
          <Button color="inherit" onClick={props.handleUpdate}>
            {" "}
            Save{" "}
          </Button>
        </Toolbar>
      </AppBar>
      <TextField
        required
        id="required"
        label="Research Name"
        className={props.classes.textField}
        margin="normal"
        value={props.editItem.name}
        onChange={props.handleChangeName}
      />
      <TextField
        required
        id="required"
        label="Image Url"
        className={props.classes.textField}
        value={props.editItem.imageUrl}
        margin="normal"
        onChange={props.handleChangeImageUrl}
      />
      <TextField
        required
        id="required"
        label="Research Description"
        className={props.classes.textField}
        value={props.editItem.description}
        margin="normal"
        onChange={props.handleChangeDescription}
        multiline={true}
        rows={5}
      />
    </Dialog>
  );
}

export default withStyles(styles)(EditResearchItem);
