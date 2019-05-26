import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";

import AddIcon from "@material-ui/icons/Add";
import { DataService } from "./services/Api";
import CardCustom from "./CardCustom";
import NewGoalItem from "./NewGoalItem";
import EditGoalItem from "./EditGoalItem";

const styles = theme => ({
  card: {
    width: 350,
    display: "inline-block",
    margin: 10
  },
  media: {
    height: 215,
    paddingTop: 16, // 16:9
    margin: 10
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
  formControl: {
    margin: 10,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: 10
  },
  chip: {
    margin: 10
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class GoalsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openEdit: false,
      researchList: [],
      goalList: [],
      newItem: {},
      editItem: {},
      researchId: ""
    };
    this.loadResearchList();
    this.loadGoalList();
  }

  // load all values
  loadResearchList = () => {
    // load research list
    fetch(DataService.researchApi)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({ researchList: data });
      });
  };

  // load all values
  loadGoalList = () => {
    fetch(`${DataService.researchGoalApi}/?${DataService.filterInResearch}`)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({ goalList: data });
      });
  };

  handleChangeDescription = event => {
    if (this.state.open) {
      this.setState({
        newItem: Object.assign({}, this.state.newItem, {
          description: event.target.value
        })
      });
    } else {
      this.setState({
        editItem: Object.assign({}, this.state.editItem, {
          description: event.target.value
        })
      });
    }
  };

  handleChangeName = event => {
    if (this.state.open) {
      this.setState({
        newItem: Object.assign({}, this.state.newItem, {
          name: event.target.value
        })
      });
    } else {
      this.setState({
        editItem: Object.assign({}, this.state.editItem, {
          name: event.target.value
        })
      });
    }
  };

  handleChangeImageUrl = event => {
    if (this.state.open) {
      this.setState({
        newItem: Object.assign({}, this.state.newItem, {
          imageUrl: event.target.value
        })
      });
    } else {
      this.setState({
        editItem: Object.assign({}, this.state.editItem, {
          imageUrl: event.target.value
        })
      });
    }
  };

  handleSelectChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickOpenEdit = goal => {
    this.setState({
      openEdit: true,
      editItem: goal,
      researchId: goal.researchId
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  };

  handleSave = () => {
    this.setState({ open: false });
    // get the new item value
    let data = {
      researchId: this.state.researchId,
      name: this.state.newItem.name,
      imageUrl: this.state.newItem.imageUrl,
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

    fetch(DataService.researchGoalApi, fetchData)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.loadGoalList();
      });
  };

  handleUpdate = () => {
    this.setState({ openEdit: false });
    // get the new item value
    let data = {
      researchId: this.state.researchId,
      name: this.state.editItem.name,
      imageUrl: this.state.editItem.imageUrl,
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

    fetch(DataService.researchGoalApi + "/" + this.state.editItem.id, fetchData)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.loadGoalList();
      });
  };

  removeItem = itemId => {
    fetch(DataService.researchGoalApi + "/" + itemId, { method: "DELETE" })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.loadGoalList();
      });
  };

  render() {
    const { classes } = this.props;

    const goalListCards = this.state.goalList.map(item => (
      <CardCustom
        key={item.id}
        item={item}
        classes={classes}
        removeItem={this.removeItem}
        chips={[item.research.name]}
        handleClickOpenEdit={this.handleClickOpenEdit}
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
        {goalListCards}
        <NewGoalItem
          handleChangeDescription={this.handleChangeDescription}
          handleChangeImageUrl={this.handleChangeImageUrl}
          handleChangeName={this.handleChangeName}
          handleClose={this.handleClose}
          handleSave={this.handleSave}
          open={this.state.open}
          Transition={Transition}
          handleSelectChange={this.handleSelectChange}
          researchList={this.state.researchList}
        />
        <EditGoalItem
          handleChangeDescription={this.handleChangeDescription}
          handleChangeImageUrl={this.handleChangeImageUrl}
          handleChangeName={this.handleChangeName}
          handleCloseEdit={this.handleCloseEdit}
          handleUpdate={this.handleUpdate}
          openEdit={this.state.openEdit}
          Transition={Transition}
          handleSelectChange={this.handleSelectChange}
          researchList={this.state.researchList}
          editItem={this.state.editItem}
          researchId={this.state.researchId}
        />
      </div>
    );
  }
}

GoalsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GoalsList);
