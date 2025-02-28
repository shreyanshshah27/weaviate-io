#!/bin/bash
set -e
set -o errexit # stop script immediately on error

URL_IGNORES="jsonlines.org/|arxiv.org/|huggingface.co/|linkedin.com/in/|crunchbase.com"
DOCUSAURUS_IGNORES="github.com/.*github.com/|github.com/weaviate/weaviate-io"
# Note #1 github.com/.*github.com/ - is to ignore meta links that include blog co-authors
# Note #2 github.com/weaviate/weaviate-io/tree/ - is for edit on github links

echo "**************************************
Starting Link Verification
PATH: ${NETLIFY_URL}
URL_IGNORES: ${URL_IGNORES}|${DOCUSAURUS_IGNORES}
**************************************"

./node_modules/.bin/linkinator ${NETLIFY_URL} \
--recurse \
--skip "${URL_IGNORES}|${DOCUSAURUS_IGNORES}" \
--timeout 5000 \
--verbosity error \
--url-rewrite-search "https://weaviate.io" \
--url-rewrite-replace "${NETLIFY_URL}" \
--retry true \
--retry-errors true \
--retry-errors-count 4 \
--retry-errors-jitter 4

# USE search/replace to test validity of links on Nelify, as they might not yet exist on weaviate.io

echo "**************************************
Link Verification Complete
**************************************"