import React from 'react'

export default function Link(props) {
    const [isEdit, setIsEdit] = React.useState(false);
    const [editLinkText, setEditLinkText] = React.useState(props.link.text);
    function handleClickConfirm() {
        props.onLinkEdit(props.link);
        setIsEdit(false);
    }
    function handleClickEdit() {
        setIsEdit(true);
    }

    return (
        <li className='link'>
            <span className='link__id'>{props.link.id}</span>
            {
                isEdit ?
                <>
                    <input onChange=
                    {e => setEditLinkText(e.target.value)} 
                    className='link__input' value={editLinkText} />
                    <button onClick={handleClick} type="button" className="link__edit-button" />
                </>
                :
                <>
                    <p className='link__text'>{props.link.text}</p>
                    <button onClick={handleClickConfirm} type="button" className="link__confirm-button" />
                </>
            }
        </li>
  )
}
