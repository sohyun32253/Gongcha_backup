import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../Mypage.css';
import mypage01 from '../images/mypage_01.png';
import coupon from '../images/coupon.svg';
import arrow from '../images/stamp_arrow.png';
import close from '../images/close.svg'
import barcode from '../images/membership_barcode.png'

function MyPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMembershipBtn,setSelectedMembershipBtn] = useState('membership_btn')
  const [selectedMembershipCont,setSelectedMembershipCont] = useState('membership_btn')
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

  function membershipClick(e){
    setSelectedMembershipBtn(e) 
    setSelectedMembershipCont(e)
  } 

  function membership01Popup(){
    setIsPopupVisible(true);
  }

  function closePopup(){
    setIsPopupVisible(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User UID:', user.uid); // 로그인한 사용자 UID 확인
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          console.log('User Document Exists:', userDoc.exists()); // 문서 존재 여부 확인
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error('User data not found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user is logged in');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className='mypage'>
      <div className='mypage_banner'>
          <h2>마이페이지</h2>
          <p>공차의 다양한 혜택을 확인하세요.</p>
      </div>

    <div className='mypage_wrap'>
      <ul className='mypage_gnb'>
          <li><button className={`membership_btn ${selectedMembershipBtn === 'membership_btn' ? 'active' : ''}`}
          onClick={() => membershipClick('membership_btn')}>멤버십 / 스탬프 적립</button></li>
          <li><button className={`mycard_btn ${selectedMembershipBtn === 'mycard_btn' ? 'active' : ''}`}
          onClick={() => membershipClick('mycard_btn')}>My 공차 카드</button></li>
      </ul>

   
      <div className='mypage_cont'>
        <img src={mypage01} alt="logo" />
        {selectedMembershipCont === 'mycard_btn' &&(
          <div className='mycard_wrap'>
          <div className='mycard'>
              <div className='mycard_cont'>
                <img src={barcode}  alt='바코드' />
                <p className='barcode_number'>{userData.barcode}</p>
              </div>
          </div>
       </div>
    )}

     

      {selectedMembershipCont === 'membership_btn' && (
      <div className='mb_change_cont'>
      <h3>공차 멤버십</h3>
      <p>공차만의 특별한 혜택을 만나보세요.</p>


      <div className='membership_card_wrap'>
        <div className='membership_card'>
            <div className='membership_card_cont'>
              <p>{userData.name}님 환영합니다.</p>
              <p>스탬프 카드 완성까지 {userData.stamp_margin}개의 스탬프가 남았습니다.</p>
              <p className='mb'><span>{userData.stamp}</span> / 10</p>
              <div className='btn_wrap'>
                <button className='stamp_view' onClick={membership01Popup}>적립내역 보기 <img src={arrow} alt="스탬프 보기" /></button>
                <button className='my_coupon_view'>My 쿠폰 보기 <img src={coupon} alt="쿠폰 보기" /></button> 
              </div>
       </div>
              
            {isPopupVisible === true &&(
              <div className='popup-overlay'>
                   <div className='stamp_coupon popup'>
                <div className='popup_inner'>
                  <table>
                    <tr>
                      <th scope='col'>거래일자</th>
                      <th scope='col'>구분</th>
                      <th scope='col'>스탬프</th>
                      <th scope='col'>매장</th>
                    </tr>

                    <tr>
                      <td>{userData.day_01}</td>
                      <td>{userData.membership}</td>
                      <td>{userData.stamp_01}</td>
                      <td>{userData.store_01}</td>
                    </tr>

                    <tr>
                      <td>{userData.day_02}</td>
                      <td>{userData.membership}</td>
                      <td>{userData.stamp_02}</td>
                      <td>{userData.store_02}</td>
                    </tr>

                    <tr>
                      <td>{userData.day_03}</td>
                      <td>{userData.membership}</td>
                      <td>{userData.stamp_02}</td>
                      <td>{userData.store_01}</td>
                    </tr>
                  
                  </table>
                  <button onClick={closePopup}><img src={close} alt="창 닫기" /></button>
                </div>
              </div> 
              </div>)} 
             
            

            <div className='my_coupon'>
                
            </div>
          </div>
      </div>
      

      <div className='stamp_info'>
        <div className='service'>
          <h4>공차 스탬프 카드</h4>
          <p>카드 유효기간 : 2024.09.06~2025.03.04</p>
          <p>스탬프 10개 적립 시 무료 음료 1잔 쿠폰 제공</p> 
        </div>
      

        <div className='reward'>
          <h4>스탬프 적립 안내</h4>
            <p>
            제조 음료 1잔 결제 시 스탬프 1개 적립됩니다.<br/>
            <span>(병음료, 쿠폰 사용 음료, MD 제외/ 단, 빙수 포함)</span>
            </p>
            <p>당일에 한해 해당 매장에서 추후 적립 가능합니다. <span>(본인 결제건에 한함. 영수증 필참)</span></p>
            <p>매장 주문 및 [오더], [키오스크] 주문 시 적립 가능하며 [배달 앱 주문] 결제 시 스탬프 적립이 불가합니다.</p>
            <p>타 쿠폰 및 프로모션 이용 시 스탬프 적립 여부는 행사별 안내 참조 바랍니다. <span>(단, 제휴 혜택 이용 시 스탬프 적립 불가)</span></p>
            <p>결제 취소 시 적립된 스탬프 자동 회수됩니다.</p>
            <p>적립된 스탬프의 유효기간은 적립된 스탬프 카드의 유효기간과 동일합니다.<br/>
              <span>(스탬프 카드 유효기간 경과 시, 적립된 스탬프는 카드와 함께 자동 소멸)</span>
            </p>
            <p>스탬프 카드 유효기간 : 첫 번째 스탬프 적립일로부터 180일</p>
        </div>

        <div className='use'>
          <h4>스탬프 쿠폰 사용 안내</h4>
            <p>
            스탬프 카드 완성 시 [쿠폰받기] 버튼을 누르면 쿠폰 다운로드 화면으로 이동합니다.</p>
            <p>쿠폰을 다운로드하지 않은 상태에서는 [My쿠폰]에서 쿠폰 확인 및 사용이 불가합니다.</p>
            <p>스탬프 쿠폰 다운로드 기간은 스탬프 카드 완성일로부터 31일이며, 31일 이내 다운로드하지 않은 쿠폰은 소멸됩니다.
            <br/> <span>(단, 멤버십 이벤트에 따라 스탬프 쿠폰 다운로드 기간이 기존과 차이가 있을 수 있습니다.)</span>
            </p>
            <p>스탬프 카드 완성 후 결제 취소 및 결제수단 변경에 따른 스탬프 적립 취소 시, 스탬프 쿠폰은 소멸되며 적립중인 스탬프 카드 상태로 원복됩니다.
             <br/> <span>(단, 스탬프 카드의 유효기간이 만료된 경우, 스탬프 쿠폰 및 카드에 적립되었던 스탬프는 모두 소멸됩니다.)</span>
            </p>
        </div>
        </div>
      </div>
    )}
      </div>      
      {userData ? (
        <div>
          <p></p>
          <p>{userData.email}</p>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
     
    </main>
  );
}

export default MyPage;
