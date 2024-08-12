import React from 'react';
import { Flex, GetProps, Input, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import './style.scss';
import http from '../../config';
import { useNavigate } from 'react-router-dom';

type OTPProps = GetProps<typeof Input.OTP>;

const { Title } = Typography;

const App: React.FC = () => {
  const navigate = useNavigate()
  const onChange: OTPProps['onChange'] = async (text:any) => {

    if (text.length === 6) {
      try {
        const response = await http.post('/confirm-registration', { code: text, email: localStorage.getItem('email') });
        if(response?.status == 200){
          toast.success('Kod muvaffaqiyatli tasdiqlandi !', { autoClose: 1200 });
          setTimeout(() => {
            navigate('/')
          }, 1500);
        }
        console.log(response);
      }catch(err){
        toast.error("Kodda xatolik mavjud qayta tekshirib ko'ring !", { autoClose: 1200 });
        console.log(err);
      }
    }
  };


  return (
    <div>
      <ToastContainer />
      <div className="verify" style={{ width: '100%', maxWidth: '400px', padding: 30, margin: '0 auto', marginTop: 200 }}>
        <Flex gap="middle" align="flex-start" vertical>
          <Title level={5}>Emailingizga tasdiqlash kodini yubordik. <br /> Kodni kiriting!</Title>
          <Input.OTP  onChange={(text) => onChange(text)} length={6}/>
        </Flex>
      </div>
    </div>
  );
};

export default App;
