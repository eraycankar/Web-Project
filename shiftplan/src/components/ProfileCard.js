import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import ProfileImageWithDefault from './ProfileImageWithDefault'
import { useTranslation } from 'react-i18next';
import Input from './Input'
import { updateUser } from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import {updateSuccess} from '../redux/authAction'

const ProfileCard = props => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedEmail,setUpdatedEmail] = useState();
    const {username : signedInUsername} = useSelector(( store ) => ({ username: store.username }));
    const { t } = useTranslation();
    const routeParams = useParams();
    const[user,setUser]= useState({});
    const [newImage, setNewImage] = useState();
    const[validationErrors,setValidationErrors] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    const { username, email,image} = user;
    const pendingApiCall = useApiProgress('put','/api/1.0/users'+username);

    useEffect(() => {
        if(!inEditMode){
            setUpdatedEmail(undefined);
            setNewImage(undefined);
        }else {
            setUpdatedEmail(email);
        }
        
    }, [inEditMode,email])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => {
            return{...previousValidationErrors,
            email:undefined}
        })
    },[updatedEmail])

    useEffect(() => {
        setValidationErrors(previousValidationErrors => {
            return{...previousValidationErrors,
            image:undefined}
        })
    },[newImage])
   
    const onClickSave = async () => {

        let image;
        if(newImage){
            image = newImage.split(',')[1];
        }
       
        const body = {
            email: updatedEmail,
            image
        }
        try{
            const response = await updateUser(username,body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
            
        }catch(error){
            setValidationErrors(error.response.data.validationErrors);
        }

    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1){
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    
   

    const pathUsername = routeParams.username;
    let message = "we cannot edit";
    if(pathUsername === signedInUsername){
        message = "we can edit";
    }
    
    const{email: emailError, image: imageError} = validationErrors;
    
    return (
        <div className ="card text-center">
            <div className="card-header">
              <ProfileImageWithDefault className = "rounded-circle shadow" width="150" height="150" alt ={`${username}'s profile`} image = {image} tempimage = {newImage}/>
            </div>
            {!inEditMode &&(
            <>
                <div className ="card-body text-center">
                    {username} {email}
                </div>
                <div className="text-center">
                <button className="btn btn-success d-inline-flex" style = {{width:'auto'}} onClick={() => setInEditMode(true)}>
                    <span className="material-icons">
                        edit
                    </span> {t('Edit')}
                </button>
                </div>
            </>
            )}
            {inEditMode &&(
                <div style={{marginLeft:'20%',marginRight:'20%'}}>
                    <Input label = {t("Change Email")} defaultValue = {email} onChange={(event) => {
                        setUpdatedEmail(event.target.value);
                    }}
                    error={emailError}
                    />
                    <Input type="file" onChange={onChangeFile} error={imageError}/>
                    <div>
                        <ButtonWithProgress className="btn btn-success d-inline-flex "  onClick= {onClickSave} disabled={pendingApiCall} pendingApiCall={pendingApiCall}  text={<>
                        <span className="material-icons">
                            save
                        </span>
                            {t('Save')}
                            </>
                        }/>
                        <button className="btn btn-danger d-inline-flex ml-2" onClick = {( )=>{setInEditMode(false)}}>
                            <span className="material-icons">
                                close
                            </span>
                            {t('Cancel')}
                        </button>
                    </div>
                </div>

            )}
           
        </div>
    );
            
};
       
    
// const mapStateToProps = store => {
//     return {
//         signedInUsername: store.username
//     }
// }


export default ProfileCard;

