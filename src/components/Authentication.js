import React, { useState } from "react";
import api from "../utils/Api";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    api
      .authentication(formData)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      });
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="authentication">
      <form className="authentication__form" onSubmit={submitForm} noValidate>
        <h1 className="authentication__header">Авторизация</h1>
        <input
          placeholder="Имя пользователя"
          id="username"
          className="authentication__input"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          placeholder="Пароль"
          id="password"
          className="authentication__input"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="authentication__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
