import { NextResponse } from "next/server";
import { getActiveSessionForUser } from "@/lib/chat";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const session = await getActiveSessionForUser(userId);

    if (session) {
      return NextResponse.json({
        matched: true,
        sessionId: session.id,
        partnerId:
          session.user1Id === userId ? session.user2Id : session.user1Id,
      });
    }

    return NextResponse.json({ matched: false });
  } catch (error) {
    console.error("Error in matching/status:", error);
    return NextResponse.json(
      { error: "Failed to check match status" },
      { status: 500 }
    );
  }
}
