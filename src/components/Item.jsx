import React,{useState,useEffect} from 'react';

const Item = ({data,addAmount}) => {
    const [amount,setAmount] = useState('');
    
    useEffect(()=>{
        const loadAmount = () => {
            setAmount(data.amount);
        }
        loadAmount();
    },[])

    const handleChange = (event) => {
        setAmount(parseInt(event.target.value));
    }

    return (
    <div className="item">
    <p>{data.name}</p> 
    <input className="amount__input" type="number" placeholder="Amount" 
    onChange={handleChange} defaultValue={data.amount!==0||data.amount===''?data.amount:0}
    value={amount} />
    <button className="save__btn" onClick={()=>addAmount(data.id,amount)}>&#128221;</button>
    </div>
    )
}

export default Item;