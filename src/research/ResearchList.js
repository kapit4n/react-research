import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";
import { DataService } from "../services/Api";
import CardCustom from "../common/CardCustom";
import NewResearchItem from "./NewResearchItem";
import EditResearchItem from "./EditResearchItem";
import DisplayResearchItem from "./DisplayResearchItem";

const styles = theme => ({
  card: {
    width: 350,
    display: "inline-block",
    margin: 10
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
    width: "80%"
  },
  snackbar: {
    position: "absolute"
  },
  snackbarContent: {
    width: 360
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ResearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEdit: false,
      openDisplay: false,
      items: [],
      editItem: {},
      displayItem: {},
      newItem: {},
      openSnack: false
    };

    this.loadItems();
  }

  handleChangeDescription = event => {
    if (this.state.openEdit) {
      this.setState({
        editItem: Object.assign({}, this.state.editItem, {
          description: event.target.value
        })
      });
    } else {
      this.setState({
        newItem: Object.assign({}, this.state.newItem, {
          description: event.target.value
        })
      });
    }
  };

  handleChangeName = event => {
    if (this.state.openEdit) {
      this.setState({
        editItem: Object.assign({}, this.state.editItem, {
          name: event.target.value
        })
      });
    } else {
      this.setState({
        newItem: Object.assign({}, this.state.newItem, {
          name: event.target.value
        })
      });
    }
  };

  handleChangeImageUrl = event => {
    if (this.state.openEdit) {
      this.setState({
        editItem: Object.assign({}, this.state.editItem, {
          imageUrl: event.target.value
        })
      });
    } else {
      this.setState({
        newItem: Object.assign({}, this.state.newItem, {
          imageUrl: event.target.value
        })
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpenEdit = product => {
    this.setState({ openEdit: true, editItem: product });
  };

  handleClickOpenDisplay = product => {
    this.setState({ openDisplay: true, displayItem: product });
  };

  loadItems = () => {
    fetch(`${DataService.researchApi}?filter[include]=researchGoals`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ items: data });
      });
  };

  handleClose = () => {
    this.setState({ open: false, openSnack: true });
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleCloseDisplay = () => {
    this.setState({ openDisplay: false });
  };

  handleCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  handleSave = () => {
    this.setState({ open: false, openSnack: true });
    let data = {
      name: this.state.newItem.name,
      imageUrl: this.state.newItem.imageUrl,
      startDate: "2018-06-25T16:22:57.779Z",
      endDate: "2018-09-25T16:22:57.779Z",
      description: this.state.newItem.description
    };

    this.setState({ newItem: {} });

    let fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    };

    fetch(DataService.researchApi, fetchData)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.loadItems();
      });
  };

  handleUpdate = () => {
    this.setState({ openEdit: false, openSnackEdit: true });
    let data = {
      name: this.state.editItem.name,
      imageUrl: this.state.editItem.imageUrl,
      startDate: "2018-06-25T16:22:57.779Z",
      endDate: "2018-09-25T16:22:57.779Z",
      description: this.state.editItem.description
    };

    this.setState({ editItem: {} });

    let fetchData = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json"
      }
    };

    fetch(DataService.researchApi + "/" + this.state.editItem.id, fetchData)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.loadItems();
      });
  };

  removeItem = itemId => {
    fetch(DataService.researchApi + "/" + itemId, { method: "DELETE" })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.loadItems();
      });
  };

  render() {
    const { classes } = this.props;

    const researchListCards = this.state.items.map(item => (
      <CardCustom
        key={item.id}
        item={item}
        classes={classes}
        removeItem={this.removeItem}
        handleClickOpenEdit={this.handleClickOpenEdit}
        handleClickOpenDisplay={this.handleClickOpenDisplay}
        chips={[]}
      />
    ));

    return (
      <div>
        <Button
          variant="fab"
          className={classes.fab}
          color="primary"
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>

        <NewResearchItem
          handleChangeDescription={this.handleChangeDescription}
          handleChangeImageUrl={this.handleChangeImageUrl}
          handleChangeName={this.handleChangeName}
          handleClose={this.handleClose}
          handleSave={this.handleSave}
          open={this.state.open}
          Transition={Transition}
        />

        <EditResearchItem
          handleChangeDescription={this.handleChangeDescription}
          handleChangeImageUrl={this.handleChangeImageUrl}
          handleChangeName={this.handleChangeName}
          editItem={this.state.editItem}
          handleCloseEdit={this.handleCloseEdit}
          handleUpdate={this.handleUpdate}
          openEdit={this.state.openEdit}
          Transition={Transition}
        />

        <DisplayResearchItem
          displayItem={this.state.displayItem}
          handleCloseDisplay={this.handleCloseDisplay}
          openDisplay={this.state.openDisplay}
          Transition={Transition}
          removeItem={this.removeItem}
          handleClickOpenEdit={this.handleClickOpenEdit}
        />

        {researchListCards}
        <Snackbar
          open={this.state.openSnack}
          autoHideDuration={4000}
          onClose={this.handleCloseSnack}
          ContentProps={{
            "aria-describedby": "snackbar-fab-message-id",
            className: classes.snackbarContent
          }}
          message={<span id="snackbar-fab-message-id">Archived</span>}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={this.handleCloseSnack}
            >
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResearchList);
