az acr build --image nile-fe/www:latest --registry nilecr --file Dockerfile .
kubectl rollout restart deployment nile-fe
