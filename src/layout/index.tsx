import React, { useEffect, useState } from "react";
import { Button, Layout, Select, theme } from "antd";
import Logo from "@images/Logo.jpg";
import "./style.scss";
import http from "../config";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuIds } from "@store";
import { LogoutOutlined } from "@ant-design/icons";
import { getCookies, removeCookies } from "../utils/cocies";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [data, setData]: any = useState([]);
  const { changeMenu_id }: any = MenuIds();
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  async function getMenuData() {
    try {
      const response = await http.get("/polls");
      setData(response?.data?.poll);
    } catch (err) {}
  }

  function logout(){
    removeCookies('access_token');
    navigate('/');
  }

  async function getUserData() {
    const response = await http.get("/profile");
    localStorage.setItem("user_id", response?.data?.id);
  }

  useEffect(() => {
    const token = getCookies('access_token');
    if(!token){
      navigate('/');
    }
    getMenuData();
    getUserData();
  }, []);

  return (
    <Layout>
      <Header className="header">
        <div onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}} className="demo-logo">
          <img src={Logo} alt="" />
          <p>Researchpsy</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <Select
            className="select"
            onSelect={(value) => changeMenu_id(value)}
            placeholder="Savollar tanglang"
          >
            {data.map((item: any, index: any) => (
              <option key={index} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
          <Button onClick={( ) => logout()} className="logout" style={{display: 'flex', alignItems: 'center'}}>
            <LogoutOutlined/>
            <p>Chiqish</p>
          </Button>
        </div>
        
      </Header>
      <Content
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 50px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 800,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />

          <div className="about">
            <p>Hurmatli do'stlar,</p>
            <p>
              Mening ismim <strong>Yuldasheva Nilufar</strong>. Psixolog
              sifatida tadqiqot sohasida faoliyat yuritaman va{" "}
              <strong>PhD</strong> ilmiy darajasiga egaman. Hozirda Xalqaro{" "}
              <strong>Nordik</strong> Universitetida katta o‘qituvchi sifatida
              dars beraman.
            </p>
            <p>
              Men asosan kognitiv psixologiya, tadqiqot metodologiyasi va
              psixodiagnostika sohalarida tadqiqotlar olib boraman. Ilmiy
              ishlarimda zamonaviy psixologik usullar va vositalardan
              foydalanishga alohida e'tibor beraman. Shuningdek, yosh olimlar va
              tadqiqotchilar bilan o‘z bilim va tajribalarimni ulashishdan
              mamnunman.
            </p>
            <p>
              Mening elektron pochta manzilim:{" "}
              <strong>
                <a href="mailto:nilukhanscience@mail.ru" target="_blank">
                  nilukhanscience@mail.ru
                </a>
              </strong>
              . Agar savollar yoki hamkorlikka qiziqish bildirsangiz, menga
              istalgan vaqtda telegram orqali{" "}
              <strong>
                <a href="https://tme/cognitivist1" target="_blank">
                  @cognitivist1
                </a>
              </strong>{" "}
              manzilidan murojaat qilishingiz mumkin.
            </p>
            <p>
              Hurmat bilan,
              <br />
              Yuldasheva Nilufar
              <br />
              Psixolog, tadqiqotchi, PhD
              <br />
              Xalqaro Nordik Universiteti katta o‘qituvchisi
            </p>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
      Researchpsy ©{new Date().getFullYear()} Yuldasheva Nilufar
      </Footer>
    </Layout>
  );
};

export default App;
