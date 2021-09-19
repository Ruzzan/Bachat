import React,{useState,useEffect} from 'react';
import Item from './Item';
import {NAME_LIST} from './Data';

const Home = () => {
    const localData = JSON.parse(localStorage.getItem("name_list"));
    const [nameList,setNameList] = useState(localData||NAME_LIST);
    const [query,setQuery] = useState('');
    const [searchResult,setSearchResult] = useState(nameList);
    const [complete,setCompleted] = useState(false);
    const [collected,setCollected] = useState(0); // total no. of collection
    const [total,setTotal] = useState(0);
    const [uploading,setUploading] = useState(false);

    let fullDate = new Date().toISOString().slice(0, 10)
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let today = days[new Date().getDay()];

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
            setCollected(searchResult.length);
        } else {
            setSearchResult(nameList);
        }
    }

    const resetList = () => {
        const password = "1001";
        let inputPassword = prompt("Enter PIN");
        if(inputPassword===password) {
            localStorage.removeItem("name_list");
            window.location.reload();
        }
    }

    const uploadData = async () => {
        let password = "1337";
        let inputPassword = prompt("Enter PIN");
        if(inputPassword===password) {
        setUploading(true);
        let _data = {
            data:localStorage.getItem("name_list").toString(),
        }
        const response = await fetch("https://bachat.pythonanywhere.com/api/create/",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(_data)
        }
        );
        if(response.status===201) {
            setUploading(false)
            alert("Uploaded Successfully")
        } else {
            setUploading(false);
            alert("Failed");
        }
        }
        else {
            alert("Invalid PIN");
        }
    }

    return (
    <section id="container">
    {/* navbar */}
    <div className="nav__flex flex">
    <div className="date"> {fullDate} {today} </div>
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
    {!complete&&<h4>Collected From:{collected}</h4>}
    {searchResult.map((item)=>{
        return <Item data={item} key={item.id} addAmount={addAmount} />
    })}
    <div className="flex">
    <button className="toggle__btn black" onClick={resetList}>Reset ⛔</button>
    <button className="toggle__btn purple" disabled={uploading}
    onClick={uploadData}>{uploading?"Uploading 📤":"Upload 📤"}</button>
    </div>
    </div>
    </section>
    )
}

export default Home;