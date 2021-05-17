import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import Moment from 'react-moment';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    root: {
      marginBottom: 12,
    }
});

const Thought = (props) => {
    const classes = useStyles();

    const [likes, setLikes] = useState(props.hearts);

    const handleLike = (e) => {
        e.preventDefault();
        fetch(`https://happy-thoughts-technigo.herokuapp.com/thoughts/${props.id}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(setLikes(data => data + 1))
    };

    return (
        <Card className={classes.root}>
            <CardContent>
            <Typography variant="body2">
                {props.message}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" variant="contained" onClick={handleLike}><FavoriteIcon color="secondary" /> {likes}</Button> <Moment fromNow>{props.time}</Moment>
            </CardActions>
        </Card>
    )
};
export default Thought;