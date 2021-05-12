import React, { Component } from 'react'
import axios from 'axios'

function getDisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedComponent, apiPath) {
    return class ApiProgress extends Component {
    
        //altındakiyle aynı 
        //static displayName = 'ApiProgress('+getDisplayName(WrappedComponent)+ ')';
        static displayName =`ApiProgress(${getDisplayName(WrappedComponent)})`;
        state = {
             pendingApiCall: false
        };
        
        componentDidMount(){
            console.log('running interceptor', apiPath);
           this.requestInterceptor = axios.interceptors.request.use((request) => {
            this.updateApiCallFor(request.url,true);
            return request;
        })

        this.responseInterceptor = axios.interceptors.response.use((response) => {
            this.updateApiCallFor(response.config.url,false);
            return response;
        },(error) => {
            this.updateApiCallFor(error.config.url,false);
            this.setState({pendingApiCall:false});
            throw error;

        })
    }
    componentWillUnmount(){
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }

    updateApiCallFor = (url, inProgress) =>{
        if(url === apiPath){
            this.setState({pendingApiCall: inProgress});
            }
    }

    render() {
        const {pendingApiCall} = this.state;
        return <WrappedComponent pendingApiCall={pendingApiCall} {...this.props}/>;
    }
}
}

