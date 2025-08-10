import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req, { params }) {
  try {
    await connect();

    const { id } = params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/users/[id]:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
