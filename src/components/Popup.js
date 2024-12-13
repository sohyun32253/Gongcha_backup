import React, { useState,useEffect } from 'react';
import './Popup.css'
import popupClose from '../images/close.svg'

function Popup({ content, onClose }) {
    const [selectedSize,setSelectedSize] = useState('null');
    const [selectedNut,setSelectedNut] = useState('null');
    const [isJumboOnly, setIsJumboOnly] = useState(false); 

    useEffect(() => {
      if (content.isLargeAvailable) {
          setSelectedSize('large');
          setSelectedNut('large');
      } else if (content.isJumboAvailable) {
          setSelectedSize('jumbo');
          setSelectedNut('jumbo');
      }

       // J 버튼만 있을 경우 상태 설정
       if (!content.isLargeAvailable && content.isJumboAvailable) {
        setIsJumboOnly(true);
      } else {
        setIsJumboOnly(false);
      }

  }, [content.isLargeAvailable, content.isJumboAvailable]);

    const sizeClick = (size) => {
        setSelectedSize(size);
        setSelectedNut(size);
    }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className='popup_bg'>
        </div>
        <button className="popup-close" onClick={onClose}><img src={popupClose} alt="창 닫기" /></button>
        
        <div className='popup_wrap'>
          <img src={content.image} alt={content.title} />
              <div className='menu_cont_right'>
                <h4>{content.title}</h4>
                <p className='desc'>{content.description}</p>
                <p className={`price ${isJumboOnly ? 'jumbo-only' : ''}`}>{content.L_price}</p>
                <p className='kcal_size'>{content.L_kcal}</p>
                <p className={`price ${isJumboOnly ? 'jumbo-only' : ''}`}>{content.J_price}</p>
                <p className='kcal_size'>{content.J_kcal}</p>
                <p className='warning'>{content.warning}</p>
                <div className='size_btn'>
                  {content.isLargeAvailable && (
                    <button className={`large ${selectedSize === 'large' ? 'active' : ''}`} 
                    onClick={ () => sizeClick('large')}>L</button>
                  )}
                    {content.isJumboAvailable && (
                    <button className={`jumbo ${selectedSize === 'jumbo' ? 'active' : ''}`} 
                    onClick={ () => sizeClick('jumbo')}>J</button>
                    )}
                </div>
                { selectedNut === 'large' && (
                <div className='nutritional_cont large'>
                  <div className='cont_01'>
                      <p>일회제공량 {content.L_size}</p>
                      <p>당류 {content.L_sugar}</p>
                      <p>단백질 {content.L_protein}</p>
                  </div>
                
                  <div className='cont_02'>
                      <p>포화지방 {content.L_fat}</p>
                      <p>나트륨 {content.L_natrium}</p>
                      <p>카페인 {content.L_caffeine}</p>
                  </div>
              </div>
                )}

                { selectedNut === 'jumbo' && (
                <div className='nutritional_cont jumbo'>
                  <div className='cont_01'>
                      <p>일회제공량 {content.J_size}</p>
                      <p>당류 {content.J_sugar}</p>
                      <p>단백질 {content.J_protein}</p>
                  </div>
                
                  <div className='cont_02'>
                      <p>포화지방 {content.J_fat}</p>
                      <p>나트륨 {content.J_natrium}</p>
                      <p>카페인 {content.J_caffeine}</p>
                  </div>
                </div>
              )}
              </div>
          </div>
        </div>
    </div>
  );
}

export default Popup;
