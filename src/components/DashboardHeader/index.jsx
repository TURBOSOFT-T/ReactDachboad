import React from 'react';

import './styles.css';
import NotificationsIcon from '../../assets/icons/notifications.svg';
import ConfigurationsIcon from '../../assets/icons/configurations.svg';


function DashboardHeader ({ btnText, onClick }) {
    return(
        <div className='dashbord-header-container'>
            {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            }

            <div className='dashbord-header-right'>
                <img 
                    src={NotificationsIcon}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={ConfigurationsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' />
                <img
                    className='dashbord-header-avatar'
                    src='https://reqres.in/img/faces/9-image.jpg' />
            </div>
        </div>
    )
}

export default DashboardHeader;