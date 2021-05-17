import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent, FormControl, TextField } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    form: {
      marginBottom: 12,
      marginTop: 12
    }
});

const ThoughtForm = (props) => {
    const classes = useStyles();

    const maximumCharacters = 140;
    const [message, setMessage] = useState('');
    const [charactersLeft, setCharactersLeft] = useState(maximumCharacters);

    const handleChange = (e) => {
        setMessage(e.target.value);
        if (maximumCharacters >= e.target.value.length) {
            setCharactersLeft(maximumCharacters - e.target.value.length)
        }
        else {
            setCharactersLeft(0)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({message})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(data => {
            props.setThoughts((prev) => [data, ...prev]);
            setMessage('');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className={classes.form}>
                <CardContent>
                    <FormControl fullWidth>
                    <TextField
                        label="What is making you happy right now?"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={message}
                        onChange={handleChange} />
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button 
                        size="medium" 
                        variant="contained" 
                        color="secondary" 
                        disabled={message.length < 1 || message.length > maximumCharacters}
                        onClick={handleSubmit} ><FavoriteIcon /> Send Happy Thought <FavoriteIcon /></Button> {charactersLeft} characters left
                </CardActions>
            </Card>
        </form>
    )
};
export default ThoughtForm;