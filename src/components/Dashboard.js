import React, { useState } from 'react'
import api from '../utils/Api'
import Link from './Link';

export default function Dashboard() {
    
    const [isEditing, setIsEdititng] = React.useState({id: '', text: ''});
    const [links, setLinks] = React.useState([]);

    function handleLinkClick (link) {
        setIsEdititng(link);
    };

    React.useEffect(() => {
        api.getLinks()
        .then((result) =>{
            const linksArr = result.map((item) => {
                return {
                    id: item.id, 
                    text: item.url
                }
            });
            setLinks(linksArr);
        })
        .catch((error) => {
            console.error(error); 
        })
    }, [])

    return (
        <ul className='dashboard'>
           {links.map((item) =>{
            return (
                <Link 
                    link={item}
                    key={item.id}
                    onLinkEdit={handleLinkClick}
                />
            )
           })} 
        </ul>
    )
}
