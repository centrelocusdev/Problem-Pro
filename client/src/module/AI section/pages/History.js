import Index from "../container/History"
import { useLocation } from 'react-router-dom';


const History=({_id})=>{
    
    const location = useLocation();
    return(
        <Index _id={location.state._id}/>
    )
}

export default History