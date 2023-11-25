

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { create } from './api-product';
import auth from '../lib/auth-helper.js'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
  submit: {
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 18,
  },
}));

// const create = async (user) => {
//   return { error: null }; // Simulated API call
// };

export default function CreateProduct() {
  const classes = useStyles();
  const jwt = auth.isAuthenticated()
  const [values, setValues] = useState({ 
    name: '',
    description: '', 
    price: '',
    owner: ''
  });

  const [open, setOpen] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => { 
    const user = {
      name: values.name || undefined,
      description: values.description || undefined, 
      price: values.price || undefined,
      owner: auth.isAuthenticated().user.email || undefined
    };

    create({userId:auth.isAuthenticated().user._id},{t: jwt.token},user).then((data) => { 
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOpen(true);
      }
    });
  };

  CreateProduct.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Card className={classes.card}> 
        <CardContent>
          <Typography variant="h6" className={classes.title}> 
            New Product
          </Typography>
                  
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <TextField
            id="description"
            label="Description"
            className={classes.textField}
            value={values.description}
            onChange={handleChange('description')}
            margin="normal"
          />
          <TextField
            id="price"
            label="Price"
            className={classes.textField}
            value={values.price}
            onChange={handleChange('price')}
            type="number"
            margin="normal"
          />
          
        </CardContent> 
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} 
            className={classes.submit}>
            Submit
          </Button>
        </CardActions> 
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New product successfully created. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/Products">
            <Button color="primary" autoFocus variant="contained" onClick={handleClose}>
              OK 
            </Button>
          </Link>
        </DialogActions> 
      </Dialog>
    </div>
  );
}

