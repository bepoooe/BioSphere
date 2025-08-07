# BioSphere   
An AI-powered multi-platform bio generator built with Next.js and Groq's Llama 3 models. This project features intelligent bio generation for Twitter/X, Instagram, and LinkedIn with platform-specific optimization, customizable settings, and real-time AI processing. Enhanced with RAG (Retrieval-Augmented Generation) for superior bio quality using curated knowledge base of bio writing best practices.

## Key Features

**AI-Powered Generation** - Leverages Groq's Llama 3 models (8B & 70B) for intelligent bio creation  
**Platform-Specific Optimization** - Tailored content for Twitter/X, Instagram, and LinkedIn  
**RAG-Enhanced AI** - Uses curated knowledge base for superior bio quality (always enabled)  
**Customizable Tone & Style** - Professional, casual, funny, passionate, and more  
**Responsive Design** - Beautiful, modern interface that works on all devices  
**Real-Time Generation** - Fast bio creation with instant results  
**One-Click Copy** - Easy clipboard integration for immediate use  
**Multiple Variations** - Generate 4+ unique bio options per request

## Tech Stack

### Core
- **Next.js 14** - React framework with App Router for server-side rendering and API routes
- **React 18** - Component-based UI library with hooks and context
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vercel AI SDK** - AI integration toolkit for LLM interactions
- **Groq API** - High-performance AI inference platform

### AI & RAG Enhancement
- **Llama 3 8B** - Fast, efficient model for quick bio generation
- **Llama 3 70B** - Advanced model for sophisticated content creation
- **RAG System** - Enhanced generation using curated bio writing knowledge base
- **OpenAI Embeddings** - Advanced semantic search for knowledge retrieval
- **Automatic Enhancement** - RAG is always enabled for superior bio quality
- **Zod** - Schema validation for type-safe AI responses
- **Endent** - Template literal formatting for AI prompts

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn/ui** - High-quality React component library
- **Radix UI** - Low-level UI primitives for accessibility
- **Tailwind Animate** - Animation utilities for Tailwind CSS
- **Class Variance Authority** - Component variant management

### Form & State Management
- **React Hook Form** - Performant forms with easy validation
- **React Context API** - State management for bio generation
- **Hookform Resolvers** - Zod integration for form validation

### Icons & Fonts
- **Lucide React** - Modern icon library
- **Geist Font** - Vercel's design system font family
- **Custom SVG Icons** - Platform-specific social media icons

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Clsx & Tailwind Merge** - Conditional class name utilities

## Features

### AI-Powered Generation
- **Multi-Model Support** - Choose between Llama 3 8B (fast) and 70B (sophisticated) models
- **Platform Optimization** - Tailored content for Twitter/X, Instagram, and LinkedIn
- **Intelligent Prompting** - Context-aware AI prompts for better results
- **Schema Validation** - Type-safe AI responses with structured output
- **RAG Enhancement** - Retrieval-Augmented Generation with curated knowledge base
- **Fallback System** - Graceful fallback to standard generation if RAG fails

### Enhanced RAG (Retrieval-Augmented Generation)
- **Always Active** - RAG enhancement is automatically enabled for all bio generation
- **Curated Knowledge Base** - Pre-loaded with 17+ expert bio writing guidelines
- **Platform-Specific Guidelines** - Specialized knowledge for Twitter, Instagram, and LinkedIn
- **Semantic Search** - Intelligent retrieval of relevant context using OpenAI embeddings
- **Text Fallback** - Graceful fallback to text-based similarity when embeddings unavailable
- **Best Practices Integration** - Automatically incorporates proven bio writing techniques
- **Tone-Specific Guidance** - Contextual advice for professional, casual, funny, and other tones

### Customization Options
- **Tone Control** - Professional, casual, humorous, passionate, thoughtful, and sarcastic
- **Bio Types** - Personal or brand/business focused content
- **Creativity Levels** - Adjustable creativity scale (0-2) for AI generation
- **Emoji Integration** - Optional emoji inclusion for enhanced engagement
- **Platform Optimization** - Automatic character limit and style optimization
- **Flexible Input** - No minimum word requirements for user input

### User Experience
- **Streamlined Interface** - Clean, intuitive design with simplified controls
- **Real-Time Generation** - Fast bio creation with instant results
- **Multiple Variations** - Generate 4+ unique bio options per request
- **One-Click Copy** - Easy clipboard integration for immediate use
- **Responsive Design** - Seamless experience across all devices
- **Interactive UI** - Modern interface with hover effects and animations
- **Smart Validation** - Real-time validation with helpful error messages
- **Auto-Enhanced Quality** - RAG system automatically improves all generated bios

### Platform-Specific Features
- **Twitter/X** - 120-160 character limit, concise and punchy language
- **Instagram** - 100-150 character limit, visual and lifestyle-focused content
- **LinkedIn** - 160-220 character limit, professional tone with industry keywords

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required - Groq API key for AI model access
GROQ_API_KEY=your_groq_api_key_here

# Optional - OpenAI API key for RAG embeddings (improves RAG performance)
OPENAI_API_KEY=your_openai_api_key_here
```

### Getting API Keys:

1. **Groq API Key** (Required):
   - Visit [Groq Cloud](https://console.groq.com/)
   - Create an account and generate an API key
   - Used for Llama 3 model access

2. **OpenAI API Key** (Optional):
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account and generate an API key
   - Used for vector embeddings in RAG system
   - If not provided, RAG will use text-based similarity matching

## RAG Knowledge System

The application includes a comprehensive RAG (Retrieval-Augmented Generation) system that automatically enhances all bio generation:

### Automatic Enhancement:
- **Always Active**: RAG enhancement is automatically enabled for all bio generation
- **Curated Knowledge Base**: Pre-loaded with 17+ expert bio writing guidelines
- **Platform-Specific Guidelines**: Specialized knowledge for Twitter, Instagram, and LinkedIn
- **Semantic Search**: Intelligent retrieval of relevant context using OpenAI embeddings
- **Text Fallback**: Works without embeddings using text-based similarity matching
- **Best Practices Integration**: Automatically incorporates proven bio writing techniques

### Knowledge Base Content:
- Social media bio best practices
- Platform-specific optimization guidelines
- Tone and voice style guides
- High-converting bio templates
- Character limit optimization strategies
- Engagement psychology principles

## Project Structure

```
BioSphere/
├── public/                     # Static assets
│   ├── next.svg               # Next.js logo
│   └── vercel.svg             # Vercel logo
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── actions.ts         # Server actions for AI integration
│   │   ├── layout.tsx         # Root layout with metadata and fonts
│   │   ├── page.tsx           # Main application page
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── favicon.ico        # Website favicon
│   │   ├── icon.png          # App icon
│   │   ├── apple-icon.png    # Apple touch icon
│   │   ├── api/              # API routes
│   │   │   ├── generate-bio-rag/  # RAG-enhanced bio generation
│   │   │   ├── rag-knowledge/     # RAG knowledge management
│   │   │   ├── seed-knowledge/    # Knowledge base seeding
│   │   │   └── test-rag/         # RAG testing endpoint
│   ├── components/            # React components
│   │   ├── home/             # Home page components
│   │   │   ├── CopyLabel.tsx      # Copy to clipboard functionality
│   │   │   ├── Output.tsx         # Bio generation results display
│   │   │   └── UserInput.tsx      # Input form with all controls
│   │   ├── rag/              # RAG-specific components
│   │   │   └── RAGKnowledgeManager.tsx  # RAG management interface (internal)
│   │   ├── icons/            # Custom SVG icon components
│   │   │   ├── Instagram.tsx      # Instagram brand icon
│   │   │   ├── LinkedIn.tsx       # LinkedIn brand icon
│   │   │   ├── Meta.tsx          # Meta/Facebook brand icon
│   │   │   ├── Mistral.tsx       # Mistral AI icon
│   │   │   └── Twitter.tsx       # Twitter/X brand icon
│   │   ├── magicui/          # Enhanced UI components
│   │   │   ├── animated-gradient-text.tsx  # Gradient text animation
│   │   │   ├── border-beam.tsx            # Animated border effects
│   │   │   └── grid-pattern.tsx           # Background grid pattern
│   │   └── ui/               # Shadcn/ui base components
│   │       ├── alert-dialog.tsx   # Modal dialogs
│   │       ├── badge.tsx         # Status badges
│   │       ├── button.tsx        # Button component with variants
│   │       ├── form.tsx          # Form components and context
│   │       ├── hover-card.tsx    # Hover card tooltips
│   │       ├── input.tsx         # Text input fields
│   │       ├── label.tsx         # Form labels
│   │       ├── select.tsx        # Dropdown selections
│   │       ├── skeleton.tsx      # Loading skeletons
│   │       ├── slider.tsx        # Range sliders
│   │       ├── switch.tsx        # Toggle switches
│   │       ├── textarea.tsx      # Multi-line text input
│   │       └── tooltip.tsx       # Tooltips and help text
│   ├── context/              # React Context providers
│   │   └── BioContext.tsx    # Bio generation state management
│   └── lib/                  # Utility functions
│       ├── utils.ts          # Tailwind class merging utilities
│       └── rag/              # RAG system components
│           ├── SimpleRAGStore.ts     # Vector store implementation
│           ├── RAGEnhancedAI.ts      # RAG-enhanced AI generation
│           └── seedKnowledgeBase.ts  # Initial knowledge base data
├── data/                     # Data storage
│   └── chunks.json          # RAG knowledge chunks (auto-generated)
├── components.json           # Shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Development

### Prerequisites
- Node.js (v18 or later)
- npm or yarn or pnpm
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/bepooee/BioSphere.git

# Navigate to the project directory
cd BioSphere

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Setup

1. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your Groq API key to `.env.local`:**
   ```env
   GROQ_API_KEY="your_groq_api_key_here"
   ```

3. **Get your free Groq API key:**
   - Visit [console.groq.com](https://console.groq.com)
   - Sign up for a free account
   - Generate an API key
   - Copy the key to your environment file

### Running the Development Server

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see BioSphere in action.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build
# or
pnpm build

# Start the production server
npm run start
# or
yarn start
# or
pnpm start
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## API Integration

### Groq AI Integration

BioSphere uses Groq's API with Llama 3 models for bio generation. The AI system features:

**Model Selection:**
- **Llama 3 8B** - Optimized for speed and efficiency
- **Llama 3 70B** - Enhanced capability for complex bio generation

**Intelligent Prompting:**
- Platform-specific prompt engineering
- Context-aware content generation
- Tone and style adaptation
- Character limit optimization

**Response Processing:**
- Structured JSON output using Zod schemas
- Error handling and fallback responses
- Rate limiting and request optimization

### Server Actions

The `actions.ts` file implements Next.js Server Actions for:
- Secure API key handling
- AI model communication
- Response validation and formatting
- Error management

```typescript
// Example AI generation flow
const result = await generateObject({
  model: groq(selectedModel),
  schema: bioSchema,
  prompt: constructedPrompt,
  system: systemPrompt
});
```

## Platform Specifications

### Twitter/X Optimization
- **Character Limit:** 120-160 characters
- **Style:** Concise, punchy, engagement-focused
- **Format:** Single line, no hashtags
- **Best Practices:** Action-oriented language, clear value proposition

### Instagram Optimization
- **Character Limit:** 100-150 characters
- **Style:** Visual, lifestyle-focused, creative
- **Format:** Multi-line friendly, emoji-enhanced
- **Best Practices:** Personality-driven, authentic voice

### LinkedIn Optimization
- **Character Limit:** 160-220 characters
- **Style:** Professional, achievement-focused
- **Format:** Industry keywords, value-oriented
- **Best Practices:** Expertise highlighting, network-building focus

## Build Optimizations

The project uses several optimizations for optimal performance:

**Next.js Optimizations:**
- App Router for improved performance
- Server-side rendering for faster initial loads
- Automatic code splitting
- Image optimization

**Bundle Optimizations:**
- Tree shaking for smaller bundle sizes
- Dynamic imports for code splitting
- Optimized dependency bundling

**Runtime Optimizations:**
- React 18 concurrent features
- Efficient re-rendering with proper memoization
- Optimized form handling with React Hook Form

## Latest Version

**Current Version:** 2.0.0 (July 2025)

### Recent Updates (v2.0.0)
- **Simplified User Experience**: Removed RAG management UI for streamlined interface
- **Automatic RAG Enhancement**: RAG is now always enabled for superior bio quality
- **Flexible Input Requirements**: Removed minimum word count requirement for user input
- **Enhanced Knowledge Base**: Pre-loaded with 17+ expert bio writing guidelines
- **Improved Performance**: Optimized RAG system for faster generation
- **Better Error Handling**: Enhanced fallback systems for reliable operation

### Previous Updates (v1.0.0)
- Implemented Groq AI integration with Llama 3 models
- Added platform-specific bio optimization
- Enhanced UI with Shadcn/ui components
- Optimized form handling with React Hook Form
- Added responsive design for all screen sizes
- Implemented one-click copy functionality
- Added emoji integration toggle
- Enhanced error handling and validation

## Resources & Credits

### Development Resources
- **AI Models:** [Groq](https://groq.com/) - Llama 3 8B & 70B models
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/)
- **Icons:** [Lucide React](https://lucide.dev/) and [Iconify Design](https://icon-sets.iconify.design/)
- **Fonts:** [Vercel Fonts](https://vercel.com/font/) - Geist font family

### Documentation & Learning
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contributing Guidelines

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Setup for Contributors

1. Follow the installation steps above
2. Create a new branch for your feature
3. Make your changes with proper TypeScript types
4. Test your changes thoroughly
5. Ensure ESLint passes: `npm run lint`
6. Submit a pull request with a clear description

## Deployment

### Vercel (Recommended)

The easiest way to deploy BioSphere is using [Vercel](https://vercel.com/):

1. **Connect your GitHub repository to Vercel**
2. **Add environment variables in Vercel dashboard:**
   - `GROQ_API_KEY` - Your Groq API key
3. **Deploy automatically on git push**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bepooee/BioSphere)

### Other Platforms

BioSphere can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Platform
- Heroku

Make sure to set the `GROQ_API_KEY` environment variable on your chosen platform.

## License

This project is created by [bepooee](https://github.com/bepooee) and is available for educational and personal use.

## Contact & Support

**Creator:** bepoooe  
**Email:** [adrishbasak003@gmail.com](mailto:adrishbasak003@gmail.com)  
**GitHub:** [https://github.com/bepoooe](https://github.com/bepoooe)  
**Project Repository:** [https://github.com/bepoooe/BioSphere](https://github.com/bepoooe/BioSphere)

---

**If you found BioSphere helpful, please consider giving it a star on GitHub!**

**BioSphere v2.0** - AI-Powered Bio Generation with RAG Enhancement  
Made with love by [bepoooe](https://github.com/bepoooe)
