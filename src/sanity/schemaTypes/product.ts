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
        type: 'number',
      },
      { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
      { name: 'description', title: 'Description', type: 'text' },
      { name: 'featured', title: 'Feature', type: 'boolean', initialValue: false },
      { name: 'tags', title: 'Tag', type: "array", of:[
        {
          type : "string"
        }
      ]},
      { name: 'badge', title: 'Badge', type: 'string' },
    ],
  };
  