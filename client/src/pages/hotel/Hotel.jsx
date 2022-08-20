import React, { useContext, useState } from 'react'
import './hotel.css'
import {Navbar} from '../../components/navbar/Navbar'
import { Header } from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import {Reserve} from '../../components/reserve/Reserve'

export const Hotel = () => {
  const location= useLocation().pathname.split("/")
  const navigate= useNavigate()
  const id = location[location.length-1]
  const {data, loading, error, reFetch} = useFetch(`/hotels/find/${id}`)
  const [slideNumber, setSliderNumber] = useState(0)
  const [open, setOpen] =useState(false)
  const [openReservePage, setOpenReservePage] = useState(false)
  const handleOpen = (i)=>{
    setSliderNumber(i);
    setOpen(!open);
  }
  const handleMove = (direction)=>{
    let newSlideNumber = direction==="l"? (data.photos.length+slideNumber-1)%data.photos.length: (slideNumber+1)%data.photos.length
    setSliderNumber(newSlideNumber)
  }
  const {dates, options}= useContext(SearchContext)
  const {user} = useContext(AuthContext)
  const MILLISECONDS_PER_DAY = 1000*60*60*24;
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2.getTime()-date1.getTime())
    const diffDays = Math.ceil(timeDiff/MILLISECONDS_PER_DAY)
    return diffDays;
  }
  const handleClick= () =>{
    if(user){
      setOpenReservePage(true)
    }
    else{
      navigate("/login")
    }
  }
  const days =dayDifference(dates[0].endDate, dates[0].startDate);
  return (

    <div>
      <Navbar/>
      <Header type="list"/>
      {(loading)? ("Loading"):
        (<div className="hotelContainer">
          {open&&
          <div className="slider" >
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
            <div className="sliderWrapper">
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={(i)=>handleMove("l")}/>
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={(i)=>handleMove("l")}/>
            </div>
          </div>
          }
          <div className="hotelWrapper">
            <button className="bookNow" onClick={()=>handleClick()}>Reserver or book now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocation}/>
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">Excellent location - {data.distance}m from center</span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i)=>(
                <div className="hotelImageWrapper">
                  <img
                    onClick={()=>handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <p className="hotelDesc">
                  {data.description}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay</h1>
                <span>Located in the real hesrt of Krakow, this property
                  has an excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data.cheapestPrice*days*options.room}</b> (9 nights)
                </h2>
                <button onClick={()=>handleClick()}>Reserve or Book Now! </button>
              </div>
            </div>
          </div>

          <MailList/>
          <Footer/>
        </div>
        )}
        {openReservePage && <Reserve setOpen={setOpenReservePage} hotelId = {id} />}
    </div>
  )
}
