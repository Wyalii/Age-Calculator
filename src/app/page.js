'use client'
import { useState } from "react";

export default function Home() {
 const [day,setDay] = useState("")
 const [month,setMonth] = useState("")
 const [year,setYear] = useState("")
 const [age,setAge] =useState({years: 0, months: 0, days: 0})
 const currentYear = new Date().getFullYear();
 const currentMonth = new Date().getMonth() + 1
 const [error,setError] = useState(false)
 const [errorMessage,setErrorMessage] = useState("")
 
 
 function handleDayBlur(){ 
  const value = Number(day)
  if(value < 1){
    
    setDay("")
  }else if(value > 31){ 
    
    setDay("")
  }else if(!value){ 
    setError(true) 
    setErrorMessage("need day to calculate.")
  }else{ 
    setError(false)
    setDay(value)
  }
 }

 function handleDayChange(e){ 
  let value = e.target.value
  setDay(value)
 }

 function handleMonthBlur(){ 
  const value = Number(month)
  if(value < 1){ 
    setMonth("")
  }else if(value > 12){ 
    setMonth("")
  }else if(!value){ 
    setError(true) 
    setErrorMessage("need month to calculate.")
  }else{ 
    setError(false)
    setMonth(value)
  }
 }

 function handleMonthChange(e){ 
  let value = e.target.value
  setMonth(value)
 }

 function handleYearChange(e){ 
  setYear(e.target.value)
 }
  function handleYearBlur(){ 
    const value = Number(year)
    if(value < 1900){ 
      setYear("")
    }else if( value > currentYear){ 
      setYear("")
    }else if(!value){ 
      setError(true)
      setErrorMessage("need year to calculate")
    }else{ 
      setYear(value)
    }
  }



 
  function calculateAge() { 
    let dayValue = Number(day);
    let monthValue = Number(month);
    let yearValue = Number(year);
    let currentDate = new Date();
    let birthDate = new Date(yearValue, monthValue - 1, dayValue);
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate(); // Corrected from getDay() to getDate()
  
    // Check if any age component is NaN
    
    if (!dayValue || !monthValue || !yearValue) {
      setError(true);
      setErrorMessage("All fields are required to calculate age.");
      return;
    }
  
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  
    // Adjust days and months if the current day is before the birth day
    if (ageDays < 0) {
      ageMonths--;
      let previousMonth = currentMonth === 1 ? 11 : currentMonth - 2;
      let daysInPreviousMonth = new Date(currentYear, previousMonth + 1, 0).getDate();
      ageDays += daysInPreviousMonth;
  
      if (ageMonths < 0) {
        ageMonths += 12;
        ageYears--;
      }
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
    console.log(age);
   
  
  }
  

  return (
    <div className="website">

        <main className="container">
          <header className="input-container">
             
             <div className="box">
             <div className="input-box">
                <p>day</p>
                <input type="number" className="input" min={1} max={31} value={day} onBlur={(e)=> handleDayBlur(e)} onChange={(e) => handleDayChange(e)}></input>
              </div>

              <div className="input-box">
                <p>month</p>
                <input type="number" className="input" value={month} onBlur={(e)=> handleMonthBlur(e)} onChange={(e)=> handleMonthChange(e)} ></input>
              </div>

              <div className="input-box">
                <p>year</p>
                <input type="number" className="input" value={year} onChange={(e)=> handleYearChange(e)} onBlur={handleYearBlur}></input>
              </div>
              
              
             </div>
             
             <br></br>
             <hr></hr>
             <button className="button" onClick={(day,month,year)=> calculateAge(day,month,year)}>Calculate</button>
              
          </header>
          
          <div className="age">
          
           <div className="text"><div className="idk">{age.years}</div> <div className="purple">Years</div></div>
          <div className="text"><div className="idk">{age.months}</div> <div className="purple">Months</div></div>
          <div className="text"><div className="idk">{age.days}</div> <div className="purple">Days</div></div>
          

          </div>

          { 
            error ? <div className="error">{errorMessage}</div>:null
          }
        </main>

    </div>
  );
}
