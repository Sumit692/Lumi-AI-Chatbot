# 🤖 LUMI – AI Multi-Subject Teacher Chatbot

An intelligent AI-powered educational chatbot designed to help students learn Computer Science subjects through natural conversations. LUMI provides interactive explanations, examples, and practice questions across multiple technical domains.

## 🌐 Live Demo

🚀 **Try LUMI Here:** https://lumi-ai-chatbot.onrender.com/

---

## 📌 Features

* 🎓 AI-powered learning assistant
* 📚 Supports multiple Computer Science subjects
* 💬 Natural conversational interface
* 📝 Detailed explanations with examples
* ❓ Practice questions for self-assessment
* ⚡ Real-time response generation using Google Gemini API
* 🛡️ Automatic Mock Mode when no API key is configured
* 📱 Responsive and clean user interface

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* CORS
* Dotenv

### AI Integration

* Google Gemini API

### Deployment

* Render

---

## 📂 Project Structure

```
LUMI-AI-Chatbot/
│
├── public/             # Frontend files
├── server.js           # Express server
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sumit692/Lumi-AI-Chatbot.git
```

### 2. Navigate into the Project

```bash
cd Lumi-AI-Chatbot
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a `.env` File (Optional)

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.1-flash-lite
PORT=3000
```

> If no `GEMINI_API_KEY` is provided, LUMI automatically runs in **Mock Mode**, allowing the chatbot to function with predefined educational responses.

### 5. Start the Application

```bash
npm start
```

or during development

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📚 Supported Topics

* Database Management Systems (DBMS)
* Data Structures & Algorithms (DSA)
* Design and Analysis of Algorithms (DAA)
* Operating Systems
* Computer Networks
* Theory of Computation
* Object-Oriented Programming
* Software Engineering
* SQL
* And many more...

---

## 🤖 How It Works

1. The user submits a question through the chat interface.
2. The Express backend receives the request.
3. If a valid Gemini API key is configured:

   * The request is forwarded to the Google Gemini API.
   * AI-generated responses are returned to the user.
4. If no API key is available:

   * LUMI switches to Mock Mode.
   * Educational sample responses are generated locally.

---

## ✨ Future Enhancements

* Voice-based interaction
* User authentication
* Chat history
* PDF notes generation
* Quiz mode
* Dark/Light theme toggle
* Progress tracking dashboard
* Multi-language support

---

## 📸 Screenshots

> <img width="1366" height="680" alt="Screenshot (4)" src="https://github.com/user-attachments/assets/a8676dad-e4ac-49c7-9752-a624e706c30d" />

<img width="1366" height="686" alt="Screenshot (5)" src="https://github.com/user-attachments/assets/070d1fbc-4c68-4481-b9ac-814cff4141eb" />



---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sumit Kumar Singh**

* GitHub: https://github.com/Sumit692
* LinkedIn: [www.linkedin.com/in/sumit-kumar-singh-3693352ab](http://www.linkedin.com/in/sumit-kumar-singh-3693352ab)

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!
