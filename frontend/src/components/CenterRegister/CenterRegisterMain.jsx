import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CenterRegisterFirst from "./CenterRegisterFirst";
import CenterRegisterSecond from "./CenterRegisterSecond";
import CenterRegisterThird from "./CenterRegisterThird";
import "../../styles/CenterRegister/CenterRegister.css";
import shortid from "shortid";

// 센터 회원가입 페이지 mode 변수로 컴포넌트 구분
// 각 컴포넌트마다 useState 의 set 함수를 보내서 데이터를 담는다.

const CenterRegisterMain = () => {
  const [mode, setMode] = useState(0);
  const [centerID, setCenterID] = useState(0);
  const [centerPW, setCenterPW] = useState("");
  const [centerAddress, setCenterAddress] = useState("");
  const [centerName, setCenterName] = useState("");
  const [centerTel, setCenterTel] = useState("");
  const [centerEmail, setCenterEmail] = useState("");
  const [centerAccess, setCenterAccess] = useState(shortid.generate());

  const consoleAll = () => {
    console.log("mode =>", mode);
    console.log("centerID =>", centerID);
    console.log("centerPW =>", centerPW);
    console.log("centerAddress =>", centerAddress);
    console.log("centerName =>", centerName);
    console.log("centerTel =>", centerTel);
    console.log("centerEmail =>", centerEmail);
    console.log("centerAccess =>", centerAccess);
  };

  const insertCenter = () => {
    axios
      .post("http://localhost:8008/centerjoin", {
        CENTER_ID: centerID,
        CENTER_PW: centerPW,
        CENTER_ADDRESS: centerAddress,
        CENTER_NAME: centerName,
        CENTER_TEL: centerTel,
        CENTER_EMAIL: centerEmail,
        CENTER_ACCESS_CODE: centerAccess,
      })
      .then((res) => {
        if (res.data.affectedRows === 1) {
          setMode(3);
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  if (mode === 0) {
    return (
      <div>
        <CenterRegisterFirst
          centerName={centerName}
          setCenterName={setCenterName}
          setMode={setMode}
          consoleAll={consoleAll}
        />
      </div>
    );
  }
  if (mode === 1) {
    return (
      <div>
        <CenterRegisterSecond
          setCenterID={setCenterID}
          setCenterPW={setCenterPW}
          setMode={setMode}
          consoleAll={consoleAll}
        />
      </div>
    );
  }
  if (mode === 2) {
    return (
      <div>
        <CenterRegisterThird
          setCenterAddress={setCenterAddress}
          setCenterTel={setCenterTel}
          setCenterEmail={setCenterEmail}
          setCenterAccess={setCenterAccess}
          centerAccess={centerAccess}
          consoleAll={consoleAll}
          insertCenter={insertCenter}
        />
      </div>
    );
  }
  if (mode === 3) {
    return (
      <div className="CenterRegister_main">
        <div className="CenterRegister_info">
          센터 등록이
          <br />
          성공적으로 이뤄졌습니다!
        </div>
        <div>
          <Link to="/">
            <input
              className="CenterRegister_button"
              type="button"
              value="로그인 하러 가기"
            />
          </Link>
        </div>
      </div>
    );
  }
};

export default CenterRegisterMain;
