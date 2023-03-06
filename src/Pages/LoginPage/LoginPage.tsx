import React, { FormEvent, useState } from "react";
import { login } from "../../Api/login";
import { PageTypes } from "../../App";
import {
  LOGIN,
  loginDetailsShiedoust,
  loginDetailsVaranegar,
} from "../../app-config";
import "./LoginPage.css";

type LoginProps = {
  navigateTo: (page: PageTypes) => void;
};

const LoginPage = (props: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [chequePerson, setChequePerson] = useState<boolean>(false);
  const [person, setPerson] = useState<string>("");

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (username.length == 0 || password.length == 0) {
      setError(" لطفا نام کاربری و رمزعبور را وارد نمایید. ");
      return;
    }
    if (chequePerson && person.length == 0) {
      setError("لطفا شخض مورد نظر را انتخاب نمایید.");
      return;
    }
    if (username === LOGIN.username && password === LOGIN.password) {
      setLoading(true);
      let loginDetails = null;
      if (chequePerson && person == "2") {
        //shakhs
        loginDetails = loginDetailsShiedoust;
      } else {
        //sherkat
        loginDetails = loginDetailsVaranegar;
      }
      login(loginDetails)
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
    <div className='login'>
      <div className='login-header'>
        <img
          src={require("../../Assets/images/logo-white.svg").default}
          alt='logo-white'
          className='img-fluid'
        />
        <div>
          <h1 className='fw-bold'>خوش آمدید</h1>
          <p className='fw-bold'>سامانه استعلام چک صیادی</p>
        </div>
      </div>
      <div className='login-form'>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              نام کاربری
            </label>
            <input
              type='text'
              className='form-control'
              id='username'
              onChange={usernameChangeHandler}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              رمز عبور
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              onChange={passwordChangeHandler}
            />
          </div>
          <div className='form-check checkbox-section mt-3'>
            <div>
              <input
                className='form-check-input'
                type='checkbox'
                checked={!chequePerson}
                onChange={() => {
                  setChequePerson(false);
                }}
                id='checkBox1'
              />
              <label className='form-check-label' htmlFor='checkBox1'>
                در وجه شرکت ورانگر
              </label>
            </div>
            <div>
              <input
                className='form-check-input'
                type='checkbox'
                checked={chequePerson}
                onChange={() => {
                  setChequePerson(true);
                }}
                id='checkBox1'
              />
              <label className='form-check-label' htmlFor='checkBox1'>
                در وجه شخص
              </label>
            </div>
          </div>
          {chequePerson && (
            <div className='my-3'>
              <select
                className='form-select'
                aria-label='Default select example'
                onChange={(e) => {
                  setPerson(e.target.value);
                }}>
                <option value='1'>انتخاب شخص</option>
                <option value='2'>آقای شیعه دوست</option>
              </select>
            </div>
          )}
          <button
            type='submit'
            className='btn btn-warning w-100 text-white mt-3'>
            {loading && (
              <div className='d-flex align-items-center justify-content-center'>
                <div className='spinner-border text-white' role='status'></div>
                <p className='mb-0  mx-2'>لطفا صبر کنید </p>
              </div>
            )}
            {!loading && (
              <div className='d-flex align-items-center justify-content-center'>
                <p className='mb-0  mx-2'>ورود به سامانه</p>
              </div>
            )}
          </button>
        </form>
      </div>
      <div className='mt-3'>
        <p>{error}</p>
      </div>
    </div>
  );
};

export default LoginPage;
