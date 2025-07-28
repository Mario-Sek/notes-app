# NotesApp – Full Stack DevOps Deployment

This repository contains a full-stack, cloud-native Notes application deployed using a complete DevOps pipeline.

You can find the full technical summary in the included `Documentation.pdf`.


---

## Technology Stack

- **Frontend:** React with Vite, served via Nginx, packaged in a Docker container  
- **Backend:** Spring Boot (Java 17) REST API connected to PostgreSQL database  
- **Database:** PostgreSQL running in a Kubernetes StatefulSet with persistent storage  
- **DevOps Tools:** Docker, Docker Compose, GitHub Actions for CI/CD, Kubernetes with Ingress Controller  

---

## Project Overview

This project demonstrates a modern DevOps workflow by developing, containerizing, automating, and deploying a multi-service web application composed of three loosely coupled services: frontend, backend, and database.

Key focus areas include:

- Containerization of all services to ensure portability and consistency across environments  
- Local orchestration using Docker Compose during development  
- Automated build and deployment pipelines using GitHub Actions that push Docker images to Docker Hub  
- Kubernetes-based production-like orchestration featuring Deployments, StatefulSets, ConfigMaps, Secrets, Namespaces, and Ingress for external access and service routing  
- Secure and flexible configuration management through Kubernetes ConfigMaps and Secrets  

---

## What I Did

- Developed and containerized the React frontend and Spring Boot backend  
- Configured PostgreSQL as a StatefulSet with persistent volumes for data durability  
- Created and managed Kubernetes manifests for deploying and connecting all services  
- Set up a local Kubernetes cluster and exposed the application externally using an Ingress controller with port forwarding  
- Automated the CI/CD pipeline with GitHub Actions to build, tag, and push Docker images on every push to the `main` branch  
- Ensured frontend and backend services communicate seamlessly within the Kubernetes cluster  
- Managed application configurations and sensitive credentials securely via Kubernetes ConfigMaps and Secrets  
