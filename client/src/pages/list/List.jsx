import React, { useContext, useState } from 'react'
import './list.css'

import { Header } from '../../components/header/Header'
import { Navbar } from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import { SearchItem } from '../../components/SearchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'

export const List = () => {
  const location=  useLocation()
  location.state = location.state? location.state: {
    destination:"",
    date: {startDate: new Date(), endDate: new Date(), key: 'selection'},
    options: {adult: 1,
      children: 0,
      room:1}}
  const [destination, setDestination] = useState(location.state.destination)
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState(location.state.date)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(9999)

  const {dispatch} = useContext(SearchContext)
  const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min}&max=${max}`)
  const handleSearch = ()=>{
      dispatch({type:"NEW_SEARCH", payload: {destination, date, options}})
      reFetch()
  }
  return (
    <div><Navbar/>
    <Header type="list"/>
    <div className="listContainer"></div>
      <div className="listWrapper">
        <div className="listSearch">
          <h1 className="lsTitle">Search</h1>
          <div className="lsItem">
            <label>Destination</label>
            <input type="text" placeholder={destination} onChange={(e)=>setDestination(e.target.value)} />
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={()=>{setOpenDate(!openDate)}}>{`${format(date[0].startDate, "MM/dd/yy")} to ${format(date[0].endDate, "MM/dd/yy")}`}</span>
            {openDate && <DateRange onChange={(item)=>setDate([item.selection])}
            minDate = {new Date}
            ranges= {date}/>}
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOptions">
              <div className="lsOptionItem">
                <span className='lsOptionText'>Min price <small>(per night)</small></span>
                <input type="number" min={0} className="lsOptionInput" onChange={e=>setMin(e.target.value)}/>
              </div>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Max price <small>(per night)</small></span>
                <input type="number" className="lsOptionInput" onChange={e=>setMax(e.target.value)} />
              </div>
              <div className="lsOptionItem">
                <span className='lsOptionText' >Adult </span>
                <input type="number" min ='1' className="lsOptionInput" placeholder={options.adult}/>
              </div>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Children</span>
                <input type="number" min = '0' className="lsOptionInput" placeholder={options.children}/>
              </div>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Room</span>
                <input type="number" min ='1' className="lsOptionInput" placeholder={options.room}/>
              </div>
            </div>
          </div>
          <button onClick={()=>handleSearch()}>Search</button>
        </div>
        <div className="listResult">
          {loading? "Loading":
          <>
            {data.map(item=>(
              <SearchItem item={item} key={item._id}/>
            ))}
          </>
          }

        </div>
      </div>
    </div>
  )
}
