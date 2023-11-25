/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteProduct from './DeleteProduct'
import auth from '../lib/auth-helper.js'
import {read} from './api-product.js'
import {useLocation, Navigate, Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

export default function Profile({ match }) {
  const location = useLocation();
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
  const { userId } = useParams();

  //alert('Prouct Profile ' + userId);
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [userId])
  
    if (redirectToSignin&&false) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
      
    }
    if (auth.isAuthenticated()) {
    console.log( auth.isAuthenticated().user._id)
    console.log(user._id)
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant="h6" className={classes.title}>
          Product Profile
        </Typography>
        <List dense>
        <ListItemText primary={user.created} secondary={user.created}/>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.description} /> 
            <ListItemText primary={user.price} secondary={user.owner}/> 
            {
             auth.isAuthenticated() && auth.isAuthenticated().user.email == user.owner &&
              (<ListItemSecondaryAction>
                <Link to={"/user/edit2/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                 
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteProduct userId={user._id}/>
              </ListItemSecondaryAction>)
            }
          </ListItem>
          <Divider/>
          
        </List>
      </Paper>
    )
  }
