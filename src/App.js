import { useEffect, useState } from 'react';
import WeightedGraph from './algo.js'
import logo from './logo.svg';
import './App.css';
import List from './List.js';

function App() {
        const [contacts, setContacts] = useState([]);
        const [send, setSend] = useState(0);
        const [address, setAddress] = useState([]);
        const [res, setRes] = useState(null);
        const [fromAddress, setFromAddress] = useState("");
        const [toAddress, setToAddress] = useState("");
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
                        const response = await fetch('http://localhost:3001/contacts');        
                        const contacts = await response.json();

                        setContacts(contacts);

                        const responseAddress = await fetch('http://localhost:3001/address');        
                        const address = await responseAddress.json();
                        setAddress(address);
                }
                

                fetcher();
        }, []);

  return (
    <div>
            <ul>
      {
              contacts.map(contact => (
                      <li key={contact.id}>
                              <p>Name: {contact.name}</p>
                              <span>Phone: {contact.phone}</span>
                      </li>
              ))
      }

      </ul>
      <div>
        <div>
                <h1> Shorter path between : {fromAddress} and {toAddress} </h1>
                
        </div>
        <List addressId={address} handleClick={handleClick} from={true}/>
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
        <button onClick={()=> {sendValueToBack()}}>send that money</button>
        </div>
      </div>
    </div>
  );
}

export default App;