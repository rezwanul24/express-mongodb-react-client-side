import React, { useState } from 'react';
import {  useLoaderData } from 'react-router-dom';

const UpdateUser = () => {

    const getData = useLoaderData();

    const [userData, setUserData] = useState({});

    const handleSubmit =(event)=> {
        event.preventDefault();
        // console.log(userData);

        fetch(`http://localhost:5000/update/${getData._id}`,{
            method: 'put',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(userData)
        })
        .then(res=> res.json())
        .then(data=> {
            if(data.modifiedCount > 0){
                alert('user updatde succecfully')
            }
        });
    }

    const handleOnChange=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        const updateData = {...userData};
        updateData[name] = value;
        setUserData(updateData);

    }

    return (
        
        <div>
            <h3>Update user to database</h3>
            <form onSubmit={handleSubmit}>
                <p>Id: {getData._id}</p>
                <input onBlur={handleOnChange}  defaultValue={getData.name} type='text' placeholder='enter your name' name='name'/>
                <input onBlur={handleOnChange} defaultValue={getData.adress} type='text' placeholder='enter your adress' name='adress'/>
                <input onBlur={handleOnChange} defaultValue={getData.email} type='email' placeholder='enter your email' name='email'/>
                <button type="submit">Update</button>
            </form>
            
        </div>
    );
};

export default UpdateUser;