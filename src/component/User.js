import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';


const User = () => {

    
const userData = useLoaderData();

    const [displayUsers, setDisplayUsers] = useState(userData);

    const [insertUser, setInsertUser] = useState({})

    
    
    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        console.log(insertUser);

        fetch('http://localhost:5000/users',{
            method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(insertUser)
        })
        .then(res => res.json())
        .then(data=> {
            if(data.acknowledged){
                alert('user added successfully');
                form.reset()
            }
        });

        const updatedUserForUi = [...displayUsers,insertUser];
        setDisplayUsers(updatedUserForUi);

    }

    const handleOnBlur = event => {
        const name = event.target.name;
        const value = event.target.value;
        const newUser = {...insertUser};
        newUser[name] = value;
        setInsertUser(newUser);
        
    }

    const handleOnClick =(user)=> {
        const agree = window.confirm(`Are you sure you want to delite: ${user.name}`);

        if(agree){
            fetch(`http://localhost:5000/users/${user._id}`,{
                method: 'delete'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                   const remaining = displayUsers.filter(usr => usr._id !== user._id);
                   console.log(remaining);
                   setDisplayUsers(remaining);
                }
            })
        }


        
    }
    return (
        <div>
            <h3>Insert user to database</h3>
            <form onSubmit={handleSubmit}>
                <input onBlur={handleOnBlur} type='text' placeholder='enter your name' name='name'/>
                <input onBlur={handleOnBlur} type='text' placeholder='enter your adress' name='adress'/>
                <input onBlur={handleOnBlur} type='email' placeholder='enter your email' name='email'/>
                <button type="submit">Submit</button>
            </form>
            user: {displayUsers.length}
            {displayUsers.map(user =><div key={user._id}>
                <p>Name:{user.name}</p><button><Link to={`/update/${user._id}`}>Update user info</Link></button><button onClick={()=>handleOnClick(user)}>X Delete User</button>
                <p>Email:{user.email}</p>
                <p>Adress:{user.adress}</p>
                <p>ID:{user._id}</p>
            </div>)}
        </div>
    );
};

export default User;