import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../Store.css";
import searchIcon from "../images/search_default_white.svg";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const markers = useRef([]);
  const map = useRef(null);
  const location = useLocation();
  const [isMapReady, setIsMapReady] = useState(false);
  const regions = {
    서울: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    경기: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "여주군",
      "연천군",
    ],
    인천: [
      "계양구",
      "미추홀구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
      ],
    대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
    대구광역시: [
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
    부산광역시: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",],
      울산광역시: ["남구", "동구", "북구", "중구", "울주군"],
      광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
      강원도: ["강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",],
      충청북도:[
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
      "청원군",
      ],
    충청남도: [ 
      "계룡시",
      "공주시",
      "논산시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "당진군",
      "부여군",
      "서천군",
      "연기군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",],
    경상북도: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
    경상남도: [
      "거제시",
      "김해시",
      "마산시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "진해시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
    전라북도: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
    전라남도: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
    제주도: ["서귀포시", "제주시"],
  };
  const allDistricts = Object.values(regions).flat();
  const debouncedKeyword = useDebounce(keyword, 500);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4058e52c48967d133b010f1e8dd392b1&libraries=services";
    script.async = true;
    script.onload = () => {
      const kakao = window.kakao;
      map.current = new kakao.maps.Map(mapContainer.current, {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      });
      setIsMapReady(true);
    };
    document.head.appendChild(script);

    return () => {
      markers.current.forEach((marker) => marker.setMap(null));
    };
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const mainkeyword = query.get("keyword");

    if (mainkeyword) {
      setKeyword(mainkeyword);
      searchPlaces(mainkeyword);
    }
  }, [location.search]);

  useEffect(() => {
    if (isMapReady && !keyword.trim()) {
      const defaultKeyword = "공차";
      setKeyword(defaultKeyword);
      searchPlaces(defaultKeyword);
    }
  }, [isMapReady]);

  useEffect(() => {
    if (debouncedKeyword.trim()) {
      searchPlaces(debouncedKeyword);
    }
  }, [debouncedKeyword, selectedCity, selectedDistrict]);

  useEffect(() => {
    if (selectedCity || selectedDistrict || debouncedKeyword.trim()) {
      searchPlaces();
    }
  }, [selectedCity, selectedDistrict, debouncedKeyword]);
  

  const searchPlaces = (searchKeyword = "") => {
    if (!map.current) return;
  
    const kakao = window.kakao;
    const ps = new kakao.maps.services.Places();
  
    const cityKeyword = selectedCity || "";
    const districtKeyword = selectedDistrict || "";
    const finalKeyword = `공차 ${cityKeyword} ${districtKeyword} ${searchKeyword || debouncedKeyword}`.trim();
    if (!finalKeyword) return;
  
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
  
    ps.keywordSearch(finalKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);
        setErrorMessage(""); 
        displayMarkers(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setPlaces([]);
        setErrorMessage("검색 결과가 없습니다."); 
      } else {
        setErrorMessage("검색 중 오류가 발생했습니다."); 
      }
    });
  };

  const displayMarkers = (places) => {
    const kakao = window.kakao;
    const bounds = new kakao.maps.LatLngBounds();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    places.forEach((place) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      const marker = new kakao.maps.Marker({ position, map: map.current });
      markers.current.push(marker);
      bounds.extend(position);

      kakao.maps.event.addListener(marker, "click", () => {
        const content = `
          <div style="padding:10px; width:200px;">
            <strong>${place.place_name}</strong><hr>
            <p>주소: ${place.address_name}</p>
            ${place.phone ? `<p>Tel: ${place.phone}</p>` : ""}
          </div>
        `;
        infowindow.setContent(content);
        infowindow.open(map.current, marker);
      });
    });

    map.current.setBounds(bounds);
  };

  const onSearch = (e) => {
    e.preventDefault();
    searchPlaces();
  };

  return (
    <main className="place">
      <div className='place_banner_wrap'>
              <div className='place_banner'>
                <div className='place_banner_cont'>
                  <h2>store</h2>
                  <p>공차의 매장을 쉽고 빠르게 찾아보세요.</p>
                </div>
              </div>
          </div>
    <div className="map_wrap">
      <div className="map_wrap_cont">
        <div
          className="map_container"
          ref={mapContainer}
          style={{
            width: "70%",
            height: "620px",
            position: "relative",
            overflow: "hidden",
          }}
        ></div>

<div id="menu_wrap" className="bg_white">
          <form onSubmit={onSearch}>
            <div>
              {}
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedDistrict(""); 
                }}
              >
                <option value="">시/도 선택</option>
                {Object.keys(regions).map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {}
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">구/군 선택</option>
                {selectedCity
                  ? regions[selectedCity].map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))
                  : allDistricts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
              </select>

              {}
              <div className="search_field"> 
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                size="15"
                placeholder="검색어를 입력하세요."
              />

              <button type="submit">
                <img src={searchIcon} alt="검색하기" />
              </button>
              </div>
            </div>
          </form>
          
          <ul id="placesList">
          {errorMessage && <div style={{ color: "red", display:"flex", justifyContent:'center',background:'#f1f2f2', alignItems:'center', height:'100%' }}>{errorMessage}</div>}
            {places.map((place, index) => (
              <li key={index}>
                <strong>{place.place_name}</strong>
                {place.road_address_name && <p>{place.road_address_name}</p>}
                <p>{place.address_name}</p>
                {place.phone && <p>{place.phone}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </main>
  );
}

export default KakaoMap;
