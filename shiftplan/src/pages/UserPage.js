import React,{useState, useEffect} from 'react';
import ProfileCard from '../components/ProfileCard'
import {getUser} from '../api/apiCalls'
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';

const UserPage = () => {

    const[user,setUser]= useState({});
    const [notFound,setNotFound] = useState(false);
    const {username} = useParams();
    const {t} = useTranslation();

    const pendingApiCall = useApiProgress('get','/api/1.0/users/'+ username);

    

    useEffect(() => {
        const loadUser = async () => {
            try{
                const response =   await getUser(username);
                setUser(response.data);
                setNotFound(false);
            } catch(error) {
                setNotFound(true);
            }
        }
        loadUser();
    },[username])

    if(pendingApiCall){
        return(
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-balck-50">
            </div>
         </div>
        );}

    if(notFound){
        return(
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                    <span className="material-icons">
                        error
                    </span>
                    </div>
                    {t('User not found')}
                 </div>
            </div>
            
        )
    }
    
    return (
        <div className = "container">
            <ProfileCard user = {user}/>
        </div>
    );
};

export default UserPage;