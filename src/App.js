import React, { useState, useEffect } from 'react';
import Product from './Product';
import Location from './Location';
import Movement from './Movement';
import './App.css';
import db from "./firebase";
import firebase from "firebase";

function App() {

  const [products, setProducts] = useState([]);
  const [input, setInput] = useState(['']);
  useEffect(() => {
    db.collection('products').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setProducts(snapshot.docs.map(doc => ({id: doc.id, product: doc.data().product})))
    })
  }, [])
  const addProduct = (event) => {
    event.preventDefault();
    db.collection('products').add({
      product: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setProducts([...products, input]);
    setInput('');
  }




  const [locations, setLocations] = useState([]);
  const [inp, setInp] = useState(['']);
  useEffect(() => {
    db.collection('locations').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setLocations(snapshot.docs.map(doc => ({id: doc.id, location: doc.data().location})))
    })
  }, [])
  const addLocation = (event) => {
    event.preventDefault();
    db.collection('locations').add({
      location: inp,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setLocations([...locations, input]);
    setInp('');
  }



  const [movements, setMovements] = useState([]);
  const [inpu1, setInpu1] = useState(['']);
  const [inpu2, setInpu2] = useState(['']);
  const [inpu3, setInpu3] = useState(['']);
  const [inpu4, setInpu4] = useState(['']);

  useEffect(() => {
    db.collection('movements').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMovements(snapshot.docs.map(doc => ({id: doc.id, product: doc.data().product, quantity: doc.data().quantity, from: doc.data().from, to: doc.data().to})))
    })
  }, [])
  const addMovement = (event) => {
    event.preventDefault();
    db.collection('movements').add({
      product: inpu1,
      quantity: inpu2,
      from: inpu3,
      to: inpu4,
      id: 1,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMovements([...movements, inpu1, inpu2, inpu3, inpu4]);
    setInpu1('');
    setInpu2('');
    setInpu3('');
    setInpu4('');
  }




  return (
    <div className="App">

<div class="row">
      <div id="pro" class="mar col-sm-6 col-xs-12"> 
      <input placeholder={'Enter Product'} value={input} onChange={event => setInput(event.target.value)}/>
      <button disabled={!input} onClick={addProduct}>Add Product</button>
      <ul>
        {products.map(product =>(
          <Product product={product}/>
        ))}
      </ul>
      </div>

  <div id="loca" class="mar col-sm-6 col-xs-12">
  <input placeholder={'Enter Location'} value={inp} onChange={event => setInp(event.target.value)}/>
  <button disabled={!inp} onClick={addLocation}>Add Location</button>
  <ul>
    {locations.map(location =>(
      <Location location={location}/>
    ))}
  </ul>
</div>
</div>

<div id="move" class="mar"> 
<form>
      <input placeholder={'Enter Product'} value={inpu1} onChange={event => setInpu1(event.target.value)}/>
      <input placeholder={'Enter Quantity'} value={inpu2} onChange={event => setInpu2(event.target.value)}/>
      <input placeholder={'Move From'} value={inpu3} onChange={event => setInpu3(event.target.value)}/>
      <input placeholder={'Move To'} value={inpu4} onChange={event => setInpu4(event.target.value)}/>

      <button disabled={!inpu1||!inpu2||!inpu3||!inpu4} onClick={addMovement}>Move Product</button>
</form>
      <ul>
      {movements.map(movement =>(
          <Movement movement={movement}/>
        ))}

      </ul>
      </div>

</div>
  );


}

export default App;