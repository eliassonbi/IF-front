import { useEffect, useState } from 'react';
import WeightedGraph from './algo.js'
import logo from './logo.svg';
import './App.css';
import List from './List.js';


function App1() {
        const [send, setSend] = useState(0);
        const [address, setAddress] = useState([]);
        const [res, setRes] = useState(null);
        const [fromAddress, setFromAddress] = useState("");
        const [toAddress, setToAddress] = useState("");
        const [wallet, setWallet] = useState(50);
        const graph = new WeightedGraph();
        
        
        
  const handleChangeSend = event => {
        setSend(event.target.value);
      };

  async function sendValueToBack(){
        
            
       fetch('http://localhost:3001/amount', {  

        method: 'POST', 
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             },
        body: JSON.stringify({
        from : fromAddress,
        to : toAddress,
        amount : send

    })
});

       setWallet(wallet-(send/10))
}

        graph.addVertex(address[0]);
        graph.addVertex(address[1]);
        graph.addVertex(address[2]);
        graph.addVertex(address[3]);
        graph.addVertex(address[4]);
        graph.addVertex(address[5]);

        graph.addEdge(address[0], address[1], 4);
        graph.addEdge(address[0], address[2], 2);
        graph.addEdge(address[1], address[4], 3);
        graph.addEdge(address[2], address[3], 2);
        graph.addEdge(address[2], address[5], 4);
        graph.addEdge(address[3], address[4], 3);
        graph.addEdge(address[3], address[5], 1);
        graph.addEdge(address[3], address[5], 1);
        

        const handleClick = (event, value, from) => {
        from ? setFromAddress(value) : setToAddress(value);
        };

        useEffect(() => {
                async function fetcher() {
                        const responseAddress = await fetch('http://localhost:3001/address');        
                        const address = await responseAddress.json();
                        setAddress(address);                  
                }
                fetcher();
                setFromAddress('0xF6873CcE6cBA4CCCabcB2Ee840878ba62Fa91eF7')
                setToAddress('0x7338fF92750BdffC38C036Ac82936CA0ba99B227')
        }, []);

  return (
    <div>
        <head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

        </head>
        <div class="jumbotron text-center">
  <h1>Sales confirmation</h1>
  <p>Your transaction has been added to the Public Services Blockchain ! </p>
</div>
  
<div class="container">
  <div class="row">
    <div class="col-sm-4">
     
    </div>
    <div class="col-sm-4">
      <h3>Details</h3>
      <p>Kilowatt-hours sold : 70000 kwh </p>
      <p>Euros received : 1500 €</p>
      <p>CO2 saved : 1383 kg</p>
      <p>Your blockchain address : {fromAddress}</p>
      <p>Buyer address : {toAddress}</p>
     
    </div>
    <div class="col-sm-4">  
    </div>
  </div>
</div>
      {null && <div>
        <div>
                <p class = "h1"> Shorter path between : {fromAddress} and {toAddress} </p>
        </div>
        <List addressId={address} handleClick={handleClick} from={false}/>
        <div>
        <button onClick={()=> {setRes(graph.Dijkstra(fromAddress,toAddress))}}>Calculer les distances</button>
        <input
        type="text"
        id="amount"
        name="message"
        onChange={handleChangeSend}
        value={send}
      />

      <h2>Message: {send}</h2>
        <h1>{res}</h1>
        <div>
        
        </div>
        </div>
      </div>}
      <div>


      </div>
    </div>
  );
}
export default App1

