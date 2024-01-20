import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

interface AdminProps {
  bookedJourney: string[];
  id: string;
  name: string;
  user: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  address: string;
  isDeleted: boolean;
}

function AdminsData() {

  const [admins, setAdmins] = useState<AdminProps[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const response = fetch(siteConfig.backendServer.address + '/user/get-admins', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "" + session?.accessToken
      }
    })
      .then(response => response.json())
      .then(data => setAdmins(data?.data))
      .catch(err => console.log(err))
  }, [session?.accessToken])

  return (
    <div>
      {admins.map(admin => (
        <div key={admin.id}>
          <h2>{admin.name}</h2>
          <p>Email: {admin.email}</p>
          <p>Contact No: {admin.contactNo}</p>
          <p>Gender: {admin.gender}</p>
          <p>Date of Birth: {admin.dateOfBirth}</p>
          <p>Address: {admin.address}</p>
          <p>Booked Journey: {admin.bookedJourney.join(', ')}</p>
          <p>User: {admin.user}</p>
          <p>Is Deleted: {admin.isDeleted ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  )
}

export default AdminsData