import React from 'react'
import {changeLanguage} from '../api/apiCalls'
import { useTranslation } from 'react-i18next'
import TR_Flag from '../TR_Flag.png'
import UK_Flag from '../UK_Flag.png'

const LanguageSelector = (props) => {

    const {i18n} = useTranslation();
    const onChangeLanguage = language =>{
       
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
  

    return (
        <div style={{position:'fixed',marginLeft:'85%'}}>
            <img src ={TR_Flag} alt ="Turkish Flag" onClick = {()=> onChangeLanguage('tr')} style={{cursor: 'pointer'}}></img>
            <img src ={UK_Flag} alt ="UK Flag" onClick = {()=> onChangeLanguage('en')} style={{cursor: 'pointer'}} width ="32"height="21"></img>
             
        </div>
    )
}

export default LanguageSelector;