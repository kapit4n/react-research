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

import styles from "./styles";

function NewGoalItem(props) {
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={props.Transition}
      className={props.classes.dialog}
    >
      <AppBar className={props.classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={props.handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            color="inherit"
            className={props.classes.flex}
          >
            {" "}
            Create new Goal{" "}
          </Typography>
          <Button color="inherit" onClick={props.handleSave}>
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
        onChange={props.handleChangeName}
      />
      <TextField
        required
        id="required"
        label="Image Url"
        className={props.classes.textField}
        margin="normal"
        onChange={props.handleChangeImageUrl}
      />
      <TextField
        required
        id="required"
        label="Goal Description"
        className={props.classes.textField}
        margin="normal"
        onChange={props.handleChangeDescription}
        multiline={true}
        rows={5}
      />
    </Dialog>
  );
}

export default withStyles(styles)(NewGoalItem);
