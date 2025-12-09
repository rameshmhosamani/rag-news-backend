const axios = require("axios");
const qdrant = require("./vector-db");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  .getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = {
  answer: async (query) => {

    // 1. Embedding  
    const embed = await axios.post(
      "https://api.jina.ai/v2/embeddings",
      { model: "jina-embedding-t-en-v1", texts: [query] }
    );

    const vector = embed.data.embeddings[0];

    // 2. Retrieve  
    const results = await qdrant.search("news", {
      vector,
      limit: 5
    });

    const context = results.map(r => r.payload.text).join("\n\n");

    // 3. LLM generate  
    const response = await model.generateContent(`
      Context:
      ${context}

      User question: ${query}
    `);

    return response.text();
  }
};
