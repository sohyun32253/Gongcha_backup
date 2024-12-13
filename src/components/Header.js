import React, { useState } from 'react'
import '../HeaderStyle.css';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import h1Logo from '../images/h1_logo.png'
import h2Logo from '../images/h2_logo.png'
import menuIcon from '../images/menu.svg'
import CloseIcon from '../images/close.svg'

function Header({ isAuthenticated, setIsAuthenticated }) {
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/');
            setIsAuthenticated(false); 
        }).catch((error) => {
            console.error('Logout error:', error);
        });
    };
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); 
    const [visible, setVisible] = useState(false);
    const [openMenu, setOpenMenu] = useState(null); 
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const toggleMenu = (menuName) => {
        setOpenMenu(prevMenu => (prevMenu === menuName ? null : menuName));
    };

    function PopupMenu() {
        setVisible(!visible);
    }

    return(
        <header className='header'>
            <div className='header_cont'>
            <Link to='/'><h1><img src={h1Logo} alt='Gongcha logo'/></h1></Link>
                <div className='gnb'>
                    <nav>
                        <ul onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <li lass="menu">
                                <a href="#none">Brand</a>
                                <ul>
                                    <li><Link to='./BrandAbout'>브랜드 소개</Link></li>
                                    <li><Link to='./BrandPromise'>공차의 약속</Link></li>
                                    <li><Link to='./BrandIdentity'>브랜드 아이덴티티</Link></li>
                                </ul>
                            </li>

                            <li>
                                <a href='#none'>Menu</a>
                                <ul>
                                    <li><Link to='./MenuOrder'>주문방법</Link></li>
                                    <li><Link to='/MenuDrink'>음료</Link></li>
                                    <li><Link to='./MenuDM'>디저트 &#183; MD</Link></li>
                                    <li><Link to='./MenuReceipe'>티레시피</Link></li>
                                </ul>
                            </li>

                            <li>
                                <a href='#none'>Store</a>
                                <ul>
                                    <li><Link to='./Store'>매장 찾기</Link></li>
                                    <li><a href='#none'>가맹점 개설문의</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href='#none'>Membership</a>
                                <ul>
                                    <li><a href='#none'>공차 멤버십</a></li>
                                    <li><a href='#none'>공차 카드 &#38; e-Gift</a></li>
                                    <li><a href='#none'>FAQ</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href='#none'>Benefit</a>
                                <ul>
                                    <li><a href='#none'>통신사 제휴</a></li>
                                    <li><a href='#none'>결제 서비스</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href='#none'>Event&#38;News</a>
                                <ul>
                                    <li><a href='#none'>이벤트</a></li>
                                    <li><a href='#none'>공차소식</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='util_menu01'>
                    {isAuthenticated ? (
                        <>
                         <Link to='/Mypage'>Mypage</Link>
                         <span> ㅣ </span>
                        <button onClick={handleLogout}>Log out</button>
                        </>
                    ) : (
                        <>
                            <Link to='/Login'>Log in</Link>
                            <span> ㅣ </span>
                            <Link to='/Join'>Join</Link>
                        </>
                    )}
                </div>
            </div>

            <div className='hamburger_menu'>
                <button onClick={PopupMenu}><img src={menuIcon} alt="menu" className='menu'/></button>
                
                <div className={`main_go_to ${visible ? 'show' : 'hide'}`}>
                    <h2><img src={h2Logo} alt="Gongcha logo" /></h2>
                    <ul>
                        <li>
                            <a href='#none' onClick={(e) => {e.preventDefault(); toggleMenu('brand');}}>Brand</a>
                            {openMenu === 'brand' && (
                            <ul>
                                <li><a href='#none'>브랜드 소개</a></li>
                                <li><a href='#none'>공차의 약속</a></li>
                                <li><a href='#none'>브랜드 아이덴티티</a></li>
                            </ul>
                            )}
                        </li>

                        <li>
                            <a href='#none' onClick={() => toggleMenu('menu')}>Menu</a>
                            {openMenu === 'menu' && (
                            <ul>
                                <li><a href='#none'>주문방법</a></li>
                                <li><Link to='/MenuDrink.js'>음료</Link></li>
                                <li><a href='#none'>디저트 &#183; MD</a></li>
                                <li><a href='#none'>티레시피</a></li>
                            </ul>
                            )}
                        </li>

                        <li>
                            <a href='#none' onClick={() => toggleMenu('store')}>Store</a>
                            {openMenu === 'store' && (
                            <ul>
                                <li><a href='#none'>매장 찾기</a></li>
                                <li><a href='#none'>가맹점 개설문의</a></li>
                            </ul>
                            )}
                        </li>

                        <li>
                            <a href='#none' onClick={() => toggleMenu('membership')}>Membership</a>
                            {openMenu === 'membership' && (
                            <ul>
                                <li><a href='#none'>공차 멤버십</a></li>
                                <li><a href='#none'>공차 카드 &#38; e-Gift</a></li>
                                <li><a href='#none'>FAQ</a></li>
                            </ul>
                            )}
                        </li>

                        <li>
                            <a href='#none' onClick={() => toggleMenu('benefit')}>Benefit</a>
                            {openMenu === 'benefit' && (
                            <ul>
                                <li><a href='#none'>통신사 제휴</a></li>
                                <li><a href='#none'>결제 서비스</a></li>
                            </ul>
                            )}
                        </li>

                        <li>
                            <a href='#none' onClick={() => toggleMenu('eventNews')}>Event&#38;News</a>
                            {openMenu === 'eventNews' && (
                            <ul>
                                <li><a href='#none'>이벤트</a></li>
                                <li><a href='#none'>공차소식</a></li>
                            </ul>
                            )}
                        </li>
                    </ul>

                        <div className='util_menu02'>
                            <a href='#none'>가맹문의</a>
                            <a href='#none'>고객 상담</a>
                            <Link to='/Login'>Log in</Link>
                            <Link to='/Join'>Join</Link>
                        </div>

                        <button onClick={PopupMenu} className='close_btn'><img src={CloseIcon} alt="메뉴닫기" /></button>
                </div> 
            </div>
            <div className={`gnb_bg ${isHovered ? 'slide-down' : ''}`} ></div>
        </header>
    )
}
export default Header;