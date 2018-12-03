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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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

function EditGoalItem(props) {
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
            variant="title"
            color="inherit"
            className={props.classes.flex}
          >
            {" "}
            Update Goal{" "}
          </Typography>
          <Button color="inherit" onClick={props.handleUpdate}>
            {" "}
            save{" "}
          </Button>
        </Toolbar>
      </AppBar>
      <FormControl className={props.classes.formControl}>
        <InputLabel htmlFor="research-native-simple">Research</InputLabel>
        <Select
          native
          value={props.researchId}
          onChange={props.handleSelectChange("researchId")}
          inputProps={{ name: "researchId", id: "research-native-simple" }}
        >
          <option value="" />
          {props.researchList.map(data => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <TextField
        required
        id="required"
        label="Goal Name"
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
        label="Goal Description"
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

export default withStyles(styles)(EditGoalItem);
