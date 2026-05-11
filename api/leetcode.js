export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const leetcodeResponse = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify(request.body),
    });

    const text = await leetcodeResponse.text();

    response.status(leetcodeResponse.status);
    response.setHeader(
      "Content-Type",
      leetcodeResponse.headers.get("content-type") || "application/json"
    );
    return response.send(text);
  } catch (error) {
    return response.status(500).json({
      error: "Unable to fetch LeetCode stats",
      message: error.message,
    });
  }
}
