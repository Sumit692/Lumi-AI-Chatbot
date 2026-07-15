import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Helper to determine if the API key is a placeholder or missing
function isApiKeyPlaceholder(key) {
  return !key || key.trim() === "" || key.includes("AQ.Ab8RN6I-aPv1xDdtVgAXW9qoI0JRwCkdXJ5pR8H_mbG_IY4LYg") || key.includes("AQ.Ab8RN6I-aPv1xDdtVgAXW9qoI0JRwCkdXJ5pR8H_mbG_IY4LYg");
}

// Generate mock responses for testing without an API key
function generateMockResponse(contents, systemInstruction) {
  const lastMessage = contents[contents.length - 1]?.parts[0]?.text || "Hello";
  const systemText = systemInstruction?.parts[0]?.text || "";
  
  // Extract subject
  let subject = "Computer Science";
  const subjectMatch = systemText.match(/subject:\s*([^\n\.-]+)/i);
  if (subjectMatch && subjectMatch[1]) {
    subject = subjectMatch[1].trim();
  }

  // Extract user name
  let userName = "Student";
  const nameMatch = systemText.match(/user,\s*([^\n\.,-]+)/i);
  if (nameMatch && nameMatch[1]) {
    userName = nameMatch[1].trim();
  }

  const lower = lastMessage.toLowerCase();
  
  if (lower.includes("hello") || lower.includes("hi ") || lower.trim() === "hi" || lower.includes("hey")) {
    return `Hello ${userName}! 👋<br><br>I am **LUMI**, your friendly teacher AI. Today, we are exploring **${subject}**.<br><br>Ask me any question about ${subject}, and I'll explain it simply with examples and practice problems!`;
  }
  
  if (lower.includes("normalization") || lower.includes("dbms normalization")) {
    return `Excellent topic! Let's discuss **Database Normalization** in **${subject}**.<br><br>Normalization is a database design technique that reduces data redundancy and eliminates undesirable characteristics like Insertion, Update, and Deletion Anomalies.<br><br>Here is a quick summary of the normal forms:<br><br>1. **1NF (First Normal Form)**: Eliminate duplicate columns. Create separate tables for each group of related data and identify each row with a unique column (primary key). Values must be atomic.<br>2. **2NF (Second Normal Form)**: Must be in 1NF. There should be no partial dependency (no non-prime attribute should depend on a proper subset of any candidate key).<br>3. **3NF (Third Normal Form)**: Must be in 2NF. There should be no transitive dependency (non-prime attributes must not depend on other non-prime attributes).<br><br>Let's look at an example of a transitive dependency:<br><code>Student -> Dept_ID -> Dept_Name</code><br>Here, Dept_Name depends on Dept_ID, which depends on Student. To achieve 3NF, we must split this into two tables.<br><br>**Practice Question for you:** Can a table be in 3NF but not in BCNF (Boyce-Codd Normal Form)? Explain why!`;
  }

  if (lower.includes("recursion") || lower.includes("daa") || lower.includes("divide and conquer")) {
    return `Ah, recursion and divide-and-conquer! Classic topics in **${subject}**.<br><br>A **Divide and Conquer** algorithm works by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly. The solutions to the sub-problems are then combined to give a solution to the original problem.<br><br>Here are the 3 main steps:<br>1. **Divide**: Break the problem into sub-problems.<br>2. **Conquer**: Solve the sub-problems recursively.<br>3. **Combine**: Merge the sub-problem solutions.<br><br>Example code for Merge Sort (Divide part):<br><code>void mergeSort(int arr[], int l, int r) {<br>&nbsp;&nbsp;if (l < r) {<br>&nbsp;&nbsp;&nbsp;&nbsp;int m = l + (r - l) / 2;<br>&nbsp;&nbsp;&nbsp;&nbsp;mergeSort(arr, l, m);<br>&nbsp;&nbsp;&nbsp;&nbsp;mergeSort(arr, m + 1, r);<br>&nbsp;&nbsp;&nbsp;&nbsp;merge(arr, l, m, r);<br>&nbsp;&nbsp;}<br>}</code><br><br>**Practice Question:** What is the recurrence relation and time complexity of Merge Sort?`;
  }

  // Default mock response pointing out how to add the real key
  return `LUMI (Mock Mode): That's a great question about **${subject}**!<br><br>Since you haven't configured a real \`GEMINI_API_KEY\` in the \`.env\` file yet, I am running in **Mock Mode**.<br><br>Here is a sample answer regarding: *"${lastMessage}"*<br><br>To get real, intelligent responses directly from the Gemini model:<br>1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).<br>2. Open the \`.env\` file in the root folder of this project (\`c:\\Users\\sam65\\Downloads\\LUMI-CHATBOT-main\\.env\`).<br>3. Replace \`YOUR_GEMINI_API_KEY_HERE\` with your actual API key.<br>4. Restart this server.<br><br>Let me know if you want to discuss database normalization or divide-and-conquer in the meantime!`;
}

// Proxy endpoint for Gemini API
app.post('/api/chat', async (req, res) => {
  const { contents, systemInstruction, generationConfig } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  if (isApiKeyPlaceholder(apiKey)) {
    console.log("Using Mock Response Mode (API Key missing or placeholder).");
    const mockReply = generateMockResponse(contents, systemInstruction);
    return res.json({
      candidates: [
        {
          content: {
            parts: [{ text: mockReply }]
          }
        }
      ]
    });
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents,
    systemInstruction,
    generationConfig
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Gemini API error status:", response.status, data.error);
      return res.status(response.status || 500).json({ error: data.error || { message: "Failed to fetch from Gemini API." } });
    }

    res.json(data);
  } catch (error) {
    console.error("Network or server error while proxying to Gemini API:", error);
    res.status(500).json({ error: { message: "Internal server error connecting to Gemini API." } });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`LUMI Chatbot running locally at http://localhost:${PORT}`);
  console.log(`Mock mode active if GEMINI_API_KEY is not set in .env`);
  console.log(`==================================================`);
});
