export async function POST(req) {
    const { question } = await req.json();
    const backendBaseUrl =
        process.env.RAG_API_URL || "http://127.0.0.1:8000";

    try {
        const res = await fetch(`${backendBaseUrl}/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question }),
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            return Response.json(
                {
                    answer:
                        data?.answer ||
                        data?.detail ||
                        `Backend error: ${res.status}`,
                },
                { status: res.status }
            );
        }

        return Response.json(data);
    } catch (error) {
        return Response.json(
            {
                answer:
                    "Unable to reach the Madhav backend right now. Please try again shortly.",
            },
            { status: 502 }
        );
    }
}