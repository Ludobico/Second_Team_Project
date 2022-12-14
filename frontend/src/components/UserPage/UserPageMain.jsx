import { Outlet, useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import MainSliderEvent from "../MainSlider/MainSliderEvent";
import MainSliderTheme from "../MainSlider/MainSliderTheme";
import NavigatorMain from "../Navigator/NavigatorMain";
import "../../styles/UserPage/UserPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import KakaoMapContainer from "../KakaoMap/KakaoMapContainer";
import MainSliderCenter from "../MainSlider/MainSliderCenter";
import yogaImage from "../../static/images/JYY/main/yoga.png";
import backImage from "../../static/images/JYY/main/back.png";
import liftImage from "../../static/images/JYY/main/lift.png";
import strechingImage from "../../static/images/JYY/main/streching.png";
import chanjinImage from "../../static/images/JYY/main/chanjin.png";
import mainLogo from "../../static/images/JYY/main/mainLogo.png";
import mainLogo2 from "../../static/images/JYY/exImage.png";
import homeBlack from "../../static/images/JYY/ICON/homeBlack.png";
import beginner from "../../static/images/JYY/main/beginner.png";
import Swal from "sweetalert2";

const MainCenter = styled.div`
  text-align: center;
  /* padding-bottom: 6.25rem; */
`;

function UserPageMain(props) {
  const navigate = useNavigate();
  const [centerInfos, setCenterInfos] = useState([]);
  const [codeInfo, setCodeInfo] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8008/maincenterinfo", {
        USER_ID: window.sessionStorage.getItem("userID"),
      })
      .then((res) => {
        setCenterInfos(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post("http://localhost:8008/codeinfo", {
        USER_ID: window.sessionStorage.getItem("userID"),
      })
      .then((res) => {
        setCodeInfo(res.data[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (
    window.sessionStorage.userID === "" ||
    window.sessionStorage.userID === undefined
  ) {
    Swal.fire(`????????? ??? ?????? ???????????????.
????????? ???????????? ???????????????.`);
    navigate("/");
    return false;
  }

  const randomArr = ["????????????%20????????????%20????????????","????????????%20???????????????!","???????????????%20????????????%20?????????",
                    "?????????%20??????%20????????????","10?????????","????????????%20??????%20?????????%20????????????%20123"];
  const randomExec = randomArr[Math.floor(Math.random()*randomArr.length)];

  return (
    <div className="userMain_total_div">
      <div className="main_logo_div">
        <span className="main_span_big">???</span>
        <span className="main_span_small">??????</span>
        <span className="main_span_big">???</span>
        <span className="main_span_small">??????</span>
        {/* <span className="main_span_image"> */}
        <img src={homeBlack} alt="?" className="main_logo_image" />
        {/* </span> */}
        {/* <img
          src={mainLogo2}
          alt="?"
          className="main_logo"
        /> */}
      </div>
      <MainCenter>
        <div className="main_image_div">
          <NavLink to={`/detail?exec=${randomExec}`}>
            <img
              className="main_beginner_content"
              src={beginner}
              width="385px"
              alt="?"
            />
          </NavLink>
        </div>

        {codeInfo.USER_ACCESS_CODE === null ? null : (
          <div className="UserMain_center">
            <div>
              <div className="UserMain_centerContents">
                <span className="UserMain_centerContents_title">
                  {centerInfos.CENTER_NAME}
                </span>
                <span className="UserMain_centerContents_content">
                  &nbsp;?????? ?????????
                </span>
                <br />
              </div>
              <div className="UserMain_centerMap">
                <KakaoMapContainer
                  center_address={centerInfos.CENTER_ADRESS}
                  id={centerInfos.CENTER_ID}
                />
              </div>
              <br />
              <MainSliderCenter CENTER_ID={centerInfos.CENTER_ID} />
            </div>
          </div>
        )}
        <div className="main_image_div">
          <NavLink to={"/detail?exec=curl"}>
            <img
              className="main_chanjin_content"
              src={chanjinImage}
              alt="?"
              width="385px"
            />
          </NavLink>
        </div>
        <div className="UserMain_white">
          <MainSliderTheme />
        </div>
        <div className="main_image_div">
          <NavLink
            to={"/detail?exec=????????????%20??????%20?????????%20????????????%20123"}
          >
            <img
              className="main_streching_content"
              src={strechingImage}
              width="385px"
              alt="?"
            />
          </NavLink>
        </div>
        <div className="UserMain_gray">
          <MainSliderEvent />
        </div>
        <div className="main_image_div">
          <NavLink to={"/detail?exec=10?????????"}>
            <img
              className="main_yoga_content"
              src={yogaImage}
              width="385px"
              alt="?"
            />
          </NavLink>
        </div>
        {/* <div className="main_image_div">
          <img
            className="main_lift_content"
            src={liftImage}
            width="385px"
            alt="?"
          />
        </div> */}
        {/* <div className="main_image_div">
          <img
            className="main_back_content"
            src={backImage}
            width="385px"
            alt="?"
          />
        </div> */}
        <NavigatorMain />
        <Outlet />
      </MainCenter>
    </div>
  );
}

export default UserPageMain;
