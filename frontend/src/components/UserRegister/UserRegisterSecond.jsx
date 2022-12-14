import React, { useRef, useState } from "react";
import axios from "axios";
import "../../styles/UserRegister/UserRegister.css";
import Swal from "sweetalert2";

const RegisterSecond = ({ setUserID, setUserPW, setMode, consoleAll }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorKey, setErrorKey] = useState(true);

  const idRef = useRef();
  const pwRef = useRef();
  const pwchRef = useRef();

  const jobDone = () => {
    if (errorKey === true) {
      setErrorMessage("아이디 중복 체크를 해주세요.");
      return false;
    }
    if (pwRef.current.value.length < 8 || pwRef.current.value.length > 15) {
      setErrorMessage("비밀번호를 길이를 확인하세요.");
      pwRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
    }
    if (pwRef.current.value !== pwchRef.current.value) {
      setErrorMessage("비밀번호가 맞지 않습니다.");
      pwchRef.current.focus();
      return false;
    } else {
      setErrorMessage("");
    }

    setMode(2);
    consoleAll();
  };

  const idCheck = () => {
    axios
      .post("http://localhost:8008/useridcheck", {
        USER_ID: idRef.current.value,
      })
      .then((res) => {
        if (idRef.current.value.length < 8 || idRef.current.value.length > 15) {
          setErrorMessage("아이디 길이를 확인하세요.");
          idRef.current.focus();
          console.log("nicknameCheck =>", errorMessage);
          return false;
        } else if (res.data[0].COUNT >= 1 && idRef.current.value !== "") {
          setErrorMessage("아이디가 중복됩니다.");
          idRef.current.value = "";
          idRef.current.focus();
          return false;
        } else {
          Swal.fire({
            title: `아이디가 중복되지 않습니다. <br>사용하시겠습니까?`,
            showDenyButton: true,
            confirmButtonText: "예",
            denyButtonText: `아니오`,
            denyButtonColor: "red",
          }).then((result) => {
            if (result.isConfirmed) {
              setUserID(idRef.current.value);
              setErrorKey(false);
              setErrorMessage("");
            } else if (result.isDenied) {
              Swal.fire("취소하셨습니다.", "", "error");
              idRef.current.value = "";
              return false;
            }
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="UserRegister_main">
      <div className="UserRegister_info">
        아이디와 비밀번호를
        <br />
        입력해주세요.
      </div>
      <div className="UserRegister_inputDiv">
        <input
          type="text"
          name="name"
          ref={idRef}
          autoComplete="off"
          placeholder="아이디는 8 ~ 15자까지 입력하세요."
          className="UserRegister_input"
          onChange={(e) => {
            setUserID(e.target.value);
            setErrorKey(true);
          }}
        />
        <input
          type="button"
          className="UserRegister_overlap"
          value="중복 체크"
          onClick={idCheck}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              idCheck();
            }
          }}
        />
      </div>
      <div>
        <input
          className="UserRegister_inputSolo"
          type="password"
          name="pw"
          ref={pwRef}
          autoComplete="off"
          placeholder="비밀번호는 8 ~ 15자까지 입력하세요."
          onChange={(e) => {
            setUserPW(e.target.value);
          }}
        />
        <input
          className="UserRegister_inputSolo"
          placeholder="비밀번호를 한번 더 입력하세요."
          type="password"
          name="pwch"
          ref={pwchRef}
          autoComplete="off"
        />
      </div>
      <div className="UserRegister_error">{errorMessage}</div>
      <input
        className="UserRegister_button"
        value="다음"
        type="button"
        onClick={jobDone}
      />
    </div>
  );
};

export default RegisterSecond;
