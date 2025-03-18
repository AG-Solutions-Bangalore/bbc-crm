# BBC CRM

<div align="center">

# AG Solutions

**A robust Customer Relationship Management system built for BBC by AG Solutions**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.16.7-0081CB?style=flat-square&logo=material-ui)](https://mui.com/)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

## 🔍 Overview

BBC CRM is a comprehensive Customer Relationship Management system designed specifically for BBC's needs. This application streamlines user management, feedback collection, and internal operations.

**PRIVATE REPOSITORY - PROPRIETARY SOFTWARE**

⚠️ This repository contains proprietary software developed by AG Solutions for BBC. All rights reserved. Unauthorized use, reproduction, or distribution is strictly prohibited.

## ✨ Features

- **User Management**
  - Active/Inactive user tracking
  - New user onboarding
  - Mobile user management
  - User profile management
  
- **Authentication & Security**
  - Secure login/registration system
  - Password recovery
  - Role-based access control
  
- **Communication Tools**
  - User sharing functionality
  - Contact management
  - Feedback collection
  
- **Analytics & Reporting**
  - User activity tracking
  - Downloadable reports
  - Performance dashboards

- **Website Management**
  - Portfolio management
  - About page customization
  - Mission & Vision statement editor
  - Enquiry handling

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Styling**: 
  - Tailwind CSS 3.3.4
  - Material Tailwind 2.1.9
  - Emotion
- **UI Components**:
  - Material UI 5.16.7
  - MUI DataTables 4.3.0
- **Data Visualization**: ApexCharts 3.44.0
- **Routing**: React Router DOM 6.17.0
- **HTTP Client**: Axios 1.7.5
- **Notifications**: 
  - React Hot Toast 2.4.1
  - React Toastify 10.0.5
- **Icons**: 
  - Heroicons 2.0.18
  - React Icons 5.3.0
  - MUI Icons 5.16.7

## 📁 Project Structure

```
sajid-tech-bbc-crm/
├── public/
│   └── img/
├── src/
│   ├── assets/
│   ├── base/
│   │   └── BaseUrl.jsx
│   ├── components/
│   │   ├── DashboardNavbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Logout.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SideNav.jsx
│   ├── config/
│   │   └── ButtonConfig.jsx
│   ├── layout/
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── maintenance/
│   │   ├── profile/
│   │   ├── users/
│   │   └── website/
│   ├── utils/
│   │   └── ContextPanel.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.cjs
├── README.md
├── tailwind.config.cjs
├── vercel.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (>=20.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AG-Solutions-Bangalore/bbc-crm.git
   cd bbc-crm
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Create a production build:
```bash
npm run build
# or
yarn build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
```



## 👥 Contributing

This is a private repository for a proprietary project. Contributions are restricted to authorized team members only.

For internal team members:
1. Create a new branch for your feature or bugfix
2. Make your changes
3. Submit a pull request with a clear description of the changes
4. Request review from the team lead

## 📞 Contact

For any inquiries regarding this project, please contact:

**AG Solutions**
- Email: [info@agsolutions.com](info@agsolutions.com)
- Website: https://ag-solutions.in/

**Project Manager**
- Name: Govind Garg
- Email: [info@agsolutions.com](info@agsolutions.com)
- Phone: +91 8867171060

---

<div align="center">
  <p>© 2025 AG Solutions. All Rights Reserved.</p>
  <p>Developed with ❤️ by the AG Solutions Team</p>
</div>