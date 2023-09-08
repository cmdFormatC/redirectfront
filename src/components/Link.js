import React from "react";

export default function Link(props) {
  const [isEdit, setIsEdit] = React.useState(props.isEdit);
  const [editLinkText, setEditLinkText] = React.useState(props.link.url || "");
  function handleClickConfirm() {
    if (props.link.isAdded) {
      props.onLinkAdd({
        id: props.link.id,
        text: editLinkText,
      });
    } else {
      props.onLinkEdit({
        id: props.link.id,
        text: editLinkText,
      });
    }
    setIsEdit(false);
  }
  function handleClickEdit() {
    setIsEdit(true);
  }
  const handleClickCopy = async () => {
    const dataToCopy = `http://cifra.top/main/${props.link.id}`;
    try {
      await navigator.clipboard.writeText(dataToCopy);
      alert("Ссылка скопирована");
    } catch (err) {
      alert("Не удалось скопировать ссылку");
    }
  };
  function handleClickCancel() {
    if (props.link.isAdded) {
      props.onDelete(props.link.id);
      setIsEdit(false);
    }
    setIsEdit(false);
  }

  return (
    <li className="link">
      <span className="link__id">
        {!props.link.isAdded ? `${props.link.id}.` : ""}
      </span>
      {isEdit ? (
        <>
          <input
            onChange={(e) => setEditLinkText(e.target.value)}
            className="link__input"
            value={editLinkText}
          />
          <button
            onClick={handleClickCancel}
            type="button"
            className="link__cancel-button"
          />
          <button
            onClick={handleClickConfirm}
            type="button"
            className="link__confirm-button"
          />
        </>
      ) : (
        <>
          <p className="link__text">{props.link.url}</p>
          <button
            onClick={handleClickCopy}
            type="button"
            className="link__copy-button"
          />
          <button
            onClick={handleClickEdit}
            type="button"
            className="link__edit-button"
          />
          <button
            onClick={() => props.onDeleteLink(props.link.id)}
            type="button"
            className="link__delete-button"
          />
        </>
      )}
    </li>
  );
}
