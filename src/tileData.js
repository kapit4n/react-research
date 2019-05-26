import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import ViewListIcon from '@material-ui/icons/ViewList';

export const mailFolderListItems = (
  <div>
    <ListItem component={Link} to="/research-list">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Researches" />
    </ListItem>
    
    <ListItem component={Link} to="/goals-list">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Goals List" />
    </ListItem>

    <ListItem component={Link} to="/steps-list">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Steps List" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem component={Link} to="/results-list">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Results" />
    </ListItem>

    <ListItem component={Link} to="/feedbacks-list">
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItem>

  </div>
);
