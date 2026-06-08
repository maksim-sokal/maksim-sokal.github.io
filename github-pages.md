
1. Stage all your changed files:

   git add .

2. Commit your changes with a descriptive message of what you updated:

   git commit -m "Update portfolio projects and resume"


### Step 2: Push your code to GitHub
Send the updates to your repository:

git push origin main


### What happens next?
* **Automated Build**: As soon as the push is completed, GitHub Actions will detect the new commit on your `main` branch.
* **Automatic Deployment**: It will launch a fresh, clean workflow run, install your node dependencies, build the Astro static files, and deploy them.
* **Verification**: You can monitor this in real-time under the **Actions** tab of your repository. Within 1 to 2 minutes, the updates will be visible at your live domain: [https://maksim-sokal.github.io/](https://maksim-sokal.github.io/).