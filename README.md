
# 🚀 LinkLoot Deployment Guide

## Step 1: GitHub
1. Create a repository named `link-loot` on GitHub.
2. Commit all the project files from this studio to your repo.

## Step 2: Firebase App Hosting
1. Go to [console.firebase.google.com](https://console.firebase.google.com).
2. Create or select a project.
3. In the sidebar, click **Build > App Hosting**.
4. Connect your GitHub account and select the `link-loot` repository.

## Step 3: Secret Keys (Mandatory)
For the AI search and user login to work, you MUST add these variables in your **App Hosting Settings**:

1. `GOOGLE_GENAI_API_KEY`: Get one at [aistudio.google.com](https://aistudio.google.com/app/apikey).
2. `NEXT_PUBLIC_FIREBASE_API_KEY`: From your Project Settings.
3. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: From your Project Settings.
4. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: From your Project Settings.
5. `NEXT_PUBLIC_FIREBASE_APP_ID`: From your Project Settings.
