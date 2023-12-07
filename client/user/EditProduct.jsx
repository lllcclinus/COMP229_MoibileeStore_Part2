

import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { create } from './api-product';
import { useParams } from 'react-router-dom';

//import Card from '@material-ui/core/Card'
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

//import CardActions from '@material-ui/core/CardActions'
//import CardContent from '@material-ui/core/CardContent'
//import Button from '@material-ui/core/Button'
//import TextField from '@material-ui/core/TextField'
//import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import auth from '../lib/auth-helper.js'
import {read, update} from './api-product.js'
import {Navigate} from 'react-router-dom'



const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#E2EFDA',
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

export default function EditProduct({ match }) {
  const classes = useStyles()
  const { userId } = useParams();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    owner: '',
    open: false,
    error: '',
    redirectToProfile: false
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, description: data.description, price: data.price})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [userId])

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      description: values.description || undefined,
      price: values.price || undefined,
      owner: auth.isAuthenticated().user.email,
    }
    update({
      userId: userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, userId: data._id, redirectToProfile: true})
      }
    })
    Navigator('/products');
  }
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value})
  }

    if (values.redirectToProfile) {
      return (<Navigate to={'/products/' }/>)
    }
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Product
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField id="description" type="text" label="Description" className={classes.textField} value={values.description} onChange={handleChange('description')} margin="normal"/><br/>
          <TextField id="price" type="number" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
        
      </Card>
      
       </div>
    )
}