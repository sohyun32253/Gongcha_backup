import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CountUp from 'react-countup';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {  Autoplay,Navigation,Pagination } from 'swiper/modules';
import Carousel from 'react-bootstrap/Carousel';
import '../ContentStyle.css'
import franchise from '../images/franchise_consult.svg';
import customer from '../images/customer_consult.svg';
import appDownload from '../images/download_app.svg';
import topBtn from '../images/arrow_up.svg';
import main01 from '../images/main_01.jpeg';
import main02 from '../images/main_02.jpg';
import main03 from '../images/main_03.jpg';
import main04 from '../images/main_04.jpg';
import main05 from '../images/main_05.jpg';
import main06 from '../images/main_06.jpg';
import main07 from '../images/main_07.jpg';
import NewMenu01 from '../images/new_menu_01.png'
import NewMenu02 from '../images/new_menu_02.png'
import NewMenu03 from '../images/new_menu_03.png'
import NewMenu04 from '../images/new_menu_04.png'
import NewMenu05 from '../images/new_menu_05.png'
import NewMenu06 from '../images/new_menu_06.png'
import NewMenu07 from '../images/new_menu_07.png'
import NewMenu08 from '../images/new_menu_08.png'
import teaReceipe01 from '../images/tea_receipe_01.png'
import teaReceipe02 from '../images/tea_receipe_02.jpg'
import teaReceipe03 from '../images/tea_receipe_03.jpg'
import order01 from '../images/order_01.png'
import store01 from '../images/store_01.png'
import search from '../images/search_default.svg'
import global from '../images/global_right.png'
import globalTxt01 from '../images/global_txt_01.png'
import globalTxt02 from '../images/global_txt_02.png'
import sns01 from '../images/sns_01.png'
import sns02 from '../images/sns_02.png'
import sns03 from '../images/sns_03.png'
import sns04 from '../images/sns_04.png'

function Content() {
  const [index, setIndex] = useState(0);
  const [selectedBtn,setSelectedBtn] = useState('tea_01')
  const [selectedTea, setSelectedTea] = useState('tea_01');
  const h2Refs = useRef([]);
  const ioElementsRef = useRef([]);
  const sectionRef = useRef(null); 
  const [startCount, setStartCount] = useState(false); 

  const [keyword, setKeyword] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (keyword.trim() === "") {
      alert("검색어를 입력해주세요!"); 
      return;
    }
    
    navigate(`/store?keyword=${encodeURIComponent(keyword)}`);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0); 
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleClick = (tea) => {
    setSelectedTea(tea);
    setSelectedBtn(tea);
  };

 const setUpIntersectionObserver = (elements, className) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add(className);
      } else {
        target.classList.remove(className); 
      }
    });
  }, options);

  elements.forEach((item) => {
    if (item) observer.observe(item);
  });

  return () => {
    elements.forEach((item) => {
      if (item) observer.unobserve(item);
    });
  };
};

useEffect(() => {
  if (h2Refs.current.length > 0) {
    const cleanupH2Observer = setUpIntersectionObserver(h2Refs.current, 'visible');
    return () => {
      cleanupH2Observer();
    };
  }
}, []);

useEffect(() => {
  const ioElements = document.querySelectorAll('[data-io]');
  
  if (ioElements.length > 0) {
    ioElementsRef.current = ioElements; 
    const cleanupIoObserver = setUpIntersectionObserver(ioElementsRef.current, 'io-animation');
    return () => {
      cleanupIoObserver();
    };
  }
}, []);

useEffect(() => {
  const observer = new IntersectionObserver(
      (entries) => {
          if (entries[0].isIntersecting) {
              setStartCount(true); 
          }
      },
      { threshold: 0.5 } 
  );

  if (sectionRef.current) {
      observer.observe(sectionRef.current);
  }

  return () => {
      if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
      }
  };
}, []);

  return (
    <main className='main'>
      <ul className='quick_menu'>
        <li className='franchise'>
          <a href="#none">
            <img src={franchise} alt="가맹점 문의"/>
            <p>가맹 문의</p>
            <div className='quick_hover'>
              <p>가맹점 문의 <br/>02-3276-9581</p>
            </div>
          </a>
        </li>

        <li className='customer'>
          <a href="#none">
            <img src={customer} alt="고객문의"/>
            <p>고객 문의</p>
            <div className='quick_hover'>
              <p>대표 전화 <br/>02-779-7758</p>
            </div>
          </a>
        </li>

        <li className='download'>
          <a href="#none">
            <img src={appDownload} alt="앱 다운로드"/>
            <p>앱 다운로드</p>
          </a>
        </li>

        <li className='top_btn'>
          <button onClick={scrollToTop}>
            <img src={topBtn} alt="위로가기"/>
            <p>Top</p>
          </button>
        </li>
      </ul>

    <div className='main_image'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img id='img_size' className="d-block w-100" src={main01}  alt="너는 맛이 참 곱구마 빠다 고구마 모두가 반한 그 맛 단짠단짠 맛있구마 with 타로폼"/>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={main02} alt="이달의 신메뉴 빠다 고구마 4종 구매 시 스탬프 3배 적립 2024년 9월 3일부터 7일까지 7일간"/>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={main03} alt="짜장 펄볶이의 검은 유혹 맛의 대폭발 짜장" />
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={main04} alt="kT멤버십 모여라 제조 음료 전체 10% 할인" />
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={main05} alt="돌아온 초코바른 당신이 찾던 그때 그 맛 그대로"/>
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={main06} alt="LG U+와 공차 콜라보 u+멤버십 VIP콕 회원 공차 블랙밀크티 무료 증정" />
          </Carousel.Item>

          <Carousel.Item>
            <img className="d-block w-100" src={main07} alt="베스트셀러 1위 블랙 밀크티+펄 2위 초콜릿 밀크티+밀크폼 3위 망고요구르트+화이트펄 4위 딸기 쿠키 스무디+펄 5위 우롱티+코코넛+밀크폼" />
          </Carousel.Item>
        </Carousel>
    </div>

    <section className='new_menu'>
        <div className='new_menu_cont'>
          <h2 ref={(el) => (h2Refs.current[0] = el)} className='slide-up'>New menu</h2>
            <p>공차의 새로운 메뉴를 지금 만나보세요.</p>
            <Swiper
            slidesPerView={5} 
            spaceBetween={20}
            centeredSlides = {true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}  
            pagination={{ clickable: true }}
            modules={[Autoplay,Pagination,Navigation]}
            className="mySwiper"
            breakpoints={{
            1280: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
            375: {
              slidesPerView: 1,
            },
          }}
        >
              <SwiperSlide>
                <img src={NewMenu01} alt="빠다 고구마 크림 밀크티" />
                <p>빠다 고구마 크림 밀크티</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu02} alt="빠다 고구마 밀크티 + 펄" />
                <p>빠다 고구마 밀크티 + 펄</p>
                </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu03} alt="빠다 고구마 크림 밀크" />
                <p>빠다 고구마 크림 밀크</p>
                </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu04} alt="빠다 고구마 크림 스무디" />
                <p>빠다 고구마 크림 스무디</p>
                </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu05} alt="초코바른 피스타치오 스무디"/>
                <p>초코바른 피스타치오 스무디</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu06} alt="초코바른 제주 그린 스무디"/>
                <p>초코바른 제주 그린 스무디</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu07} alt="초코바른 초코 스무디"/>
                <p>초코바른 초코 스무디</p>
              </SwiperSlide>
              <SwiperSlide>
                <img src={NewMenu08} alt="피스타치오 밀크티 + 펄"/>
                <p>피스타치오 밀크티 + 펄</p>
              </SwiperSlide>
            </Swiper>
        </div>
    </section>

    <section className='tea_receipe'>
      <div className='tea_receipe_cont'>
        <h2 ref={(el) => (h2Refs.current[1] = el)} className='slide-up'>Tea receipe</h2>
          <div className='tea_btn'>
              <div className={`tea_01 ${selectedBtn === 'tea_01' ? 'active' : ''}`}
              onClick={() => handleClick('tea_01')}><a href="#none">오리지널티</a></div>
              <div className={`tea_02 ${selectedBtn === 'tea_02' ? 'active' : ''} `}
              onClick={()=>handleClick('tea_02')}><a href="#none">밀크티</a></div>
              <div className= {`tea_03 ${selectedBtn === 'tea_03' ? 'active' : ''} `}
              onClick={()=>handleClick('tea_03')}><a href="#none">푸룻티</a></div>
          </div>

        <div className='change_cont'  data-io="fade-in">
        {selectedTea === 'tea_01' && (
          <div className='cont_01'>
            <img src={teaReceipe01} alt="오리지널티 레시피" />
            <dl>
              <dt>Original tea</dt>
              <dd>티백이나 가루가 아닌 황실에 바치던 잎차만 골라 1도 1초도 어기지 않고<br /> 다른 황금률로 우려 한 잔 한 잔 부드러움을 더해 만듭니다.</dd>
            </dl>
          </div>)}

          {selectedTea === 'tea_02' && (
          <div className= 'cont_02'>
            <img src={teaReceipe02} alt="밀크티 레시피" />
            <dl>
              <dt>Milk tea</dt>
              <dd>최적의 자연이 키워낸 입차만 골라 각 차종에 맞는 황금률로 우려 담백한 우유와 <br />허니, 카라멜 등 새로운 맛을 더해 만듭니다. </dd>
            </dl>
          </div>)}

            { selectedTea === 'tea_03'&& (
          <div className='cont_03'>
            <img src={teaReceipe03} alt="푸룻티 레시피" />
            <dl>
              <dt>Fruit tea</dt>
              <dd>찻잎의 푸름을 간직한 녹차만 골라 최적의 온도 89℃로 우려 <br />달콤상큼한 과일을 더해 만듭니다. </dd>
            </dl>
          </div>)}

          <a href='#none'><button>레시피 보러가기<span> > </span></button></a>

        </div>   
      </div>   
    </section>

    <section className='order_store'>
        <div className='order_store_cont'>
        <h2 ref={(el) => (h2Refs.current[2] = el)} className='slide-up'>order & store</h2>
          <div className='order_store_wrap' data-io="fade-in">
            <div className='order'>
                <div className='order_left'>
                  <h3>주문하기</h3>
                  <p>토핑, 당도, 얼음량을 조절하여 <br />나만의 메뉴를 만들어보세요.</p>
                </div>
                <button>자세히 보기 <span> > </span></button>
                <img src={order01} alt="음료 이미지" />
            </div>

              <div className='store'>
                <div className='store_left'>
                  <h3>매장 찾기</h3>
                  <p>공차를 쉽고 빠르게 찾아보세요.</p>
                  <form onSubmit={handleSearch}>
                    <input type="text" placeholder='매장을 입력하세요'  
                    onChange={(e) => setKeyword(e.target.value)} value={keyword}/>
                    <button type="submit">
                      <img src={search} className='store_right' alt="매장 검색하기" />
                    </button>
                  </form>
                </div>
                <img src={store01} alt="공차 로고" />
              </div>
          </div>
        </div>
    </section>

    <section className='global' ref={sectionRef}>
        <div className='global_cont'>
            <div className='global_left'>
              <h2 ref={(el) => (h2Refs.current[3] = el)}>Global, Gong cha</h2>
              <p>공차는 새로운 차 문화를 선도하는 브랜드로 <br />전세계적인 사랑을 받고 있습니다.</p>
              {startCount && (
              <div className='number_slide_up'>
                  <div className='count_01'>
                      <CountUp start={0} end={24} duration={2.5} separator="," />
                      <span className='txt_01'><img src={globalTxt01} alt="24개국" /></span> 
                  </div>
                  <div className='count_02'>
                      <CountUp start={0} end={2000} duration={2.5} separator="," />
                      <span className='txt_02'><img src={globalTxt02} alt="2000점 운영" /></span>
                  </div>
              </div>)}
            </div>
          <img src={global} alt="세계지도" data-io="fade-in"/>
        </div>
    </section>
   

    <section className='sns_insta'>
      <div className='sns_cont'>
        <h2 ref={(el) => (h2Refs.current[4] = el)} className='slide-up'>SNS</h2>
        <div className='cont_wrap' data-io="fade-in">
            <div className='cont_top'>
              <div className='insta01'>
                <a href="#none"><img src={sns01} alt="insta01" /></a>
              </div>
              
              <div className='insta02'>
                <a href="#none"><img src={sns02} alt="insta02" /></a>
              </div>
            </div>

            <div className='cont_bottom'>
              <div className='insta03'>
                <a href="#none"><img src={sns03} alt="insta03" /></a>
              </div>

              <div className='insta04'>
                <a href="#none"><img src={sns04} alt="insta04" /></a>
              </div>
            </div>
        </div>
      </div>
    </section>
   </main>
  );
}

export default Content;
