
## Comforty Project

### 👨‍💻 Developed by

**Ayan Sheikh**

- **Email**: [ayansheikh6600@gmail.com](mailto:ayansheikh6600@gmail.com)
- **GitHub**: [ayansheikh6600](https://github.com/ayansheikh6600)
- **LinkedIn**: [Ayan Sheikh on LinkedIn](https://www.linkedin.com/in/ayansheikh6600/)

---

Welcome to the **Comforty** project! 🚀 This is a modern e-commerce web application built with **Next.js 14**, **Redux**, **TypeScript**, and **Tailwind CSS**. The application is fully pixel-perfect, responsive, and optimized for modern web standards.

### 📖 Summary

The Comforty project is a modern e-commerce web application with the following features:

- **Redux for State Management**: Used for add-to-cart functionality.
- **Fully Pixel-Perfect & Responsive Design**: Styled with Tailwind CSS.
- **TypeScript Integration**: Ensuring maintainability and type safety across the app.
- **Modern Architecture with Next.js 14**: Using Next.js's App Router for better scalability and organization.

The architecture is divided into the following:

- **Widgets Folder**: Components/widgets that are reusable across different parts of the application.
- **Shared Folder**: General-purpose shared components like buttons, inputs, icons, etc.
- **Layout Folder**: Components like layout, navbar, and footer.
- **Redux Logic**: Used for features like add-to-cart.

### 📂 Folder Structure

The following is the directory layout for the Comforty project:

```ruby
Comforty/
│
├── public/                # Static assets like images, icons, fonts, etc.
├── src/
│   ├── app/               # Next.js App Router pages and routing logic
│   │   ├── layout.tsx     # Application-level layout (includes header, footer, navbar, etc.)
│   │   └── pages/         # All pages in the application
│   │
│   ├── widgets/           # Widgets for reusable dynamic UI logic across the app
│   │
│   ├── shared/            # Shared UI components like buttons, icons, and form elements
│   │
│   ├── layout/            # Layout components like Header, Footer, Navbar, etc.
│   │
│   ├── lib/               # Redux logic, hooks, utilities, and feature implementations
│   │   ├── features/      # Logic for features (shopping cart, user authentication, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store.ts       # Redux store definition
│   │   └── utils.ts       # Utility/helper functions
│   │
│   ├── styles/            # Tailwind CSS global styles and font utilities
│   ├── types/             # Centralized TypeScript types
│
├── components.json         # Configuration for shared ShadCN UI components
├── next.config.mjs         # Next.js configuration settings
├── package.json            # Node.js dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration for CSS processing
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration


###🛠️ Features
##✅ Key Features
- ****Redux for Add to Cart****: State management with Redux for shopping cart functionality.
- ****Fully Responsive Design****: Achieved with Tailwind CSS for a pixel-perfect, seamless user experience.
- ****TypeScript****: Ensures clean and maintainable code with type checking.
-** **Modular Architecture****: Components organized into widgets, shared, and layout for reusability.
- ****Reusable Components****: Components and widgets are designed to be shared across different parts of the app.
- ****Fast & SEO Friendly****: Built using the latest features from Next.js 14.

