import React, { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import '../../styles/CenterLogin/CenterLogin.css'
import CenterLogo from '../../static/images/HHJ/icons/CenterLogo.svg'

const MainCenter = styled.div`
    text-align: center;
    padding-top: 3.125rem;
  `;

/** 센터 로그인 페이지 */
function CenterLogin() {
  /** 사업자 등록번호 인식 */
  const [errorKey, setErrorKey] = useState(true);

  const [errorMassege, setErrorMassege] = useState('');

  const idRef = useRef();
  const pwRef = useRef();
  const btnRef = useRef();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      setErrorKey(true);
      setErrorMassege('사업자 등록번호를 입력하세요.')
      idRef.current.focus();
      return false;
    }
    if (idRef.current.value.length < 10) {
      setErrorKey(true);
      setErrorMassege('사업자 등록번호 길이를 확인하세요.');
      idRef.current.focus();
      return false;
    }
    else {
      const str = idRef.current.value;
      for (var i = 0; i < str.length; i++) {
        const ch = str.substring(i, i + 1);
        if (
          !(ch >= "0" && ch <= "9") ||
          (ch >= "a" && ch <= "z") ||
          (ch >= "A" && ch <= "Z")
        ) {
          setErrorKey(true);
          setErrorMassege('사업자 등록번호는 숫자로만 입력해주세요.');
          idRef.current.focus();
          return false;
        }
      }
    }

    setErrorKey(false);
    setErrorMassege('');
    pwRef.current.focus();

    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      setErrorKey(true);
      setErrorMassege('비밀번호를 입력하세요.');
      pwRef.current.focus();
      return false;
    } else if (pwRef.current.value.length < 8 || pwRef.current.value.length > 15) {
      setErrorKey(true);
      setErrorMassege('비밀번호를 길이를 확인하세요.');
      pwRef.current.focus();
      return false;
    }
    else {
      setErrorKey(false);
      setErrorMassege('');
    }

    axios
      .post("http://localhost:8008/centerlogin", {
        CENTER_ID: idRef.current.value,
        CENTER_PW: pwRef.current.value,
      })
      .then((res) => {
        if (res.data[0].cnt === 1) {
          window.sessionStorage.clear();
          window.sessionStorage.setItem("centerID", idRef.current.value);
          navigate("/centermain");
        } else {
          setErrorKey(true);
          setErrorMassege('아이디 혹은 비밀번호가 틀렸습니다.');
          idRef.current.focus();
          return false;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <MainCenter>
      <br />
      <br />
      <br />
      <img
        src={CenterLogo}
        alt="undefind"
        width='60%'
      />
      <br />
      <br />
      <br />
      <div>
        <input
          className='CenterLogin_input'
          type="text"
          name="id"
          placeholder="사업자 등록번호를 입력하세요."
          ref={idRef}
          autoComplete="off"
          maxLength="10"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </div>
      <div>
        <input
          className='CenterLogin_input'
          type="password"
          name="pw"
          placeholder="비밀번호를 입력하세요."
          ref={pwRef}
          autoComplete="off"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
      </div>
      <div className='CenterLogin_error'>
        {errorMassege}
      </div>
      <div>
        <input
          className='CenterLogin_button'
          type='button'
          value='로그인'
          ref={btnRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          onClick={handleLogin}
        />
      </div>
      <div>
        <a href='http://localhost:3000/centerjoin' className='CenterLogin_link'>처음이신가요?</a>
        <br />
        <br />
        <a href='http://localhost:3000/' className='CenterLogin_link'>유저 로그인</a>
      </div>
    </MainCenter>
  );
}

export default CenterLogin;