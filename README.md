# Shoply - Modern E-commerce Portal

A complete, production-ready e-commerce web application built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core E-commerce Functionality
- **Product Catalog**: Browse products by category with advanced filtering
- **Product Details**: Comprehensive product pages with image galleries and specifications
- **Shopping Cart**: Full cart management with quantity controls and persistence
- **Search & Filtering**: Advanced search with price, brand, and rating filters
- **Responsive Design**: Mobile-first design that works on all devices

### User Experience Features
- **Hero Carousel**: Dynamic promotional banners with auto-rotation
- **Category Showcase**: Visual category navigation with product counts
- **Featured Products**: Curated product selections on the homepage
- **Wishlist**: Save products for later viewing
- **Quick View**: Preview products without leaving the current page
- **Breadcrumb Navigation**: Easy navigation trail throughout the site

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for efficient state management
- **Routing**: React Router v6 for seamless navigation
- **Performance**: Lazy loading, skeleton loaders, and optimized rendering
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 19+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand with persistence
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Rating, Loading, etc.)
│   ├── product/        # Product-related components
│   ├── cart/          # Shopping cart components
│   └── layout/        # Layout components (Header, Footer)
├── pages/              # Page components
│   ├── Home.tsx       # Homepage with hero and featured products
│   ├── ProductList.tsx # Product listing with filters
│   ├── ProductDetail.tsx # Individual product page
│   └── Cart.tsx       # Shopping cart page
├── store/              # Zustand stores
│   └── useStore.ts    # Cart, filter, and wishlist stores
├── types/              # TypeScript type definitions
│   └── index.ts       # Product, Cart, and other interfaces
├── utils/              # Utility functions
│   └── helpers.ts     # Filtering, formatting, and helper functions
├── data/               # Mock data
│   └── products.json  # Product catalog (20+ products)
└── App.tsx            # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoply
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Accent**: Orange (#F59E0B)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Font weights 600-700
- **Body**: Font weight 400
- **Price**: Bold, prominent styling

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Single column layout with collapsible filters
- **Tablet**: Two-column product grid with sidebar filters
- **Desktop**: Four-column product grid with persistent filter sidebar

## 🔍 Search & Filtering

### Search Features
- Global search across product names, descriptions, and tags
- Real-time search suggestions
- Category-specific search results

### Filtering Options
- **Price Range**: Min/max price with slider control
- **Brand Filter**: Multi-select brand filtering
- **Rating Filter**: Minimum star rating requirements
- **Sort Options**: Price, rating, popularity, newest

## 🛒 Shopping Cart

### Features
- Add/remove products with quantity controls
- Persistent cart state (localStorage)
- Real-time price calculations
- Tax and shipping calculations
- Free shipping threshold indicators

### Cart Management
- Update quantities
- Remove individual items
- Clear entire cart
- Cart badge with item count

## 🎯 Product Management

### Product Structure
Each product includes:
- High-quality images with gallery support
- Detailed descriptions and specifications
- Pricing with discount calculations
- Customer ratings and reviews
- Stock status and availability
- Brand and category information

### Categories
- **Electronics**: Smartphones, Laptops, Headphones, Cameras, TVs
- **Clothing**: Men's, Women's, Kids apparel
- **Home & Garden**: Furniture, Lighting, Kitchen
- **Sports & Outdoors**: Fitness, Camping, Sports Equipment
- **Books & Media**: Fiction, Non-fiction, Educational
- **Beauty & Personal Care**: Makeup, Skincare, Fragrances

## 🔧 Customization

### Adding New Products
1. Add product data to `src/data/products.json`
2. Follow the existing Product interface structure
3. Include high-quality images and detailed descriptions

### Styling Changes
- Modify Tailwind classes in component files
- Update color variables in `tailwind.config.js`
- Customize component variants as needed

### New Features
- Extend the Zustand stores for additional state
- Add new page components following existing patterns
- Implement new utility functions in the helpers file

## 📊 Performance Optimizations

- **Image Optimization**: Responsive images with proper sizing
- **Lazy Loading**: Skeleton loaders and progressive loading
- **Code Splitting**: Route-based code splitting with React Router
- **State Management**: Efficient Zustand stores with selective updates
- **Memoization**: React.memo for expensive components

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support throughout
- **Semantic HTML**: Proper heading structure and landmarks
- **Color Contrast**: WCAG compliant color combinations
- **Focus Management**: Clear focus indicators and logical tab order

## 🧪 Testing Considerations

The application is designed with testing in mind:
- **Unit Tests**: Test utility functions and helper methods
- **Component Tests**: Test component rendering and interactions
- **Integration Tests**: Test cart operations and filtering
- **E2E Tests**: Test complete user workflows

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Zero-config deployment
- **Netlify**: Drag and drop deployment
- **AWS S3**: Static hosting with CloudFront
- **GitHub Pages**: Free hosting for open source projects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Unsplash** for high-quality product images
- **Lucide** for beautiful, consistent icons
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing frontend library

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Shoply** - Your modern e-commerce solution built with cutting-edge web technologies.
