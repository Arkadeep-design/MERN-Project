import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import { toast } from 'react-toastify'

const AdminUpdate = () => {
    const [data,setData] = useState({
        username:"",
        email:"",
        phone:"",
    })

    const params = useParams();
    const {authorizationToken} = useAuth();

    const getSingleUserData = async (id) => {
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
          method: "GET",
          headers:{
            Authorization: authorizationToken,
          },
        })
        const data = await response.json();
        console.log(`users single data: ${data}`);

        setData(data)
    
        // if(response.ok){
        //   getAllUsersData();
        // }
      }

    useEffect(()=> {
        getSingleUserData();
    },[])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data, 
            [name]:value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, 
            {
                method: "PATCH",
                headers:{
                    'Content-Type':"application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(data),
            }
        )
        if(response.ok){
            toast.success("Updated successfully")
        }
        else{
            toast.error("Not updated");
        }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-header">
            Update User Data
          </h1>
        </div>

        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input type="text" name="username" id='username' autoComplete='off' required value={data.username} onChange={handleInput}/>
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id='email' autoComplete='off' required value={data.email} onChange={handleInput}/>
              </div>

              <div>
                <label htmlFor="phone">email</label>
                <input type="phone" name="phone" id='phone' autoComplete='off' required value={data.phone} onChange={handleInput}/>
              </div>
              <div>
                <button type='submit'>Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  )
}

export default AdminUpdate