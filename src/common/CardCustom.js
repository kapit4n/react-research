import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

function CardCustom(props) {
  return (
    <Card className={props.classes.card} key={props.item.id}>
      <CardMedia
        className={props.classes.media}
        image={props.item.imageUrl}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h3">
          {props.item.name}{" "}
          {props.chips.map(chipItem => (
            <Chip
              key={chipItem}
              label={chipItem}
              className={props.classes.chip}
            />
          ))}
        </Typography>
        <Typography variant="subtitle1" style={{height: 58, 'white-space': 'pre-line'}} gutterBottom noWrap>{props.item.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => props.removeItem(props.item.id)}
        >
          remove
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => props.handleClickOpenEdit(props.item)}
        >
          Edit
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => props.handleClickOpenDisplay(props.item)}
        >
          Open
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardCustom;
