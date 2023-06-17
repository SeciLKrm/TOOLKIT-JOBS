import { useState } from "react"
import { statusOptions , typeOptions} from "../constants"
import axios from "axios"
import { addNewJob } from "../app/jobSlice"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

const AddJob = () => {
  const navigate =useNavigate()
 
const dispatch = useDispatch()

const [formState,setFormState]=useState({
  id: new Date().getTime(),
  position : '',
  company :'',
  location : '',
  status : 'Mülakat',
  type : 'Tam Zamanlı',
  date : new Date().toLocaleString()

})
console.log(formState)

const handleAdd =(e)=>{
  e.preventDefault()

if(!formState.position || !formState.location || !formState.company)
{
  toast.warn('Bu alan boş bırakılamaz')
  return 
}

 axios.post('http://localhost:3030/jobs',formState)
  .then(()=>dispatch(addNewJob(formState)), navigate('/')),
  toast.success('Başarıyla Eklendi')

}


  return (
    <section className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form  onSubmit={handleAdd}>
        <div className="input-field">
     <label> Pozisyon</label>
     <input type="text" onChange={(e)=>setFormState({...formState, position: e.target.value })} />
        </div>
        <div className="input-field">
     <label>Şirket</label>
     <input type="text" onChange={(e)=>setFormState({...formState, company: e.target.value })} />
        </div>
        <div className="input-field">
     <label>Lokasyon </label>
     <input type="text" onChange={(e)=>setFormState({...formState, location: e.target.value })} />
     </div>
     <div className="input-field">
     <label>Durum </label>
 <select> <input type="text" onChange={(e)=>setFormState({...formState, status : e.target.value})} /> 
 {statusOptions.map((opt)=> <option key={opt.value}> {opt.label} </option>
  )}
 </select>
        </div>
        <div className="input-field">
     <label>Tür </label>
 <select> <input type="text" onChange={(e)=>setFormState({...formState, type : e.target.value})} /> 
 {typeOptions.map((opt)=> <option key={opt.value}> {opt.label} </option>
  )}
 </select>
        </div>
        <button>Ekle</button>
        
      </form>

    </section>
  )
}

export default AddJob