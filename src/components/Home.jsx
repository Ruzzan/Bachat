import React,{useState,useEffect} from 'react';
import Item from './Item';
import {NAME_LIST} from './Data';

const Home = () => {
    const localData = JSON.parse(localStorage.getItem("name_list"));
    const [nameList,setNameList] = useState(localData||NAME_LIST);
    const [total,setTotal] = useState(0);
    console.log(nameList)
    useEffect(() => {
        const saveData = () => {
          localStorage.setItem("name_list",JSON.stringify(nameList));
          let totalAmount = nameList.map((item)=>item.amount).reduce((sum,number)=>{
            return sum+number
        },0);
        setTotal(totalAmount);
        }
        saveData();
    },[nameList])

    const addAmount = (id,amount) => {
        let currentPerson = nameList.find((person)=>id===person.id);
        currentPerson.amount = amount;
        setNameList([...nameList]);
    }

    return (
    <section id="container">
    {/* navbar */}
    <div className="nav__flex">
    <div className="date">05/20 Wednesday</div>
    <div className="search">
    <input type="search" placeholder="Name.."/>
    </div>
    </div>
    {/* name list */}
    <div className="list">
    {/* total */}
    <h4 id="total">Total: {total}</h4>
    {nameList.map((item)=>{
        return <Item data={item} key={item.id} addAmount={addAmount} />
    })}
    </div>
    </section>
    )
}

export default Home;