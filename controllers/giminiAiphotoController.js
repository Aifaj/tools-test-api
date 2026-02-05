const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ---------------------------
   1️⃣ IMAGE ANALYZER (JSON)
---------------------------- */
exports.analyzeImageWithGemini = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const base64Image = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
      Describe this image in STRICT JSON only:
      {
        "title": "",
        "description": "",
        "tags": []
      }
    `;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64Image }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    const jsonMatch = output.match(/\{[\s\S]*\}/);
    const json = JSON.parse(jsonMatch[0]);

    return res.json({ success: true, ai: json });

  } catch (err) {
    console.error("Analyze Error:", err);
    return res.status(500).json({ error: "Analysis failed", details: err.message });
  }
};


/* -------------------------------
   2️⃣ FACE ATTRIBUTE DETECTOR
-------------------------------- */
exports.analyzeFaceAttributes = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const base64Image = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
      Analyze the face and output STRICT JSON:
      {
        "age_range": "",
        "gender_guess": "",
        "emotion": "",
        "attributes": []
      }
      Only return valid JSON.
    `;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64Image }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    const jsonMatch = output.match(/\{[\s\S]*\}/);
    const json = JSON.parse(jsonMatch[0]);

    return res.json({ success: true, ai: json });

  } catch (err) {
    console.error("Face Error:", err);
    return res.status(500).json({ error: "Face detection failed", details: err.message });
  }
};

exports.verifyFaceLock = async (req, res) => {
  try {
    const lockImage = req.body.lockImage;
    const unlockImage = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
      Compare these two faces and return STRICT JSON:
      {
        "match": true/false,
        "score": "",
        "message": ""
      }
      score = 0–100 similarity confidence
      message = human friendly result
      Only return JSON.
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: lockImage }},
            { inlineData: { mimeType: req.file.mimetype, data: unlockImage }},
            { text: prompt }
          ]
        }
      ]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "");
    const jsonMatch = output.match(/\{[\s\S]*\}/);

    res.json(JSON.parse(jsonMatch[0]));

  } catch (err) {
    res.status(500).json({ error: "Face Lock failed", details: err.message });
  }
};


exports.readDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Document is required" });

    const base64 = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
      Read this document and return STRICT JSON:
      {
        "summary": "",
        "text": "",
        "word_count": "",
        "language": "",
        "type": ""
      }
      Only return valid JSON.
    `;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64 }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    const json = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);

    res.json({ success: true, ai: json });

  } catch (err) {
    res.status(500).json({ error: "Document reading failed", details: err.message });
  }
};


exports.generateCaption = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const base64 = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
      Create an engaging social media caption and 8–12 hashtags for this image.
      Return STRICT JSON ONLY:

      {
        "caption": "",
        "hashtags": []
      }
    `;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64 }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "");

    const json = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);

    res.json({ success: true, ai: json });

  } catch (err) {
    res.status(500).json({ error: "Caption generation failed", details: err.message });
  }
};


exports.analyzeThumbnail = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const base64 = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
      You are a YouTube thumbnail expert.
      Analyze the thumbnail and return STRICT JSON ONLY:

      {
        "overall_score": "",
        "face_clarity": "",
        "text_readability": "",
        "color_pop": "",
        "clickability": "",
        "suggestions": []
      }
    `;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64 }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "");

    const json = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);

    res.json({ success: true, ai: json });

  } catch (err) {
    res.status(500).json({ error: "Thumbnail analysis failed", details: err.message });
  }
};


exports.cropSuggestion = async (req, res) => {
  try {
    if (!req.file) 
      return res.status(400).json({ error: "Image is required" });

    const base64 = req.file.buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
      Analyze the image and return STRICT JSON with crop suggestions.
      Example:

      {
        "suggestions": [
          { "type": "Square Crop", "area": "centered around main subject" },
          { "type": "Portrait Crop", "area": "upper body close-up" },
          { "type": "Rule of Thirds", "area": "subject on right third" }
        ],
        "advice": "Use a tighter crop around the face for better focus."
      }

      Return only JSON.
    `;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64 }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().trim();
    output = output.replace(/```json/g, "").replace(/```/g, "");

    const json = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);

    res.json({ success: true, ai: json });

  } catch (err) {
    res.status(500).json({ error: "Crop suggestion failed", details: err.message });
  }
};


exports.renameFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "File required" });

    const base64 = req.file.buffer.toString("base64");

    const prompt = `
      Suggest a smart, SEO-friendly filename for this file.
      Return STRICT JSON ONLY:
      {
        "recommended": "",
        "suggestions": []
      }
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64 }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().replace(/```json|```/g, "").trim();
    const json = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);

    res.json({ success: true, ai: json });

  } catch (err) {
    res.status(500).json({ error: "Rename failed", details: err.message });
  }
};


exports.generateProductListing = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image required" });

    const base64 = req.file.buffer.toString("base64");

    const prompt = `
      Analyze this product image and return STRICT JSON:
      {
        "title": "",
        "short_description": "",
        "full_description": "",
        "tags": [],
        "category": "",
        "price": ""
      }
      Only return JSON.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { inlineData: { mimeType: req.file.mimetype, data: base64 }},
          { text: prompt }
        ]
      }]
    });

    let output = result.response.text().replace(/```json|```/g, "").trim();
    const json = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);

    res.json({ success: true, ai: json });

  } catch (err) {
    res.status(500).json({ error: "Product listing failed", details: err.message });
  }
};
