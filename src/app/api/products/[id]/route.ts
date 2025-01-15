import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';// Adjust the path to your sanity.js file


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Get the dynamic 'id' from params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }



    // Query Sanity for the product by ID
    const query = `*[_type == "product" && _id == $id][0]{
      name,
      price,
      "category": category->name,
      stock,
      description,
      orignalPrice,
      "imageUrl": image.asset->url
    }`;

    const product = await client.fetch(query, { id });

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Return the product data
    return NextResponse.json(
      { success: true, data: product },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
