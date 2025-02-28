# Setting Up GitHub Integration for Bentwood Creek HOA Website

This guide will walk you through the process of mirroring your Astro project to GitHub and managing your images through the repository.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "bentwood-creek-hoa")
4. Choose whether to make it public or private
5. Click "Create repository"

## Step 2: Initialize Git in Your Project

Run these commands in your project's terminal:

```bash
# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit"
```

## Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPO` with your repository name:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push your code to GitHub
git push -u origin main
```

Note: If your default branch is named "master" instead of "main", use that instead.

## Step 4: Managing Images Through GitHub

### Adding Images via GitHub Web Interface

1. Navigate to your repository on GitHub
2. Go to the `public/images` directory
3. Click "Add file" > "Upload files"
4. Drag and drop your images or click to select files
5. Add a commit message (e.g., "Add new background images")
6. Click "Commit changes"

### Pulling Images to Your Development Environment

After adding images to GitHub, pull them to your local environment:

```bash
git pull origin main
```

### Using Images in Your Website

Once pulled, you can use the images in your components:

```astro
<Hero 
  title="Welcome" 
  imageUrl="/images/your-new-image.jpg" 
  overlayOpacity={0.7}
/>
```

Or as page backgrounds:

```astro
<Layout 
  title="Home"
  backgroundImage="/images/your-new-image.jpg"
>
  ...
</Layout>
```

## Step 5: Regular Workflow

1. Make changes to your project
2. Add and commit changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. Pull any changes others have made:
   ```bash
   git pull origin main
   ```

## Additional Resources

- [GitHub Documentation](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Desktop](https://desktop.github.com/) (GUI alternative)