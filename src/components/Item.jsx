import React,{useState,useEffect} from 'react';

const Item = ({data,addAmount}) => {
    const [amount,setAmount] = useState('');
    const [typing,setTyping] = useState(false);
    
    useEffect(()=>{
        const loadAmount = async () => {
           await setAmount(data.amount!==0?data.amount:0);
        }
        loadAmount();
    },[])

    const handleChange = (event) => {
        setAmount(parseInt(event.target.value));
        setTyping(true);
    }

    return (
    <div className="item">
    <p>{data.name}</p> 
    <input className="amount__input" type="number" placeholder="Amount" 
    onChange={handleChange} defaultValue={amount}/>
    <button className="save__btn" 
    onClick={()=>{addAmount(data.id,amount);setTyping(false)}}>
    {typing ? '💾' : '📝'}
    </button>
    </div>
    )
}

export default Item;