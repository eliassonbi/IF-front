import { React, useState } from 'react'
import './style.css'
import styled from 'styled-components';
import ReactDOM from 'react-dom/client';


const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 25.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #3faffa;
  background: #ffffff;
 
  text-align: center;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 5px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

function List(props) {
    let count=0;
    const [buyer, setBuyer] = useState(false);
    return (
        <ul>
            <DropDownContainer>
                        <DropDownHeader onClick={() => setBuyer(!buyer)}>At whom sell</DropDownHeader>
                      {buyer &&  <DropDownListContainer>
                        <DropDownList>
            {
            props.addressId.map( (addressId, count) => {
                    count++;
                    return (
                        count <= 6 ?          
                        <ListItem onClick={event => props.handleClick(event, addressId, props.from)}>{addressId}</ListItem>             
                        :null
                    );

            })
        }
         </DropDownList>
                        </DropDownListContainer> }

                      </DropDownContainer>
        </ul>
    )
}

export default List