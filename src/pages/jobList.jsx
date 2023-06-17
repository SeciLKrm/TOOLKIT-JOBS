import axios from "axios"
import { useEffect } from "react"
import { useDispatch , useSelector} from "react-redux"
import { setJobs } from "../app/jobSlice"
import Filter from "../components/Filter"

const JobList = () => {
const dispatch =useDispatch()
 const state =useSelector((store)=>store.jobReducer )
useEffect(()=>{
    axios.get('http://localhost:3030/jobs')
    .then((res)=>
    dispatch(setJobs(res.data)))
},[])

  return (
    <div>
     <Filter/>
   <h3 className="job-count"> ({state.jobs.length}) iş arasından ({state.filteredJobs.length})  tanesini görüntülüyorsunuz </h3>

   <section className="list-section">
{!state.initialized  ?
(<p> Loading... </p>) : (
    state.filteredJobs.map((job)=>(
       <div key={job.id} className="job-card">
     <div className="head">
        <div className="letter">{job.company[0]}  </div>
        <div className="info">
            <p>{job.company} </p>
            <p> {job.position} </p>
        </div>
     </div>
     <div className="body">
        <div className="field"> 
        <img src="/images/map.png" alt="" />
        <p>{job.location} </p>
        </div>
        <div className="field" >
            <img src="/images/calendar.png" alt="" />
            <p>{job.date} </p>
        </div>
        <div className="field">
            <img src="/images/bag.png" alt="" />
            <p>{job.type} </p>
        </div>
        <div className="status">
            <span className={job.status} >{job.status} </span>
        </div>

     </div>
       </div>
    ) )
)}
  </section>
    </div>
  )
}

export default JobList