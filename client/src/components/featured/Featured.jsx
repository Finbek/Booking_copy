import React from 'react'
import useFetch from '../../hooks/useFetch'
import "./featured.css"
const Featured = () => {
  const {data, loading, error} = useFetch("hotels/countByCity?cities=Berlin,London,Madrid")

  return (
    <div className='featured'>
      {loading? ("Loading please wait"):
        (
        <>
        <div className="featuredItem">
          <img src="https://www.lottehotelmagazine.com/resources/642a5cf2-ff9c-4ff2-ac23-1adde49c285d_img_art_tashkent_detail01.jpg" alt="Tashkent city" className="featuredImg" />
          <div className="featuredTitles">
            <h1>Tashkent</h1>
            <h2>{data[0]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img src="https://see.news/wp-content/uploads/2022/07/samarkand-free-walking-tour-01.jpg" alt="Samarkand city" className="featuredImg" />
          <div className="featuredTitles">
            <h1>Samarkand</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ30WdniGl3fl0IZ6Ir-VuIeFqIL6BZXZOMh4jhJ7tATMNNH9L6oo-D6T3z4ySQ9b5Gjzo&usqp=CAU" alt="Qarshi city" className="featuredImg" />
          <div className="featuredTitles">
            <h1>Qarshi</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
      </>)}
    </div>
  )
}

export default Featured