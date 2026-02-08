# Kubernetes Local Run

This folder contains manifests to run ProductHub locally with Kubernetes and an Ingress.

## Prereqs
- A local cluster (minikube or kind)
- kubectl configured for that cluster
- An nginx ingress controller installed

## Build local images
From the repo root:

1) Backend image
- docker build -t producthub-backend:local -f backend/dockerfile backend

2) Frontend image
- docker build -t producthub-frontend:local -f frontend/dockerfile frontend

If you are using kind, load the images:
- kind load docker-image producthub-backend:local
- kind load docker-image producthub-frontend:local

## Apply manifests
Run from this directory:

kubectl apply -f namespace.yaml -f config_secret.yaml -f workloads.yaml -f service.yaml -f ingress.yaml

## Ingress hostname
Add this to your hosts file:

127.0.0.1 producthub.mk

Then open:
- http://producthub.mk

## Notes
- Mongo uses emptyDir for local storage. For persistence, replace it with a PVC.
- Update secrets in config_secret.yaml for production.
