// POST /test/api/submit-purchase
// Skeleton: receives post-paywall confirmation from client (if we track
// click-through) and forwards to GHL. Actual payment lives on
// app.growtify.app/payment-link/... so this endpoint mainly logs attribution.

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[quiz/submit-purchase] body", body);
    // TODO: forward attribution (email, quiz_score, discount) to GHL pipeline.
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
