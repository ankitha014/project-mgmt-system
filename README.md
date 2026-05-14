# 🚀 WorkSprint Hub

**WorkSprint Hub** is a premium, collaborative project management system designed to streamline workflows, enhance team productivity, and provide actionable insights. Built with a focus on speed, clarity, and modern design aesthetics.

---

## ✨ Key Features

### 🏢 Workspace & Project Management
- **Isolated Workspaces**: Securely manage different teams, clients, or departments in distinct environments.
- **Project Organization**: Categorize tasks into projects with custom metadata and tracking.

### ✅ Advanced Task Tracking
- **Interactive Kanbans**: Drag-and-drop task management for intuitive workflow control.
- **Detailed Task View**: Support for subtasks, priorities, labels, and rich descriptions.
- **Workspace Isolation**: Tasks are strictly scoped to their respective workspaces.

### 📊 Powerful Analytics
- **Productivity Insights**: Visualize team performance with dynamic charts.
- **Project Progress**: Real-time tracking of task completion and project health.

### 🔔 Smart Notifications
- **Real-time Updates**: Stay informed about task assignments, comments, and deadline reminders.
- **Centralized Inbox**: A dedicated space to manage all project-related alerts.

### 🎨 Premium User Experience
- **Glassmorphism Design**: A sleek, modern interface with smooth transitions and animations.
- **Dark Mode First**: Optimized for long-working hours with a beautiful dark theme.
- **Responsive Layout**: Fully functional across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Supabase (PostgreSQL & Auth)
- **Utilities**: TanStack Query, Recharts, Lucide Icons

---

## 📂 Project Structure

```bash
src/
├── components/     # Reusable UI components (shadcn/ui)
├── contexts/       # React Contexts for global state
├── hooks/          # Custom React hooks
├── integrations/   # Supabase client and integrations
├── lib/            # Utility functions and shared logic
├── pages/          # Individual page components
├── services/       # API and backend service layers
└── types/          # TypeScript definitions
```

---

## 🚀 Getting Started

```bash
# Clone and enter the project
git clone https://github.com/your-username/WorksprintHub.git
cd WorksprintHub/PMS

# Install dependencies
bun install # or npm install

# Set up environment variables (.env)
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

# Run development server
bun dev # or npm run dev
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

---

## 📄 License

MIT License. See `LICENSE` for details.

---

<p align="center">Built with ❤️ by the Worksprint Hub Team</p>
