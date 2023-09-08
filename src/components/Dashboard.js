import React, { useState } from "react";
import api from "../utils/Api";
import Link from "./Link";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  function handleEditLinkClick(link) {
    api
      .updateLink(link.id, link.text)
      .then((res) => {
        setLinks(arrSort(res.links));
      })
      .catch((err) => console.error(err));
  }

  function handleAddLinkClick(link) {
    setButtonDisabled(false);
    api.addLink(link.text).then((res) => {
      setLinks(arrSort(res.links));
    });
  }

  function handleAddLink() {
    setButtonDisabled(true);
    const newLink = {
      id: "",
      text: "",
      isEdit: true,
      isAdded: true,
    };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  }

  function arrSort(arr) {
    return arr.sort((a, b) => a.id - b.id);
  }

  function handleLinkDelete(linkId) {
    setButtonDisabled(false);
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
  }

  function handleLinkDeleteClick(id) {
    api
      .deleteLink(id)
      .then((res) => {
        setLinks(arrSort(res.links));
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    api
      .getLinks()
      .then((result) => {
        const linksArr = result.links.map((item) => {
          return {
            id: item.id,
            url: item.url,
          };
        });
        setLinks(arrSort(linksArr));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ul className="dashboard">
      <h1 className="dashboard__header">Ссылки:</h1>
      {links.map((item) => {
        return (
          <Link
            isEdit={item.isEdit ? item.isEdit : false}
            link={item}
            key={item.id}
            onLinkEdit={handleEditLinkClick}
            onLinkAdd={handleAddLinkClick}
            onDelete={handleLinkDelete}
            onDeleteLink={handleLinkDeleteClick}
          />
        );
      })}
      <button
        disabled={isButtonDisabled}
        onClick={handleAddLink}
        className={`dashboard__add-button ${
          isButtonDisabled ? "dashboard__add-button_disabled" : ""
        }`}
      >
        +
      </button>
    </ul>
  );
}
