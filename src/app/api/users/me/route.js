import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse} from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request){
    try {
     const userId = await  getDataFromToken(request);
    const user= await User.findOne({_id:userId}).select("-password");
    return NextResponse.json({
        message:"User found",
        data: user,
        success:true
    })
    } catch (error) {
        return NextRequest.json({error:error.message} , {status:500})
    }
}