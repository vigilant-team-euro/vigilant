import React from 'react'
import "./employee.scss"
import Single from '../../components/single/Single'

function Employee() {
        //fetch and send to "single" component
        const singleUser = {
            id: 1,
            title: "John Doe",
            img: "",
            info: {
              fullname: "Efe Erkan",
              email: "johndoe@gmail.com",
              phone: "123 456 789",
              status: "verified",
            },
            chart: {
              dataKeys: [
                { name: "visits", color: "#82ca9d" },
                { name: "clicks", color: "#8884d8" },
              ],
              data: [
                {
                  name: "Sun",
                  visits: 4000,
                  clicks: 2400,
                },
                {
                  name: "Mon",
                  visits: 3000,
                  clicks: 1398,
                },
                {
                  name: "Tue",
                  visits: 2000,
                  clicks: 3800,
                },
                {
                  name: "Wed",
                  visits: 2780,
                  clicks: 3908,
                },
                {
                  name: "Thu",
                  visits: 1890,
                  clicks: 4800,
                },
                {
                  name: "Fri",
                  visits: 2390,
                  clicks: 3800,
                },
                {
                  name: "Sat",
                  visits: 3490,
                  clicks: 4300,
                },
              ],
            },
            activities: [
              {
                text: "John Doe purchased Playstation 5 Digital Edition",
                time: "3 day ago",
              },
              {
                text: "John Doe added 3 items into their wishlist",
                time: "1 week ago",
              },
              {
                text: "John Doe purchased Sony Bravia KD-32w800",
                time: "2 weeks ago",
              },
              {
                text: "John Doe reviewed a product",
                time: "1 month ago",
              },
              {
                text: "John Doe added 1 items into their wishlist",
                time: "1 month ago",
              },
              {
                text: "John Doe reviewed a product",
                time: "2 months ago",
              },
            ],
          };
  return (
    <div className='employee'>
        <Single {...singleUser}/>
    </div>
  )
}

export default Employee