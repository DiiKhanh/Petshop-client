import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import Hero from "./Hero";

const mainFeaturedPost = {
  title: "Hãy kết nối với chúng tôi",
  description:
    "Cửa hàng Petshop chúng mình rất vui khi các bạn đã ghé thăm website, nếu có thắc mắc, đừng ngần ngại liên hệ chúng mình nhé",
  image: "https://source.unsplash.com/random?wallpapers",
  imageText: "main image description",
  linkText: "Liên hệ Petshop"
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection:"column"
      }}
    >
      <Hero post={mainFeaturedPost} />
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Liên hệ với chúng tôi
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}