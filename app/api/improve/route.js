// app/api/improve/route.js
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      fullName = "",
      headline = "",
      summary = "",
      skills = "",
      experience = "",
      education = "",
    } = body;

    // Basic validation
    if (
      !fullName.trim() &&
      !headline.trim() &&
      !summary.trim() &&
      !skills.trim() &&
      !experience.trim() &&
      !education.trim()
    ) {
      return new Response(JSON.stringify({ error: "Form submitted empty." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Mock "improved" content for demo mode
    const mockImprovedText = `
✅ TEST MODE — MOCK AI RESPONSE

Full Name: ${fullName || "Full name"}
Headline: ${headline || "Role / Title"}

Summary:
${summary ? `Refined summary: ${summary}` : "A short, powerful, and engaging professional intro."}

Skills:
${skills ? skills.split(",").map(s => s.trim()).filter(Boolean).join(", ") : "React, Next.js, JavaScript"}

Experience:
${experience || "Company X • Role • 2022 - 2024\n- Responsibility 1\n- Achievement 1"}

Education:
${education || "High School / University • Major • Graduation Year"}

---

Note: This response is generated in mock mode. When connected to OpenAI you will receive richer, more natural language.
`;

    // Provide a structured resume payload as an additional example
    const bulletCv = {
      title: `${fullName || "Full name"} — ${headline || "Role"}`,
      summary: (summary && `Refined: ${summary}`) || "Short, outcome-driven overview.",
      skills: (skills && skills.split(",").map(s => s.trim()).filter(Boolean)) || ["React", "Next.js", "Node.js"],
      experience: (experience && experience.split("\n").map(l => l.trim()).filter(Boolean)) || ["Company X — Intern (2022)"],
      education: (education && education.split("\n").map(l => l.trim()).filter(Boolean)) || ["High School — General"],
    };

    return new Response(JSON.stringify({ improved: mockImprovedText, structured: bulletCv }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
