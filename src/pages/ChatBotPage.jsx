import ChatBot from "react-simple-chatbot";
import "../styles/chatbot.css";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import checkoutApi from "~/apis/modules/checkout.api";
import { useSelector } from "react-redux";

const OPENAI_API_KEY = "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";


const ChatGPTResponse = (props) => {
  const handleNext = () => {
    props.triggerNextStep();
  };
  const [value, setValue] = useState(null);

  // State to store chat messages

  // Function to handle user messages

  // Function to send the user message to ChatGPT API
  async function processUserMessageToChatGPT() {
    // Prepare the messages in the required format for the API
    //const apiMessage = { role: "assistant", content: props.previousStep.value };
    // System message for ChatGPT

    // const systemMessage = {
    //   role: "system",
    //   content: "Explain all concept like Website selling pets, and pet products"
    // };

    // Prepare the API request body
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "Hello!"
        }
      ]
    };

    // Send the user message to ChatGPT API
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // Update chat messages with ChatGPT's response
        setValue(data.error.message);
      });
  }

  useEffect(() => {
    processUserMessageToChatGPT();
  }, []);

  return (
    <Box>
      <Typography>{value}</Typography>
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
          { value: 1, label: "Các giống chó của cửa hàng?", trigger: "3" },
          { value: 2, label: "Giá giao động của các thú cưng?", trigger: "4" },
          { value: 3, label: "Đồ cho chó như thế nào?", trigger: "5" },
          { value: 4, label: "Phí giao hàng như thế nào?", trigger: "6" },
          { value: 5, label: "Tình trạng đơn hàng của tôi?", trigger: "8" },
          {
            value: 6,
            label: "Tôi muốn hỏi thêm chi tiết",
            trigger: "search"
          }
        ]
      },
      {
        id: "3",
        message: "Bên mình cung cấp các giống như: Corgi, Poodle, Husky, Golden,... và nhiều giống khác bạn có thể xem ở danh mục chó cảnh",
        trigger: "2"
      },
      {
        id: "4",
        message: "Bên mình cung cấp các chó cảnh có mức giá đa dạng từ 10 triệu đồng trở lên",
        trigger: "2"
      },
      {
        id: "5",
        message: "Bên mình chuyên cung cấp đồ dùng, thức ăn cho chó với sản phẩm chất lượng, uy tín, bạn có thể truy cập trang đồ cho chó để xem thêm",
        trigger: "2"
      },
      {
        id: "6",
        message: "Cửa hàng chúng tôi sẽ giao thú cưng cho bạn đến nới an toàn, thời gian từ 3 - 5 ngày và hoàn toàn miễn phí",
        trigger: "2"
      },
      {
        id: "search",
        user: true,
        trigger: "7"
      },
      {
        id: "7",
        component: <ChatGPTResponse />,
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