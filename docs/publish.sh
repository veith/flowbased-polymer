#! /bin/bash

hugo
cd public
git add --all
git commit -m "Documentation updated"
git push -f origin gh-pages
