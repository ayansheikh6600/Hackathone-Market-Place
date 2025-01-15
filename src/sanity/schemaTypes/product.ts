export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string' },
      { name: 'orignalPrice', title: 'Original Price', type: 'number' },
      { name: 'price', title: 'Price', type: 'number' },
      { name: 'image', title: 'Image', type: 'image' },
      {
        name: 'stock',
        title: 'Stock',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'size',
                title: 'Size',
                type: 'string',
                options: {
                  list: ['small', 'medium', 'large', 'xl'], // Predefined sizes
                  layout: 'dropdown', // Display as a dropdown
                },
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
                validation: (Rule:any) => Rule.min(0).integer(), // Ensure non-negative integers
              },
            ],
          },
        ],
      },
      { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'featured', title: 'Feature', type: 'boolean', initialValue: false },
      { name: 'tag', title: 'Tag', type: 'string' },
    ],
  };
  