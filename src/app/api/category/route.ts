import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';



export async function GET(req:any) {
  try {
    

    // Fetch categories from Sanity
    const categories = await client.fetch(
      `*[_type == "category"]{
        _id,
        name,
        "imageUrl": image.asset->url
      }`
    );

    // console.log(products)

    // Return the response
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error:any) {
    // Handle errors
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}