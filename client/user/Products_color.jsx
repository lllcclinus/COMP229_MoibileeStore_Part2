import React from 'react'
import { useState } from 'react'


import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import { list } from './api-product.js'
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
import { create } from './api-cart.js';
import Button from '@material-ui/core/Button';
import { Navigate } from 'react-router-dom'

let shoppingDict = {};
//let cartRecord = [[0,1,2,3,4,5,6]];
let cartNumber = 0;
let cartRecord = Array.from(Array(2000), () => new Array(20));

const remove = async (id) => {
  try {
    let response = await fetch('/api/carts/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}



//const [users, setChecked] = useState([]);

const handleCheck = (event, item) => {
  //setChecked({ ...checked, [id]: event.target.checked 
  event.stopPropagation();
  if (shoppingDict[item._id] == null) {
    shoppingDict[item._id] = 0;
  }
  else {
    shoppingDict[item._id] = shoppingDict[item._id] + 1;
  }
  //alert("Hello product " + item._id + " " + shoppingDict[item._id]);
  if (shoppingDict[item._id] % 2 == 0) {
    // const user = {
    //   productid: item._id || undefined,
    //   name: item.name || undefined,
    //   description: item.description || undefined,
    //   price: item.price || undefined,
    //   user: auth.isAuthenticated().user.name
    // };

    // create(user).then((data) => {
    //   if (data.error) {
    //     setValues({ ...values, error: data.error });
    //   } else {
    //     setOpen(true);
    //   }
    // });
    // for(let i=0;i<cartNumber;i++){
    //   console.log(cartRecord[i][0]+cartRecord[i][1]+cartRecord[i][2]+cartRecord[i][3])
    // }
    let same = false;
    for (let i = 0; i < cartNumber; i++) {
      console.log("xxxxxxxxxxxxxxxxxxxx");
      console.log(item._id + '  ' + cartRecord[i][1]);
      console.log("xxxxxxxxxxxxxxxxxxxx");
      if (item._id == cartRecord[i][1]) {
        same = true;
        console.log('matched');
        if (cartRecord[i][6] == 'cancel') {
          cartRecord[i][6] = 'create'
        }
      }
    }
    if (!same) {
      cartRecord[cartNumber][1] = item._id;
      cartRecord[cartNumber][2] = item.name;
      cartRecord[cartNumber][3] = item.description;
      cartRecord[cartNumber][4] = item.price;
      cartRecord[cartNumber][5] = auth.isAuthenticated().user.email;
      cartRecord[cartNumber][6] = 'create';
      cartRecord[cartNumber][7] = item.owner;
      cartNumber++;
    }



  }
  else {
    // remove('655022111a49ba0ac2267283').then((data) => {
    //   if (data && data.error) {
    //     console.log(data.error)
    //   } else {
    //     auth.clearJWT(() => console.log('deleted'))
    //     setRedirect(true)
    //   }
    // })
    for (let i = 0; i < cartNumber; i++) {
      if (item._id == cartRecord[i][1]) {
        if (cartRecord[i][6] == 'create') {
          cartRecord[i][6] = 'cancel';
        }
      }
    }

  }
  console.log("========================================");
  for (let i = 0; i < cartNumber; i++) {
    console.log(cartRecord[i][2] + ' ' + cartRecord[i][6]);
  }

};




const useStyles = makeStyles(theme => ({
  
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '97%',
  },
  listItemOdd: {
    backgroundColor: 'white', // or any color you prefer
  },
  listItemEven: {
    backgroundColor: '#E4EFDC', // or any color you prefer
  },
  Link: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center', // Optional, for vertical alignment
    width: '100%', // Optional, to ensure it takes full width
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
  //redirect=false;
  
  const jwt = auth.isAuthenticated();
  const [vv, setVV] = useState({
    redirectToCart: false
  })
  const clist = async (signal) => {
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

  console.log("Clear cartRecord");
  cartRecord.forEach(innerArray => {
    innerArray.fill(null); 
  });
  // cartNumber=0;
  // products.map((item, i) => {
  //   //console.log(item.name + ' ' + item._id);
  //   console.log("Clear here"+i);
  //   for(let k=0;k<8;k++){
  //     cartRecord[i][k]='0';
  //     console.log(cartRecord[i][2]+cartRecord[i][6]);
  //   }
  // })









  if (auth.isAuthenticated()) {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      clist(signal).then((data) => {
        if (data && data.error) {
          //console.log(data.error)
        } else {
          //console.log(data)
          setCartItems(data)
        }
      })
      return function cleanup() {
        abortController.abort()
      }
    }, [])
    console.log("Reload cartrecord");
    cartNumber = 0;
    shoppingDict = {};
    cartItems.map((item, i) => {
      console.log(item.name + ' ' + item.productid);
      cartRecord[cartNumber][0] = item._id;
      cartRecord[cartNumber][1] = item.productid;
      cartRecord[cartNumber][2] = item.name;
      cartRecord[cartNumber][3] = item.description;
      cartRecord[cartNumber][4] = item.price;
      cartRecord[cartNumber][5] = item.user;
      cartRecord[cartNumber][6] = 'keep';
      cartRecord[cartNumber][7] = item.owner;
      cartNumber++;

    })

  }
  console.log("**************************");

  const [open, setOpen] = useState(false);

  const classes = useStyles()



  const handleButtonClick = async () => {
    // Define what happens when the button is clicked
    //alert('hello');
    for (let i = 0; i < 15; i++) {
      console.log("==>" + cartRecord[i][2] + cartRecord[i][6]);
    }
    const createPromises = cartRecord.filter(record => record[6] === 'create')
      .map(record => {
        const user = {
          productid: record[1] || undefined,
          name: record[2] || undefined,
          description: record[3] || undefined,
          price: record[4] || undefined,
          user: record[5] || undefined,
          owner: record[7] || undefined
        };

        return create({userId:auth.isAuthenticated().user._id },{t: jwt.token},user).then(data => {
          if (data.error) {
            // Handle error for this record
            console.log("Error with record: ", record[2], data.error);
            return { error: data.error, record };
          } else {
            // Handle success for this record
            console.log("Created record: ", record[2]);
            return { success: true, record };
          }
        }).catch(error => {
          // Handle any network or unexpected errors
          console.log("Unexpected error with record: ", record[2], error);
          return { error, record };
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

    // If successful, perform additional actions
    const anySuccess = results.some(result => result.success);
    if (anySuccess) {
      setVV({ ...vv, redirectToCart: true });
      setOpen(true);
    }

  };



  if (vv.redirectToCart) {
    for (let i = 0; i < cartNumber; i++) {
      for (let k = 0; k < 8; k++) {
        cartRecord[i][k] = '';
      }
    }
    cartNumber = 0;

    return (<Navigate to={'/cart/'} />)
  }
  return (
    <Paper>
      <Typography variant="h6">
        All Products
      </Typography>
      <List dense>
      {/* Header */}
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
        <ListItem 
        button 
        className={`${classes.listItem} ${i % 2 === 0 ? classes.listItemEven : classes.listItemOdd}`}
        >
        <Link component={RouterLink} to={"/product/" + item._id} className={classes.Link}  key={i}>
          
            <ListItemText primary={item.name} className={classes.nameColumn} />
            <ListItemText primary={item.description} className={classes.descriptionColumn} />
            <ListItemText primary={item.price} className={classes.priceColumn} />
            <ListItemText primary={item.owner} className={classes.ownerColumn} />
            <ListItemSecondaryAction>
              <IconButton>
                <ArrowForward />
              </IconButton>
              </ListItemSecondaryAction>
            
        </Link>
        <ListItemSecondaryAction>
        {auth.isAuthenticated() && (
                <Checkbox 
                  onChange={(event) => handleCheck(event, item)}
                  onClick={(event) => event.stopPropagation()}
                  className={i % 2 === 0 ? classes.listItemEven : classes.listItemOdd}
                />
              )}
        </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
      {auth.isAuthenticated() && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleButtonClick}
          >
            Add to Cart
          </Button>
        </div>
      )}
    </Paper>
  )
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

