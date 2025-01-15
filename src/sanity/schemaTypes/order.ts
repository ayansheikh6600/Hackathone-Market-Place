export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'product',
                title: 'Product',
                type: 'reference', // Reference to the 'product' document
                to: [{ type: 'product' }],
              },
              {
                name: 'size',
                title: 'Size',
                type: 'string',
                options: {
                  list: ['small', 'medium', 'large', 'xl'], // Match sizes from product schema
                  layout: 'dropdown',
                },
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
                validation: (Rule:any) => Rule.min(1).integer(), // Ensure positive integers
              },
              {
                name: 'price',
                title: 'Price',
                type: 'number', // Record price at the time of order
              },
              {
                name: 'totalPrice',
                title: 'Total Price',
                type: 'number', // Auto-calculated as quantity * price
              },
            ],
          },
        ],
      },
      {
        name: 'customer',
        title: 'Customer Details',
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'phone', title: 'Phone', type: 'string' },
          {
            name: 'address',
            title: 'Address',
            type: 'object',
            fields: [
              { name: 'line1', title: 'Address Line 1', type: 'string' },
              { name: 'line2', title: 'Address Line 2', type: 'string' },
              { name: 'city', title: 'City', type: 'string' },
              { name: 'state', title: 'State', type: 'string' },
              { name: 'postalCode', title: 'Postal Code', type: 'string' },
              { name: 'country', title: 'Country', type: 'string' },
            ],
          },
        ],
      },
      {
        name: 'orderDate',
        title: 'Order Date',
        type: 'datetime',
        initialValue: () => new Date().toISOString(), // Automatically set the order date
      },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: {
          list: ['pending', 'shipped', 'delivered', 'cancelled'], // Status options
          layout: 'dropdown',
        },
        initialValue: 'pending', // Default status
      },
      {
        name: 'totalAmount',
        title: 'Total Amount',
        type: 'number', // Auto-calculated as the sum of all products' totalPrice
      },
    ],
  };
  