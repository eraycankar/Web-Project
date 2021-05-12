import React from 'react';
import {withRouter} from 'react-router-dom'
// import {Authentication} from '../shared/AuthenticationContext'

const ProfileCard = props => {
    
    const pathUsername = props.match.params.username;
    const signedInUsername = props.username;
    let message = "we cannot edit";
    if(pathUsername === signedInUsername){
        message = "we can edit";
    }
    return (
        <div>
            {message}
        </div>
    );
            
};

// class ProfileCardContextWrapper extends React.Component {
//     //static contextType = Authentication;
//     render() {
//         return <ProfileCard {...this.props} username ={this.context.state.username}></ProfileCard>
//     }
// }
       
    
    


export default withRouter(ProfileCard);