import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';



export async function GET(req:any) {
  try {
    

    // Fetch products from Sanity
    const products = await client.fetch(
      `*[_type == "product"]{
        _id,
        name,
        price,
        "category": category->name,
        stock,
        description,
        featured,
        orignalPrice,
        "imageUrl": image.asset->url
      }`
    );

    // Return the response
    return NextResponse.json(
      { success: true, data: products },
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
