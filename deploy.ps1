# Build the project
npm run build

# Navigate to the build output directory
Set-Location -Path "dist"

# Initialize a new git repository
git init
git checkout -b main
git add -A
git commit -m "deploy"

# Push to the gh-pages branch of the remote repository
# Note: Using the HTTPS URL. Ensure you have credentials cached or are logged in.
git push -f https://github.com/Reztorye/nana_.git main:gh-pages

# Return to the project root
Set-Location -Path ".."
