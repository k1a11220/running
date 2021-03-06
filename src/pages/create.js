/*global kakao*/
import React from "react";
import { DrawingManager, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 320px;
`;

const MapContainer = styled.div`
  width: calc(100vw - 320px);
  height: 100vh;
`;

const ToolbarContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  margin: 24px;
  background-color: white;
  display: flex;
  gap: 16px;
  padding: 12px 24px;
  border-radius: 12px;
`;

const CTA = styled.button``;

const ToolButton = styled.button``;

const Create = () => {
  const managerRef = useRef(null);

  const [overlayData, setOverlayData] = useState({
    marker: [],
    polyline: [],
  }); //이친구들을 서버에 저장해야 함.

  function selectOverlay(type) {
    const manager = managerRef.current;
    manager.cancel();
    manager.select(type);
  }

  function drawOverlayData() {
    const manager = managerRef.current;
    setOverlayData(manager.getData());
  }

  function SubmitData() {
    drawOverlayData();
    console.log(overlayData);
  }

  // Drawing Manager에서 가져온 데이터 중
  // 선과 다각형의 꼭지점 정보를 latlng 배열로 반환하는 함수입니다
  function pointsToPath(points) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }
  return (
    <Container>
      <SideBar>
        <button> 어드민 나가기</button>
        <form>
          <input type={"text"} placeholder="코스 이름"></input>
          <input type={"text"} placeholder="제작자"></input>
        </form>
        <CTA onClick={drawOverlayData}>저장하기</CTA>
        <CTA onClick={SubmitData}> 제출하기</CTA>
      </SideBar>
      <MapContainer>
        <Map
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
        >
          <ToolbarContainer>
            <ToolButton
              onClick={(e) => {
                selectOverlay(kakao.maps.drawing.OverlayType.POLYLINE);
              }}
            >
              선 그리기
            </ToolButton>

            <ToolButton
              onClick={(e) => {
                selectOverlay(kakao.maps.drawing.OverlayType.MARKER);
              }}
            >
              마커 그리기
            </ToolButton>
          </ToolbarContainer>
          <DrawingManager
            ref={managerRef}
            drawingMode={[
              kakao.maps.drawing.OverlayType.MARKER,
              kakao.maps.drawing.OverlayType.POLYLINE,
            ]}
            guideTooltip={["draw", "drag", "edit"]}
            markerOptions={{
              // 마커 옵션입니다
              draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
              removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
            }}
            polylineOptions={{
              // 선 옵션입니다
              draggable: true, // 그린 후 드래그가 가능하도록 설정합니다
              removable: true, // 그린 후 삭제 할 수 있도록 x 버튼이 표시됩니다
              editable: true, // 그린 후 수정할 수 있도록 설정합니다
              strokeColor: "#39f", // 선 색
              hintStrokeStyle: "dash", // 그리중 마우스를 따라다니는 보조선의 선 스타일
              hintStrokeOpacity: 0.5, // 그리중 마우스를 따라다니는 보조선의 투명도
            }}
          />
        </Map>
      </MapContainer>

      {/* <div
        style={{
          position: "relative",
        }}
      >
        <Map
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            width: "100%",
            height: "450px",
          }}
          level={3} // 지도의 확대 레벨
        >
          {overlayData.polyline.map(({ points, options }, i) => (
            <Polyline key={i} path={pointsToPath(points)} {...options} />
          ))}

          {overlayData.marker.map(({ x, y, zIndex }, i) => (
            <MapMarker
              key={i}
              position={{
                lat: y,
                lng: x,
              }}
              zIndex={zIndex}
            />
          ))}
        </Map>
        <div>
          <button onClick={drawOverlayData}>가져오기</button>
        </div>
      </div> */}
    </Container>
  );
};

export default Create;
