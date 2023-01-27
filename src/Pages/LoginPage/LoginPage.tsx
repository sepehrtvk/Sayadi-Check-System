import React, { FormEvent, useState } from "react";
import { login } from "../../Api/login";
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
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (username.length == 0 || password.length == 0) {
      setError(" لطفا نام کاربری و رمزعبور را وارد نمایید. ");
      return;
    }
    if (username === LOGIN.username && password === LOGIN.password) {
      setLoading(true);
      login()
        .then((data) => {
          console.log(data);
          props.navigateTo("checkPage");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
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
            {loading && (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border text-white" role="status"></div>
                <p className="mb-0  mx-2">لطفا صبر کنید </p>
              </div>
            )}
            {!loading && (
              <div className="d-flex align-items-center justify-content-center">
                <p className="mb-0  mx-2">ورود به سامانه</p>
              </div>
            )}
          </button>
        </form>
      </div>
      <div className="mt-3">
        <p>{error}</p>
      </div>
    </div>
  );
};

export default LoginPage;
