import { useForm } from 'react-hook-form';
import '../Join.css'
import h1Login from '../images/h1_logo.png'

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const password = watch('password');

  function joinBtnClick(e){
    e.preventDefault();
    alert("회원가입에 성공하셨습니다.");
    
  }

  return (
    <main className='join'>
    <div className='join_banner'>
          <h2>회원가입</h2>
      </div>

      <div className='join_form'>
      <h1><img src={h1Login} alt="logo" /></h1>
    <form onSubmit={handleSubmit(onSubmit)}>
     {}
     <p>
          <input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 주소를 입력해주세요.',
              },
            })}
          />
        </p>
        {errors.email && <p>{errors.email.message}</p>}

        {}
        <p>
          <input
            type="password"
            placeholder="8자리 이상의 비밀번호를 입력해주세요."
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자리 이상이어야 합니다.',
              },
            })}
          />
        </p>
        {errors.password && <p>{errors.password.message}</p>}

        {}
        <p>
          <input
            type="password"
            placeholder="비밀번호 확인"
            {...register('confirmPassword', {
              required: '비밀번호 확인을 입력해주세요.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
        </p>
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <button type="submit" className='join_btn' onClick={joinBtnClick}>회원가입</button>
    </form>
    </div>
    </main>
  );
}

export default Join;