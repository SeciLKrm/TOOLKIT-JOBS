import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    jobs :[],
    filteredJobs :[],
    initialized : false
}

const jobSlice = createSlice({
    name : "jobSlice",
    initialState,
    reducers : {
        setJobs : (state,action)=> {
      state.jobs = action.payload
      state.filteredJobs= action.payload
       state.initialized = true
        },
        addNewJob :(state,action)=>{
            // eklenen job'ları en üstte konumlandırır.
            state.jobs.unshift(action.payload)
        },
    
      filterByStatus :(state,action)=>{
     // aksiyonun payload değeriyle gelen status değerine eşit olan elemanlarla yeni bir dizi oluştur
      const filteredJobs = state.jobs.filter((job)=> job.status === action.payload)
       // kopya diziyi güncelleme
      state.filteredJobs = filteredJobs
      },
       // tipe göre filtreleme
      filterByTypes : (state, action)=>{
       const filteredArr = state.jobs.filter((job)=>job.type === action.payload)
       state.filteredJobs = filteredArr

      },
       // inputa göre filtreleme
       handleSearch :(state,action)=>{
        // console.log(action.payload)

        /*1- Hem arama terimini hem karşılaştırma
         hem yaptığımız şirketin isimini küçük harfe çevir
        a - arama terimini döngü içerisinde küçük harfe çevirmek
        - - performansı etkileyeceğinden yukarıda çevirdik  
        */
        // ? arama terimini küçük harfe çevirme
        const query = action.payload.toLowerCase()
 // aksiyonla gelen arama terimiyle eşleşen objelerle yeni bir dizi oluştur
        const filteredArr = state.jobs.filter((job)=>
        job.company.toLowerCase().includes(query))
        
        state.filteredJobs = filteredArr
       },
   
       sortState : (state,action)=> {
    //    alert(action.payload)
    switch(action.payload){
        case "a-z" : 
        state.filteredJobs.sort((a,b)=>{
            if(a.company < b.company) return -1
            if(a.company > b.company) return 1 
            return 0
           
        })
        break
        case "z-a" :
          state.filteredJobs.sort((a,b)=>{
         if(b.company < a.company) return -1 
         if(b.company > a.company) return 1
         return 0
        })
        break
        case "En Yeni":
        state.filteredJobs.sort((a,b)=>(   
        new Date(b.date) - new Date (a.date)
        ))
        break
        case "En Eski ":
        state.filteredJobs.sort((a,b)=>( 
            new Date (a.date) - new Date(b.date)
        ))
        break
        default:
            break
    }
   },
   handleClear :(state,action) =>{
    state.filteredJobs = state.jobs
   }
},




})
  
export const {setJobs,  addNewJob, filterByStatus, 
    filterByTypes ,handleSearch, sortState,  handleClear   } = jobSlice.actions
export default jobSlice.reducer