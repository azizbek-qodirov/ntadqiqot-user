import { ToastContainer } from "react-toastify";
import { Button, Form, Input, Radio, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../config";

function Login() {
  const [load, setLoadi] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values: any) {
    setLoadi(true);
    values.working_experience = +values.working_experience
    localStorage.setItem('email', values?.email)
    try{
      const response = await http.post('/register', values)
      if(response?.status === 200 ){
        navigate('/verify-password')
      }
    }catch(err){
      setLoadi(false)
    }
    
  }

  return (
    <>
      <ToastContainer />

      <div className="login">
        <div className="login-form" style={{ marginTop: 30 }}>
          <div className="login-title">
            {/* <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png?f=webp"
              alt=""
            /> */}
            <h1>Psixolog</h1>
          </div>

          <div className="login-body">
            <Form onFinish={(values) => handleSubmit(values)}>
              <p>Ismingiz</p>
              <FormItem
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Ismingizni kiriting !",
                  },
                ]}
              >
                <Input size="large" placeholder="Jasurbek" name="name" />
              </FormItem>

              <p>Familyangiz</p>
              <FormItem
                name="surname"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Familyangizni kiriting !",
                  },
                ]}
              >
                <Input size="large" placeholder="Abdullayev" name="surname" />
              </FormItem>

              <p>Email</p>
              <FormItem
                name="email"
                hasFeedback
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Emailingizni to'g'ri formatda kiriting !",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="jasurbek@mail.ru"
                  name="email"
                />
              </FormItem>

              <p>Telefon raqamingiz</p>
              <FormItem
                name="phone_number"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Telefon raqamingizni kiriting !",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="+998 ( 99 ) 999 99 99"
                  name="phone_number"
                />
              </FormItem>

              <p>Darajangiz</p>
              <FormItem
                name="level_type"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Darajangizni kiriting !",
                  },
                ]}
              >
                <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="label"
                    options={[
                      {
                        value: "junior",
                        label: "Junior",
                      },
                      {
                        value: "middle",
                        label: "Middle",
                      },
                      {
                        value: "senior",
                        label: "Senior",
                      },
                    ]}
                  />
              </FormItem>

              <p>Tajribangiz</p>
              <FormItem
                name="working_experience"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Tajribangizni kiriting ! (0 - 9 )",
                  },
                ]}
              >
                <Input
                  type="number"
                  size="large"
                  placeholder="(0 - 9 )"
                  name="working_experience"
                />
              </FormItem>


              <p>Password</p>
              <FormItem
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input a valid password",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  name="password"
                  placeholder="password"
                />
              </FormItem>

              <p>Jinsingiz</p>
              <FormItem
                name="gender"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Jinsingizni kiriting !",
                  },
                ]}
              >
                  <Radio.Group>
                    <Radio value={'male'}>Erkak</Radio>
                    <Radio value={'female'}>Ayol</Radio>
                   
                  </Radio.Group>
              </FormItem>

              <FormItem>
                <Button loading={load} htmlType="submit" type="primary">
                  Submit
                </Button>
              </FormItem>

              <div className="login-tooltip"></div>

              <Link className="login-link" to={"/"}>
                Login
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
