/*global kakao*/
import React, {useEffect} from "react";
import styled from "styled-components";

const MapContents = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContent = (props) => {

    const address = props.address;

    useEffect(()=>{
        createMap(address)
    },[address]);

    const createMap = (address) => {
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=3e3627c56abdc96d040334b86f0c1fc3&autoload=false&libraries=services";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                //주소-좌표 변환 객체를 생성
                let geocoder = new kakao.maps.services.Geocoder();

                let callback = function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        console.log(result);
                        let container = document.getElementById("Mymap");
                        let options = {
                            center: new kakao.maps.LatLng(result[0].y, result[0].x),
                            level: 5
                        };

                        const map = new window.kakao.maps.Map(container, options);
                        //마커가 표시 될 위치
                        let markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
                        // 마커를 생성
                        let marker = new kakao.maps.Marker({
                            position: markerPosition,
                        });
                        // 마커를 지도 위에 표시
                        marker.setMap(map);
                    }
                };
                geocoder.addressSearch(address, callback);
            });
        };
    };

    return (
        <div id="Mymap" style={{ width: "40vw", height: "50vh" }}></div>
    )
}

export default MapContent;