export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      { name: 'firstName', title: 'First Name', type: 'string' },
      { name: 'lastName', title: 'Last Name', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' , validation: (Rule:any) => Rule.required().email() },
      { name: 'password', title: 'Password', type: 'string' },
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
  };