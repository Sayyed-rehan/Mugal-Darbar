
//  localStorage.setItem('tableBooked', JSON.stringify(0))

// export const tableNo = JSON.parse(localStorage.getItem('tableBooked')) ||  localStorage.setItem('tableBooked',JSON.stringify(0))
 {JSON.parse?(localStorage.getItem('tablBooked'))  : localStorage.setItem('tableBooked',JSON.stringify(0))}
 export const tableNo = JSON.parse(localStorage.getItem('tableBooked'));


