import ChatBot from "react-simple-chatbot";
import "../styles/chatbot.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import checkoutApi from "~/apis/modules/checkout.api";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";


const ChatGeminiResponse = (props) => {
  const handleNext = () => {
    props.triggerNextStep();
  };

  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchDataFromGeminiProAPI() {
    try {
      // ONLY TEXT
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = result.response.text();
      console.log(text);
      setLoading(false);
      setData(text);
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  return (
    <Box width={"100%"}>
      <TextField
        type="text"
        style={{ width: "100%" }}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Typography>{data}</Typography>
      <Button disabled={loading} onClick={() => fetchDataFromGeminiProAPI()}>
        {loading ? "Loading..." : "Hỏi"}</Button>
      <Button onClick={() => handleNext()}>Bạn cần giúp đỡ những gì</Button>
    </Box>
  );
};

const ChatBotPage = () => {
  return (
    <ChatBot steps={[
      {
        id: "1",
        message: "Xin chào, mình có thể giúp gì cho bạn hôm nay?",
        trigger: "2"
      },
      {
        id: "2",
        options: [
          { value: 1, label: "Các giống chó, mèo của cửa hàng?", trigger: "3" },
          { value: 2, label: "Giá giao động của các thú cưng?", trigger: "4" },
          { value: 3, label: "Đồ cho chó, mèo như thế nào?", trigger: "5" },
          { value: 4, label: "Phí giao hàng như thế nào?", trigger: "6" },
          { value: 5, label: "Tình trạng đơn hàng của tôi?", trigger: "8" },
          {
            value: 6,
            label: "Tôi muốn hỏi thêm chi tiết",
            trigger: "7"
          }
        ]
      },
      {
        id: "3",
        message: "Bên mình cung cấp các giống như: Corgi, Poodle, Husky, Golden, Mèo Anh Lông ngắn... và nhiều giống khác bạn có thể xem ở danh mục chó cảnh",
        trigger: "2"
      },
      {
        id: "4",
        message: "Bên mình cung cấp các chó, mèo cảnh có mức giá đa dạng từ 1 triệu đồng trở lên",
        trigger: "2"
      },
      {
        id: "5",
        message: "Bên mình chuyên cung cấp đồ dùng, thức ăn cho chó, mèo với sản phẩm chất lượng, uy tín, bạn có thể truy cập trang đồ cho chó để xem thêm",
        trigger: "2"
      },
      {
        id: "6",
        message: "Cửa hàng chúng tôi sẽ giao thú cưng cho bạn đến nới an toàn, thời gian từ 3 - 5 ngày và hoàn toàn miễn phí",
        trigger: "2"
      },
      // {
      //   id: "search",
      //   user: true,
      //   trigger: "7"
      // },
      {
        id: "7",
        component: <ChatGeminiResponse />,
        waitAction: true,
        trigger: "2"
      },
      {
        id: "8",
        component: <ChatShipResponse />,
        waitAction: true,
        trigger: "2"
      }
    ]}
    headerTitle="Bot Petshop"
    floating={true}
    className="chat-bot-pet"
    placeholder="Hãy gửi gì đó"
    />
  );
};

export default ChatBotPage;

const ChatShipResponse = (props) => {
  const handleNext = () => {
    props.triggerNextStep();
  };
  const { user } = useSelector(state => state.user);
  const [value, setValue] = useState();

  useEffect(() => {
    const get = async () => {
      const { response, err } = await checkoutApi.getList({ user_id:user.id });
      if (response) {
        setValue(response);
      }
      if (err)
      {
        setValue(err);
      }
    };
    get();
  }, [user]);

  return (
    <Box>
      <Typography>Bạn đang có {value?.length} đơn mua hàng</Typography>
      <Button onClick={() => handleNext()}>Bạn cần giúp đỡ những gì</Button>
    </Box>
  );
};