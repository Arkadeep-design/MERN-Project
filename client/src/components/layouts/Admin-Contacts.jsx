import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth'
import { toast } from 'react-toastify';


const AdminContacts = () => {
    const [contactData, setContactData] = useState([])
    const {authorizationToken} = useAuth();
   const getContactsData = async() => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/contacts',{
          method: "GET",
          headers:{
            Authorization : authorizationToken,
          }
        })

        const data = await response.json();
        if(response.ok){
          setContactData(data);
        }
      } catch (error) {
        console.log(error);
      }
   }

   const deleteContactById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
        method: 'DELETE',
        headers:{
          Authorization: authorizationToken,
        },
      })

      if(response.ok){
        getContactsData()
        toast.success("Deleted successfully")
    }
    else{
        toast.error("Not deleted");
    }
    } catch (error) {
      console.log(error);
    }
   }  

  useEffect(() => {
    getContactsData();
  },[])

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data</h1>

        <div className="container admin-users">
          {contactData.map((curr,i)=> {
            const {username,email, message, _id}= curr;
            return (
              <div key={i}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className='btn' onClick={()=> deleteContactById(_id)}>delete</button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default AdminContacts