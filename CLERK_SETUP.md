# Clerk Authentication Setup Guide

This guide will help you set up Clerk authentication with Google sign-in for your BioSphere application.

## 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com) and sign up for a free account
2. Create a new application in your Clerk dashboard
3. Choose "Next.js" as your framework

## 2. Configure Google OAuth

1. In your Clerk dashboard, go to "User & Authentication" → "Social Connections"
2. Enable Google OAuth provider
3. You'll need to set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs (Clerk will provide these in the dashboard)
   - Copy the Client ID and Client Secret to your Clerk dashboard

## 3. Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your Clerk keys from the dashboard:

```bash
# Get these from your Clerk dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# These should remain as-is for basic setup
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## 4. Features Included

✅ Google OAuth sign-in/sign-up
✅ Custom sign-in and sign-up pages with your app's styling
✅ User authentication state management
✅ Protected routes (RAG management page)
✅ Authentication header with user menu
✅ Automatic redirect after authentication

## 5. Usage

- Users can sign in with Google or email/password
- The main app functionality is available to all users
- The RAG management page is protected and requires authentication
- Users will see their profile picture and can sign out from the header

## 6. Customization

The authentication components are styled to match your app's theme:
- Custom styling for sign-in/sign-up forms
- Branded header with authentication buttons
- Responsive design that works on all devices

## 7. Testing

1. Start your development server: `npm run dev`
2. Visit the app and try signing up with Google
3. Test the sign-in/sign-out flow
4. Verify protected routes work correctly
