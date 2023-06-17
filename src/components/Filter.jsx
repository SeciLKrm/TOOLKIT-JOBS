import { useDispatch } from "react-redux"
import { statusOptions , typeOptions, sortOptions} from "../constants"
import { filterByStatus, filterByTypes,
     handleSearch, sortState, handleClear   } from "../app/jobSlice"
import { useRef } from "react"

const Filter = () => {
    const inputRef = useRef()
    const statusRef = useRef() 
    const typeRef =useRef()  
    const sortRef =useRef()
const dispatch = useDispatch()

 const handleChange =(e)=>{
  dispatch(handleSearch(e.target.value))
 }

const handleStatusChange=(e)=>{
 dispatch (filterByStatus(e.target.value))
}

const handleTypeChange =(e)=>{
  dispatch(filterByTypes(e.target.value))
}

const handleSortChange = (e) =>{
    dispatch(sortState(e.target.value))
}

const handleClick = (e) => {
    e.preventDefault();
    // inputun içerisini temizleme
     inputRef.current.value = '';
     statusRef.current.value= 'Durum Seçiniz';
     typeRef.current.value = "Type Seçiniz";
     sortRef.current.value ="a-z"
   //  temizleme eylemini(action) çalıştırma
    dispatch(handleClear());
  };

return (
    <section className="filter-sec">
        <h2>Filtreleme Formu </h2>
        <form >
    <div className="input-field">
      <label > Arama </label>
        <input type="text"  onChange={handleChange}
        ref={inputRef}/>
    </div>

    <div className="input-field">
    <label > Durum </label>
     <select  onChange={handleStatusChange} ref={statusRef}  >
    <option selected hidden  >
    Durum Seçiniz
    </option>
    {
    statusOptions.map((opt)=>
    <option key={opt.id} value={opt.label}> {opt.label} </option>
          ) 
    }
   </select>
   </div>

    <div className="input-field">
        <label > Tip </label>
     <select onChange={handleTypeChange} ref={typeRef}>
        <option selected hidden>
            Type Seçiniz
        </option>
   {typeOptions.map((opt)=>
   <option value={opt.label} key={opt.id}> {opt.label}</option>
   )}
</select>
</div>

    <div className="input-field">
        <label > Sırala</label>
     <select  onChange={handleSortChange} ref={sortRef}>
        {
          sortOptions.map((opt)=>
           <option key={opt.id} value={opt}> {opt} </option>
          ) 
        }
        </select>
    </div>
    <button onClick={handleClick}>Filtreleri Temizle</button>   
        </form>
 
    </section>
  )
}

export default Filter