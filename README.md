# Equipe Healthcare Platform

A modern, responsive, animated web application for Equipe's healthcare operations platform, built with Next.js and connected to Firebase Realtime Database.

## 🚀 Features

- **Dynamic Content**: All sections pull data from Firebase Realtime Database
- **Responsive Design**: Fully responsive layouts for desktop, tablet, and mobile
- **Animation**: Smooth animations with Framer Motion
- **SEO Optimized**: Dynamic metadata and optimized performance
- **TypeScript**: Type-safe codebase
- **Modern Stack**: Next.js 15, React 19, and Tailwind CSS 4

## 📋 Requirements

- Node.js 18.17+ or 20.3+
- npm or yarn
- Firebase project with Realtime Database

## 🛠️ Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/equipe-healthcare.git
cd equipe-healthcare
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Setup**

Copy the `.env.local.example` file to `.env.local` and fill in your Firebase project details:

```bash
cp .env.local.example .env.local
```

4. **Start development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Home page (with data fetching)
│   ├── layout.tsx        # Root layout
│   ├── error.tsx         # Error handling
│   └── not-found.tsx     # 404 page
├── components/           # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   └── db.ts             # Database functions
└── types/                # TypeScript types
    └── database.ts       # Database types
```

## 🔥 Firebase Schema

The application follows the schema outlined in the backend specification:

```
equipe_website/
├── header_slider/
│   ├── slides/
│   └── settings/
├── offerings/
│   ├── categories/
│   └── items/
├── reasons_to_choose/
├── interoperability_solutions/
│   ├── center/
│   ├── connections/
│   └── settings/
├── tech_stack/
│   ├── categories/
│   └── technologies/
├── efficiency_section/
│   ├── heading/
│   └── blocks/
├── navigation/
│   ├── main_menu/
│   └── sub_menu/
├── contact_info/
└── site_settings/
```

## 🏗️ Building and Deployment

### Production Build

```bash
npm run build
# or
yarn build
```

### Firebase Deployment

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase (if you haven't already):

```bash
firebase init
```

4. Deploy to Firebase:

```bash
# Use the deploy script
chmod +x deploy.sh
./deploy.sh

# Or manually
npm run build
npx next export
firebase deploy
```

## 🧰 Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the theme in:

- `tailwind.config.js` - For theme customization
- `src/app/globals.css` - For global styles

### Content

All content is pulled from Firebase Realtime Database. Update the content in your Firebase console or through the admin panel.

## 📱 Responsive Design

The application is designed to work on various screen sizes:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Credits

- **Design**: Equipe Healthcare
- **Development**: Your Name/Company