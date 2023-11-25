import React from 'react'
import { useState } from 'react'


import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { list } from './api-cart.js'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
//import Person from '@material-ui/core/Person'
//import ArrowForward from '@material-ui/core/ArrowForward'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
//import ArrowForward from '@material-ui/core/ArrowForward'
import ArrowForward from '@material-ui/icons/ArrowForward';
import unicornbikeImg from './../assets/images/unicornbikeImg.jpg'
import Checkbox from '@material-ui/core/Checkbox';
import auth from '../lib/auth-helper.js'
import Button from '@material-ui/core/Button';
import { remove } from './api-cart.js';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { create } from './api-order.js';


//const [users, setChecked] = useState([]);

// const handleCheck = (event, id) => {
//   //setChecked({ ...checked, [id]: event.target.checked 
//   event.stopPropagation();
//   alert("Hello " + id + " ");
// };


const useStyles = makeStyles(theme => ({
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameColumn: {
    width: '20%', // 
  },
  descriptionColumn: {
    width: '40%', // 
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    textAlign: 'left',
  },
  priceColumn: {
    width: '20%', // 
  },
  ownerColumn: {
    width: '20%', // 
  },
  button: {
    margin: theme.spacing(1),
    // Add more styles as needed
  },
  card: {
    // Define your card styles here
  },
  textField: {
    // Define your text field styles here
  },
  error: {
    // Define your error icon styles here
  },
  submit: {
    // Define your submit button styles here
  },
  title: {
    // Define your title styles here
  },
  root: {
    // Define your root styles here
  },
}));


export default function Products() {
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();
  const list = async (signal) => {
    try {
      let response = await fetch('/api/carts/?user=' + auth.isAuthenticated().user.email, { // Include the query parameter in the URL
        method: 'GET',
        signal: signal,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }


  const [products, setProducts] = useState([])
  const [itemRemoved, setItemRemoved] = useState(false);
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)

      } else {
        console.log(data)
        setProducts(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  console.log(products.length);

  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    const initialCheckedState = {};
    products.forEach((item) => {
      initialCheckedState[item._id] = false; // Initialize all as unchecked
    });
    setCheckedItems(initialCheckedState);
  }, [products]);

  const handleCheck = (event, item) => {
    event.stopPropagation();
    setCheckedItems({ ...checkedItems, [item._id]: event.target.checked, });
  };

  const classes = useStyles()

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = async () => {
    // Define what happens when the button is clicked
    //alert('hello');
    const neworderno = getCurrentDateTimeString(auth.isAuthenticated().user.email);
    console.log(neworderno);
    const createPromises = products.map((item, i) => {
      const user = {
        orderno: neworderno,
        productid: item.productid || undefined,
        name: item.name || undefined,
        description: item.description || undefined,
        price: item.price || undefined,
        user: item.user || undefined,
        owner: item.owner || undefined
      };

      return create({userId: auth.isAuthenticated().user._id},{t: jwt.token},user).then(data => {
        if (data.error) {
          // Handle error for this record
          console.log("Error with record: ", item.name, data.error);
          return { error: data.error, item };
        } else {
          // Handle success for this record
          console.log("Created record: ", item.name);
          return { success: true, item };
        }
      }).catch(error => {
        // Handle any network or unexpected errors
        console.log("Unexpected error with record: ", item.name, error);
        return { error, item };
      });
    });

    // Wait for all create operations to complete
    const results = await Promise.all(createPromises);

    // Process the results
    results.forEach(result => {
      if (result.error) {
        //setValues(values => ({ ...values, error: result.error }));
      }
    });

    const anySuccess = results.some(result => result.success);
    if (anySuccess) {
      const removalPromises2 = products.map((item, i) => {
        if (true) {
          return remove({
            userId: item._id
          }, { t: jwt.token });
        }
        return Promise.resolve();
      });
      await Promise.all(removalPromises2);
      setItemRemoved(true);
      setOpen(true);
    }
    
  };

  const handleButtonClick2 = async () => {
    // Define what happens when the button is clicked
    //alert('hello2');
    // const removePromises = [];

    // removePromises.push(Object.keys(checkedItems).forEach(key => {
    //   const isChecked = checkedItems[key];
    //   console.log(`Item ID: ${key}, Checked: ${isChecked}`);
    //   //************************************************************* */
    //   if (checkedItems[key]) {
    //     remove({
    //       userId: key
    //     }, { t: jwt.token }).then((data) => {
    //       if (data && data.error) {
    //         console.log(data.error)
    //       } else {
    //         //setRedirect(true)
    //       }
    //     });
    //   }
    //   /************************************************************** */
    // }));
    // await Promise.all(removePromises);
    // setItemRemoved(true);
    const removalPromises = Object.keys(checkedItems).map(key => {
      if (checkedItems[key]) {
        return remove({userId: key}, { t: jwt.token });}
      return Promise.resolve();
    });
    await Promise.all(removalPromises);
    setItemRemoved(true);

  };

  useEffect(() => {
    if (itemRemoved) {
      // Re-fetch data or update state
      const abortController = new AbortController()
      const signal = abortController.signal
      list(signal).then((data) => {
        if (data && data.error) {
          console.log(data.error)

        } else {
          //console.log(data)
          setProducts(data)
        }
      })

      const newCheckedState = {};
      products.forEach((item) => {
        newCheckedState[item._id] = false;
      });
      setCheckedItems(newCheckedState);
      setItemRemoved(false); // Reset the flag
    }
  }, [itemRemoved]);
  //alert('in Product'+auth.isAuthenticated().user.name);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Cart
      </Typography>
      <List dense>
      <ListItem className={classes.listItem}>
        <ListItemText primary="Name" className={classes.nameColumn} />
        <ListItemText primary="Description" className={classes.descriptionColumn} />
        <ListItemText primary="Price" className={classes.priceColumn} />
        <ListItemText primary="Owner" className={classes.ownerColumn} />
        <ListItemSecondaryAction>
          {/* items */}
        </ListItemSecondaryAction>
      </ListItem>
        {products.map((item, i) => (
          <ListItem key={i} button className={classes.listItem}>
            <ListItemText primary={item.name} className={classes.nameColumn} />
            <ListItemText primary={item.description} className={classes.descriptionColumn} />
            <ListItemText primary={item.price} className={classes.priceColumn} />
            <ListItemText primary={item.owner} className={classes.ownerColumn} />
            <ListItemSecondaryAction>
              <IconButton>
                <ArrowForward />
              </IconButton>
              <Checkbox checked={checkedItems[item._id] || false} onChange={(event) => handleCheck(event, item)} onClick={(event) => event.stopPropagation()} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleButtonClick}
        >
          Place Order
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleButtonClick2}
        >
          REMOVE FROM CART
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Order Placed Successfully.
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
    </Paper>

  )
}


function getCurrentDateTimeString(name) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${name}`;
}