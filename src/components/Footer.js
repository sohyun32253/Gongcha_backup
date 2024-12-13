import React from 'react'
import '../FooterStyle.css'
import h1Logo from '../images/h1_logo.png'
import faceBook from '../images/facebook.png'
import kakaoTalk from '../images/kakao.png'
import instagram from '../images/insta.png'

function Footer() {
    return(
       <footer className='footer'>
        <div className='footer_cont'>
            <h2><img src={h1Logo} alt="Gongcha logo" /></h2>
            <div className='footer_center'>
                <div className='fc_top'>
                    <ul>
                        <li><a href="#none">회사소개</a></li>
                        <li><a href="#none">제휴&#47;제안</a></li>
                        <li><a href="#none">고객센터</a></li>
                        <li className='fw'><a href="#none">개인정보처리방침</a></li>
                        <li><a href="#none">이메일무단수집거부</a></li>
                        <li><a href="#none">윤리규범 실천지침</a></li>
                        <li><a href="#none">HOT&#45;LINE</a></li>
                    </ul>
                </div>
                <div className='fc_bottom'>
                    <div className='address'>
                        <p>서울 종로구 종로 47&#40;공평동, 7층&#41;</p>
                        <p>&#40;주&#41;공차 코리아 대표이사 고희경</p>
                        <p>사업자 등록번호 214&#45;88&#45;84534</p>
                        <p>통신판매번호 &#58; 2020&#45;서울종로&#45;0966</p>
                    </div>
                    <p>(C)GONGCHA KOREA CO.,LTD ALL RIGHTS RESERVED.</p>
                </div>
            </div>
            <div className='sns'>
                <a href="#none"><img src={faceBook} alt="facebook" /></a>
                <a href="#none"><img src={instagram} alt="instagram" /></a>
                <a href="#none"><img src={kakaoTalk} alt="kakaotalk" /></a>
            </div>
        </div>
       </footer>
    )
}
export default Footer;