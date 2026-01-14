---
id: "cicd-pipelines"
topic:
  zh: "CI/CD 流水线"
  en: "CI/CD Pipelines"
category: "DevOps"
icon: "FaRocket"
summary:
  zh: "使用持续集成和持续部署自动化软件交付"
  en: "Automating software delivery with Continuous Integration and Continuous Deployment."
details: 
  - "自动化测试与代码检查 / Automated Testing & Linting"
  - "Docker 容器化 / Docker Containerization"
  - "蓝绿部署 / Blue/Green Deployment"
  - "GitHub Actions / GitLab CI"
  - "基础设施即代码 / Infrastructure as Code"
link: "/notes/devops/cicd-mastery"
date: "2025-12-29"
---

# CI/CD Mastery

## The Pipeline

### 1. Continuous Integration (CI)
- **Code Checkout**: Fetching the latest code.
- **Linting**: Static code analysis (ESLint, Pylint).
- **Unit Testing**: Running Jest/Pytest suites.
- **Build**: Compiling assets or building Docker images.

### 2. Continuous Deployment (CD)
- **Staging**: Deploying to a pre-production environment.
- **Integration Tests**: End-to-end testing (Cypress/Playwright).
- **Production**: Live deployment with rollback capabilities.

## Tools Mastered
- **GitHub Actions**: Defining workflows in YAML.
- **Docker**: Ensuring environment consistency.
