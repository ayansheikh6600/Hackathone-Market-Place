import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(req: Request) {
  try {
    const { products, customer } = await req.json();

    // Array to store validation results for each product
    const validatedProducts = [];

    // Iterate through the products in the order
    for (const product of products) {
      const { product: productId, size, quantity } = product;

      // Fetch the product from Sanity by its ID
      const sanityProduct = await client.fetch(
        `*[_type == "product" && _id == $id][0]{
          name,
          stock[]{
            size,
            quantity
          }
        }`,
        { id: productId }
      );

      if (!sanityProduct) {
        return NextResponse.json(
          { success: false, message: `Product with ID ${productId} not found` },
          { status: 404 }
        );
      }

      // Check if the size exists in the product's stock
      const stockForSize = sanityProduct.stock.find((stock: any) => stock.size === size);

      if (!stockForSize) {
        return NextResponse.json(
          { success: false, message: `Size "${size}" is not available for product "${sanityProduct.name}"` },
          { status: 400 }
        );
      }

      // Check if the requested quantity is available
      if (stockForSize.quantity < quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `Requested quantity (${quantity}) for size "${size}" of product "${sanityProduct.name}" exceeds available stock (${stockForSize.quantity})`,
          },
          { status: 400 }
        );
      }

      // Reduce the stock quantity for validation purposes
      validatedProducts.push({
        ...product,
        name: sanityProduct.name,
        remainingStock: stockForSize.quantity - quantity,
      });
    }

    // If all validations pass, calculate the total amount
    const totalAmount = validatedProducts.reduce(
      (sum: number, product: any) => sum + product.quantity * product.price,
      0
    );

    // Save the order to Sanity
    const orderDoc = {
      _type: 'order',
      products: validatedProducts,
      customer,
      orderDate: new Date().toISOString(),
      status: 'pending',
      totalAmount,
    };

    const createdOrder = await client.create(orderDoc);

    return NextResponse.json({ success: true, order: createdOrder }, { status: 201 });
  } catch (error: any) {
    console.error('Error placing order:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
