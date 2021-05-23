import React, { useState,useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { getUsers } from '../api/apiCalls'
import { useApiProgress } from '../shared/ApiProgress'
import EmployeeListItem from './EmployeeListItem'

const EmployeeList = () => {

    const [page,setPage] = useState({
        content: [],
        size:5,
        number:0
    })

    const [loadFailure, setLoadFailure] = useState(false);
    const pendingApiCall = useApiProgress('get','/api/1.0/users?page');

    
    
    useEffect(() => {
        loadUsers();
    }, [])
    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);

    }
    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);

    }

    const loadUsers = async page => {
        setLoadFailure(false);
        try{
            const response = await getUsers(page);
            setPage(response.data);
        }catch(error){
            setLoadFailure(true);
        }
    };

        const {t} = useTranslation();
        const {content,last,first } = page;

        let actionDiv = (
            <div>
            {first === false && (<button className="btn btn-sm btn-light" onClick={onClickPrevious}>{t('Previous')}</button>)}
            {last === false && (<button className="btn btn-sm btn-light float-right" onClick={onClickNext}>{t('Next')}</button>)}
                
            </div>
        );
        if(pendingApiCall){
            actionDiv = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-balck-60">
                    </div>
                </div>

            );
        }

        return (
            <div className = "card">
                <h3 className ="card-header text-center border-bottom border-warning">{t('Employee List')}</h3>
                <div className = "list-group-flush">
                    {content.map(user => (
                    
                        <EmployeeListItem key = {user.username} user = {user}/>
                                   

                        ))
                    }
                  </div>
                 {actionDiv}
                 {loadFailure && <div className="text-center text-danger">{t('Load Failure')}</div>}
            </div>
        );
    
}
export default EmployeeList;
