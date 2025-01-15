export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      { name: 'firstName', title: 'First Name', type: 'string' },
      { name: 'lastName', title: 'Last Name', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' , validation: Rule => Rule.required().email() },
      { name: 'password', title: 'Password', type: 'string' },
    ],
  };