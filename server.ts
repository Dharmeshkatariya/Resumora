import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Helper for calling Gemini
async function runGeminiJSON(prompt: string, schema: any, systemInstruction?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are an elite expert recruiting consultant and ATS optimization engineer.",
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2, // lower temperature for more predictable ATS analysis & critique
      },
    });

    if (!response.text) {
      throw new Error("No response from Gemini API");
    }

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
}

// Ensure API key is configured
app.use("/api/gemini", (req, res, next) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is not configured. Please add it to Settings > Secrets in AI Studio.",
    });
  }
  next();
});

// -------------------------------------------------------------
// 1. AI BULLET POINTS GENERATOR
// -------------------------------------------------------------
app.post("/api/gemini/generateBulletPoints", async (req, res) => {
  const { title, company, skills, bulletType } = req.body;

  const prompt = `Generate 5 high-impact, professional resume bullet points for the role of "${title}" at company "${company}".
  ${skills ? `Incorporate these technologies/skills: ${skills}.` : ""}
  Bullet points style preference: ${bulletType || "STAR (Situation, Task, Action, Result) / Metric-driven"}.
  Focus on accomplishments, business impact, and starts each bullet with a strong action verb. Do not include placeholders like "[Number]%". Generate plausible, realistic industry metrics and figures where appropriate to show how to structure metrics.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      bullets: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 5 premium resume bullets starting with strong action verbs and showcasing achievements.",
      },
    },
    required: ["bullets"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema, "You are a master technical resume bullet generator.");
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 2. AI REWRITE EXPERIENCE SECTION
// -------------------------------------------------------------
app.post("/api/gemini/rewriteExperience", async (req, res) => {
  const { originalText, tone } = req.body;

  const prompt = `Please rewrite the following professional description to make it exceptionally polished and high-end:
  ---
  ${originalText}
  ---
  Desired Tone: ${tone || "Professional & Achievement-Oriented"}.
  Ensure correct grammar, active voice, and maximum impact. Remove filler words, rewrite passive phrases into active verbs, and inject dynamic industry terms. Preserve all original numbers, facts, and technological terms perfectly.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      rewrittenText: {
        type: Type.STRING,
        description: "The beautifully rewritten text, keeping details while magnifying impact.",
      },
    },
    required: ["rewrittenText"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema, "You are a senior executive copywriter specializing in global tech resume reviews.");
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 3. AI JOB DESCRIPTION ANALYZER
// -------------------------------------------------------------
app.post("/api/gemini/analyzeJobDescription", async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const prompt = `Conduct a comprehensive, professional ATS (Applicant Tracking System) gap analysis comparing the Candidate's Resume against the Target Job Description.
  
  CANDIDATE RESUME:
  """
  ${resumeText}
  """

  TARGET JOB DESCRIPTION:
  """
  ${jobDescription}
  """
  
  Analyze carefully and return:
  1. A realistic ATS Match Score (0 to 100 based on keyword, skill, and title alignment).
  2. Missing keywords (crucial words/phrases from the JD missing in the resume).
  3. Categorized missing skills: Technical, Soft, and Tools.
  4. Experience gaps (e.g. comparing years of experience requested vs. years deduced).
  5. Education match evaluation.
  6. Tone match assessment.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      matchScore: { type: Type.INTEGER, description: "ATS Score between 0 and 100." },
      missingKeywords: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "High-value keywords present in the JD but absent/weak in the resume.",
      },
      missingSkills: {
        type: Type.OBJECT,
        properties: {
          technical: { type: Type.ARRAY, items: { type: Type.STRING } },
          soft: { type: Type.ARRAY, items: { type: Type.STRING } },
          tools: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["technical", "soft", "tools"],
      },
      experienceGaps: { type: Type.STRING, description: "Concrete description of experience/seniority gaps, or 'No significant gaps identified'." },
      educationMatch: { type: Type.BOOLEAN, description: "True if candidate meets or closely matches the education milestone." },
      educationDetails: { type: Type.STRING, description: "Details about any education requirements (e.g., 'Requires BS Computer Science, you have BS CS')." },
      toneMatch: { type: Type.STRING, description: "Evaluation of the stylistic compatibility (e.g., 'The job calls for highly executive command, your resume style aligns well but can be bolder')." },
    },
    required: ["matchScore", "missingKeywords", "missingSkills", "experienceGaps", "educationMatch", "educationDetails", "toneMatch"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 4. AI RESUME CRITIC
// -------------------------------------------------------------
app.post("/api/gemini/criticResume", async (req, res) => {
  const { resumeText } = req.body;

  const prompt = `Critique this complete resume text. Find formatting, structure, semantic, language, and metric mistakes. Be highly critical, just like a top-tier Fortune 500 tech recruiter.
  
  RESUME TEXT:
  """
  ${resumeText}
  """

  Construct a list of 4 - 8 actionable, precise issues found. Provide:
  - Category (e.g. "Weak Language", "Passive Voice", "Missing Metrics", "ATS Issues", "Length Issues")
  - Precise description of why it weakens the resume
  - The exact text or phrase offending the rule (if applicable)
  - A suggested active or metric-driven replacement.
  Be fully specific. Propose realistic improvements.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      grade: { type: Type.STRING, description: "Academic grade from A+ to F representing overall quality." },
      score: { type: Type.INTEGER, description: "Calculated numeric quality score from 0 to 100." },
      issues: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            exactText: { type: Type.STRING, description: "Offending text snippet, or blank if global structural issue." },
            suggestion: { type: Type.STRING, description: "Improved version or action steps." },
          },
          required: ["category", "description", "exactText", "suggestion"],
        },
      },
      improvementOverview: { type: Type.STRING, description: "A high-level encouraging summary and plan of action." },
    },
    required: ["grade", "score", "issues", "improvementOverview"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 5. AI RESUME TAILORING (One-click)
// -------------------------------------------------------------
app.post("/api/gemini/tailorResume", async (req, res) => {
  const { resumeData, jobDescription, intensity } = req.body;

  const prompt = `We need to tailor the candidate's resume content to target keywords and objectives in the following Job Description.
  Intensity of tailoring is: ${intensity || "Medium"} (ranging from Light context adjustments to Aggressive rewrites).
  
  Do NOT invent false career histories, fake degrees, or fake companies. Maintain integrity. Keep the structural frames (companies, roles, dates) identical, but modify the summary section and rewrite/tailor the experience bullet points to emphasize relevant skills, methodologies, databases, and metrics matching the job.

  JOB DESCRIPTION:
  """
  ${jobDescription}
  """

  RESUME DATA JSON:
  ${JSON.stringify(resumeData)}

  Please respond with a restructured client representation containing the tailored values. Ensure it perfectly fits the schema provided.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      tailoredSummary: { type: Type.STRING, description: "Tailored professional profile summary incorporating key JD phrases." },
      tailoredExperiences: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING, description: "The original work experience ID." },
            tailoredBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "The updated, tailored bullet points showcasing alignment with the JD.",
            },
          },
          required: ["id", "tailoredBullets"],
        },
      },
    },
    required: ["tailoredSummary", "tailoredExperiences"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 6. AI INTERVIEW PREPARATION GENERATOR
// -------------------------------------------------------------
app.post("/api/gemini/interviewPrep", async (req, res) => {
  const { resumeText } = req.body;

  const prompt = `Analyze this resume and generate a top-tier interview preparation guide with 10 questions. Include both advanced technical questions (covering skills on the resume) and behavioral questions.
  For each question, map out:
  - Why the recruiter is asking it.
  - A stellar, pre-filled STAR template (Situation, Task, Action, Result) drawing directly from their actual experience milestones.
  - A suggested high-impact answer.

  RESUME:
  """
  ${resumeText}
  """`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            category: { type: Type.STRING, description: "'Technical' or 'Behavioral'." },
            suggestedAnswer: { type: Type.STRING },
            starTemplate: {
              type: Type.OBJECT,
              properties: {
                situation: { type: Type.STRING },
                task: { type: Type.STRING },
                action: { type: Type.STRING },
                result: { type: Type.STRING },
              },
              required: ["situation", "task", "action", "result"],
            },
          },
          required: ["id", "question", "category", "suggestedAnswer", "starTemplate"],
        },
      },
      weakAreas: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Hard skill areas or metrics where the candidate's resume appears light, needing additional prep.",
      },
    },
    required: ["questions", "weakAreas"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 7. LINKEDIN HEADLINE & SUMMARY OPTIMIZER
// -------------------------------------------------------------
app.post("/api/gemini/linkedinHeadline", async (req, res) => {
  const { resumeText, currentHeadline } = req.body;

  const prompt = `Using the following resume context, generate 5 premium, eye-catching, high-converting LinkedIn Headlines (under 220 characters each) and one highly compelling, search-optimized 'About' section summary.
   headline styles should vary: e.g., benefit-driven, credentials-driven, minimalistic, and list-oriented.

  RESUME SUMMARY/DETAILS:
  """
  ${resumeText}
  """
  ${currentHeadline ? `CURRENT HEADLINE: "${currentHeadline}"` : ""}
  
  The LinkedIn 'About' section should use standard storytelling hooks, line breaks, bullet points, and a consolidated 'Core Competencies' block.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      headlines: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "5 direct-access headlines styled for maximum recruiter clicks.",
      },
      optimizedAbout: {
        type: Type.STRING,
        description: "A gorgeous, skimmable, search-engine-optimized LinkedIn About summary.",
      },
    },
    required: ["headlines", "optimizedAbout"],
  };

  try {
    const data = await runGeminiJSON(prompt, schema);
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// 8. ONSITE LOG IN SIMULATION (For Premium feel)
// -------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "alive" });
});

// -------------------------------------------------------------
// VITE DEV / PRODUCTION HANDLERS
// -------------------------------------------------------------
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Resume Builder Server booted nicely on http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
