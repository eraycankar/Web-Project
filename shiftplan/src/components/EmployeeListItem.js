import React from 'react';
import {Link} from 'react-router-dom'
import ProfileImageWithDefault from './ProfileImageWithDefault'

const EmployeeListItem = (props) => {
    const {user} = props;
    const {username , email,image} = user;

    return (
        <Link  to = {`/user/${username}`} className ="list-group-item list-group-item-action" >
            <ProfileImageWithDefault className = "rounded-circle shadow-sm" width="30" height="30" alt ={`${username}'s profile`} image= {image} />
            <span className ="pl-2">
                {username}
                <span className="pl-4">{email}</span> 
            </span>
            
        </Link>    
    );
};

export default EmployeeListItem;