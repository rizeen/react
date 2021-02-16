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
  
function Movement(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inpu1, setInpu1] = useState();
    const [inpu2, setInpu2] = useState();
    const [inpu3, setInpu3] = useState();
    const [inpu4, setInpu4] = useState();


    const handleOpen = () => {
        setOpen(true);
    };
    
    const updateMovement = () => {
        db.collection('movements').doc(props.movement.id).set({
            product: inpu1,
            quantity: inpu2,
            from: inpu3,
            to: inpu4,

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
                <input placeholder={props.movement.product} value={inpu1} onChange={event => setInpu1(event.target.value)}/>
                <input placeholder={props.movement.quantity} value={inpu2} onChange={event => setInpu2(event.target.value)}/>
                <input placeholder={props.movement.from} value={inpu3} onChange={event => setInpu3(event.target.value)}/>
                <input placeholder={props.movement.to} value={inpu4} onChange={event => setInpu4(event.target.value)}/>

                <button onClick={updateMovement}>Update Movement</button>
            </div>
        </Modal>
        
        <div>
            <li>{props.movement.product}</li>
            <li>{props.movement.quantity}</li>
            <li>{props.movement.from}</li>
            <li>{props.movement.to}</li>
            <button onClick={e => setOpen(true)}>EDIT ME</button>
            <button onClick={event => db.collection('movements').doc(props.movement.id).delete()}>DELETE ME</button>



        </div>
        </div>
    )
}

export default Movement
