import React from 'react'
import "./store.scss"
import Single from '../../components/single/Single'

function Store() {
    //fetch and send to "single" component
    const singleProduct = {
        id: 1,
        title: "Bilkent Casino",
        img: "https://fastly.4sqi.net/img/general/200x200/83521111_Dwl9xfMERw9GaxjMlI5RIpyHFJmsGm8ureHoL_13fKw.jpg",
        info: {
          status: "Available", // replace with actual status
          location: "Ankara, Turkey", // replace with actual location
          createdAt: "2022-01-01", // replace with actual creation date
          storeId: "ST123", // replace with actual store ID
        },
        chart: {
          dataKeys: [
            { name: "visits", color: "#82ca9d" },
            { name: "orders", color: "#8884d8" },
          ],
          data: [
            {
              name: "Sun",
              visits: 4000,
              orders: 2400,
            },
            {
              name: "Mon",
              visits: 3000,
              orders: 1398,
            },
            {
              name: "Tue",
              visits: 2000,
              orders: 3800,
            },
            {
              name: "Wed",
              visits: 2780,
              orders: 3908,
            },
            {
              name: "Thu",
              visits: 1890,
              orders: 4800,
            },
            {
              name: "Fri",
              visits: 2390,
              orders: 3800,
            },
            {
              name: "Sat",
              visits: 3490,
              orders: 4300,
            },
          ],
        },
        activities: [
          {
            text: "John Doe purchased Playstation 5 Digital Edition",
            time: "3 day ago",
          },
          {
            text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
            time: "1 week ago",
          },
          {
            text: "Mike Doe purchased Playstation 5 Digital Edition",
            time: "2 weeks ago",
          },
          {
            text: "Anna Doe reviewed the product",
            time: "1 month ago",
          },
          {
            text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
            time: "1 month ago",
          },
          {
            text: "Helen Doe reviewed the product",
            time: "2 months ago",
          },
        ],
      };
  return (
    <div className='store'>
         <Single {...singleProduct}/>
    </div>
  )
}

export default Store