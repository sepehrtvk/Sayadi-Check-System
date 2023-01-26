import React, { FormEvent, useState } from "react";
import { PageTypes } from "../../App";
import { LOGIN } from "../../app-config";
import "./LoginPage.css";

type LoginProps = {
  navigateTo: (page: PageTypes) => void;
};

const LoginPage = (props: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (username.length == 0 || password.length == 0) {
      setError(" لطفا نام کاربری و رمزعبور را وارد نمایید. ");
      return;
    }
    if (username === LOGIN.username && password === LOGIN.password) {
      console.log(username, password);
      props.navigateTo("checkPage");
    } else setError("نام کاربری یا رمز عبور اشتباه است ! ");
  };

  const usernameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <div className="login-header">
        <img
          src={require("../../Assets/images/logo-white.svg").default}
          alt="logo-white"
          className="img-fluid"
        />
        <div>
          <h1 className="fw-bold">خوش آمدید</h1>
          <p className="fw-bold">سامانه استعلام چک صیادی</p>
        </div>
      </div>
      <div className="login-form">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              نام کاربری
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={usernameChangeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              رمز عبور
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={passwordChangeHandler}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 text-white mt-3"
          >
            ورود به سامانه
          </button>
        </form>
      </div>
      {error}
    </div>
  );
};

export default LoginPage;
