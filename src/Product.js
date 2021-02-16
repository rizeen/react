import { Modal, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import db from './firebase'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
function Product(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    
    const updateProduct = () => {
        db.collection('products').doc(props.product.id).set({
            product: input
        }, {merge: true})
        setOpen(false);
    }

    return (
        <div>
        <Modal
        open={open}
        onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>I am a modal</h1>
                <input placeholder={props.product.product} value={input} onChange={event => setInput(event.target.value)}/>
                <button onClick={updateProduct}>Update Product</button>
            </div>
        </Modal>
  
        <div>
            <li>{props.product.product}</li>
            <button onClick={e => setOpen(true)}>EDIT ME</button>
            <button onClick={event => db.collection('products').doc(props.product.id).delete()}>DELETE ME</button>
        </div>
        </div>
    )
}

export default Product
