import React,{useState,useEffect} from 'react';
import Item from './Item';
import {NAME_LIST} from './Data';

const Home = () => {
    const localData = JSON.parse(localStorage.getItem("name_list"));
    const [nameList,setNameList] = useState(localData||NAME_LIST);
    const [query,setQuery] = useState('');
    const [searchResult,setSearchResult] = useState(nameList);
    const [complete,setCompleted] = useState(false);
    const [total,setTotal] = useState(0);
    
    let date = new Date().getMonth()
    console.log(date)

    useEffect(() => {
        localStorage.setItem("name_list",JSON.stringify(nameList));
        let totalAmount = nameList.map((item)=>item.amount).reduce((sum,number)=>{
            return sum+number
        },0);
        setTotal(totalAmount);
    },[nameList])

    const addAmount = (id,amount) => {
        let currentPerson = nameList.find((person)=>id===person.id);
        currentPerson.amount = amount;
        setNameList([...nameList]);
    }

    const searchName = (event) => {
        setQuery(event.target.value)
        const searchResult = nameList.filter((person)=>person.name.toLowerCase().includes(query.toLowerCase()));
        setSearchResult(searchResult);
        if(event.target.value==='') {
            setSearchResult(nameList);
        }
    }

    const toggleList = () => {
        setCompleted(!complete);
        if(complete) {
            const searchResult = nameList.filter((person)=>person.amount!==0);
            setSearchResult(searchResult);
        } else {
            setSearchResult(nameList);
        }
    }

    const resetList = () => {
        const password = "1001";
        let inputPassword = prompt("Enter Pin");
        if(inputPassword===password) {
            const newList = nameList.map((person)=>{
                return {...person,amount:0}
            });
            setNameList([...newList]);
            window.location.reload();
        }
    }

    return (
    <section id="container">
    {/* navbar */}
    <div className="nav__flex flex">
    <div className="date">05/20 Wednesday</div>
    <div className="search">
    <input type="search" placeholder="Name.." onChange={searchName}
    value={query}/>
    </div>
    </div>
    {/* name list */}
    <div className="list">
    {/* total & complete toggle*/}
    <div className="flex">
    <h4 id="total">Total: {total}</h4> 
    <button className={complete?"toggle__btn":"toggle__btn active"} onClick={toggleList}>Completed</button>
    </div>
    {searchResult.map((item)=>{
        return <Item data={item} key={item.id} addAmount={addAmount} />
    })}
    <div className="flex">
    <button className="toggle__btn black" onClick={resetList}>Reset ⛔</button>
    </div>
    </div>
    </section>
    )
}

export default Home;