Git commmands 

1. Setup & Config
bash
Copy
Edit
git init                     # Start a new Git repo
git clone <url>              # Clone a repo from GitHub/GitLab
git config --global user.name "Your Name"
git config --global user.email "you@example.com"





2. Basic Workflow
bash
Copy
Edit
git status                   # Show changed files
git add <file>               # Stage a file
git add .                    # Stage all changes
git commit -m "Message"      # Commit staged changes
git log                      # Show commit history




3. Branching & Merging
bash
Copy
Edit
git branch                   # List branches
git branch <name>            # Create new branch
git checkout <name>          # Switch to branch
git checkout -b <name>       # Create & switch to new branch
git merge <branch>           # Merge branch into current branch



4. Collaboration
bash
Copy
Edit
git remote -v                # List remotes
git pull                     # Fetch + merge changes from remote
git fetch                    # Fetch changes (no merge)
git push                     # Push changes to remote
git push -u origin <branch>  # Push new branch and set upstream



5. Undo & Cleanup
bash
Copy
Edit
git reset <file>             # Unstage a staged file
git checkout -- <file>       # Discard local changes to file
git revert <commit>          # Undo a commit by creating a new commit
git rm <file>                # Remove a tracked file
git rm $(git ls-files --deleted)  # Remove all deleted files from Git
git clean -f                 # Remove untracked files