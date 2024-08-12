import { MenuIds } from "@store";
import { useEffect, useState } from "react";
import http from "../../config";
import { Button, Form, Radio, Spin } from "antd";
import './style.scss';
import { LoadingOutlined } from "@ant-design/icons";

function Index() {
  const { menu_id }: any = MenuIds();
  const [data, setData]: any = useState([]);
  const [variant, setVariant]: any = useState([]);
  const [answers, setAnswers]:any = useState<{ question_id: string; answer_point: number }[]>([]);
  const [poll, setPoll]:any = useState([])
  const [load, setLoad] = useState(false)

  async function getData() {
    try {
      if (menu_id) {
        const response = await http.get(`/questions/${menu_id}`);
        setPoll(response?.data?.poll)
        setData(response?.data?.question);
        setVariant(response?.data?.poll?.options);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, [menu_id]);

  const getLetter = (index: number) => {
    return String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
  };

  const handleAnswerChange = (question_id: string, answer_point: number) => {
    setAnswers((prevAnswers :any) => {
      const existingAnswerIndex = prevAnswers.findIndex((answer:any) => answer.question_id === question_id);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { question_id, answer_point };
        return updatedAnswers;
      }
      return [...prevAnswers, { question_id, answer_point }];
    });
  };

  useEffect(() => {
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
    }, 700);
  }, [menu_id])

  const handleSubmit = async () => {
    const payload = {
      answers: answers,
      poll_id: poll?.id,
      user_id: localStorage.getItem('user_id'),
    }
    try{
      const response = await http.post('/send-answers', payload)
      console.log(response);
    }catch(err){
      console.log(err);
    }
  };

  return (
    load ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 150}}> <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>
    :
    <div className="question">
      <h2 style={{textAlign: 'center', marginBottom: 40}}>{poll?.title}</h2>
      <Form onFinish={handleSubmit}>
        {data?.map((e: any, i: number) => (
          <div key={i} className="test">
            <p>{i+1}. {e.content}</p>
            <Form.Item name={`answer${i}`} rules={[{
              required: true,
              message: "Iltimos savollarni to'ldiring !"
            }]}>
              <Radio.Group
                className="radio"
                size="large"
                onChange={(event) => handleAnswerChange(e.id, event.target.value)}
              >
                {variant?.map((variant: any, index: number) => (
                  <Radio key={index} value={variant?.ball}>
                    {`${getLetter(index)}. ${variant?.variant}`}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
        ))}
        {
          menu_id && <Button style={{display: 'block', width: '100%', maxWidth: 100, margin: '0 auto'}} type="primary" htmlType="submit">Tasdiqlash</Button>
        }
      </Form>
    </div>
  );
}

export default Index;
