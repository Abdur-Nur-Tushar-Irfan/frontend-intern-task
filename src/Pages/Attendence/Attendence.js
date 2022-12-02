import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Attendence = () => {
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch('http://localhost:5000/users')
            .then(res => res.json())
    })
    return (
        <div className="overflow-x-auto">
            <h1 className='text-3xl font-bold'>Attendence Table</h1>
            <table className="table w-full">
           
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user,i)=> <tr>
                            <th>{i+1}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.number}</td>
                            <td>{user.email}</td>
                        </tr>)
                    }
                
                  
                   
                </tbody>
            </table>
        </div>
    );
};

export default Attendence;