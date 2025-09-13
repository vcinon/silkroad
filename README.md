# ScriptGuardian Admin Panel

This is a Next.js application that serves as an admin panel for managing users. It is integrated with Supabase for the database and sends Telegram notifications when new users are created.

## Getting Started

To run the application locally, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## Publishing to GitHub and Deploying to Vercel

### Step 1: Create a GitHub Repository

First, create a new, empty repository on [GitHub.com](https://github.com).

### Step 2: Push Your Code to GitHub

Open a terminal in your project's root directory and run the following commands. Replace `<YOUR_GITHUB_REPO_URL>` with the URL of the repository you just created.

```bash
# Initialize a new Git repository if you haven't already
git init -b main

# Add all your project files to the staging area
git add .

# Create your first commit
git commit -m "Initial commit: Admin panel with Supabase and Telegram integration"

# Add your new GitHub repository as the remote origin
git remote add origin <YOUR_GITHUB_REPO_URL>

# Push your code to GitHub
git push -u origin main
```

### Step 3: Deploy to Vercel

1.  Sign up or log in to your [Vercel](https://vercel.com/) account.
2.  Click the "Add New... > Project" button.
3.  Import the GitHub repository you just created.
4.  Vercel will automatically detect that this is a Next.js project and configure the build settings for you.

### Step 4: Configure Environment Variables on Vercel

Before deploying, you need to add your environment variables to the Vercel project. In your project's settings on Vercel, navigate to "Environment Variables" and add the following:

-   `ADMIN_PASSWORD`: The password for the admin login page.
-   `ADMIN_TOKEN`: A secret token for authorizing admin API requests (make this a long, random string).
-   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project's public anon key.
-   `TELEGRAM_BOT_TOKEN`: Your Telegram bot token.
-   `TELEGRAM_CHAT_ID`: The chat ID where the bot should send notifications.

After adding the environment variables, re-deploy your project from the Vercel dashboard for the changes to take effect. Your application will then be live on your Vercel domain.
