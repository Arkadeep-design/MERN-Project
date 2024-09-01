import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
const AdminLayout = () => {
  return (
    <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to="/admin/users"><FaUsers/>Users</NavLink></li>
                        <li><NavLink to="/admin/contacts"><MdContacts />Contacts</NavLink></li>
                        <li><NavLink to="/service"><GrServices />Services</NavLink></li>
                        <li><NavLink to="/"><FaHome />Home</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet />
    </>
  )
}

export default AdminLayout