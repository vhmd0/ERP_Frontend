# ERP System Frontend

Modern, full-featured ERP system frontend built with React, TypeScript, and Material-UI.

## ✅ Implementation Status

### Completed Features
- ✅ **Authentication** - JWT-based login system
- ✅ **Dashboard** - Overview with KPIs and statistics
- ✅ **Company Management** - Full CRUD operations
- ✅ **HR Module** - Employee management
- ✅ **Inventory Module** - Items and warehouse tracking
- ✅ **Sales Module** - Customers and orders management
- ✅ **Procurement Module** - Vendor management
- ✅ **Analytics** - KPIs with interactive charts
- ✅ **Responsive Layouts** - Sidebar navigation and header
- ✅ **Reusable Components** - DataTable, StatusBadge, etc.

### In Progress
- 🔄 Leave Requests & Attendance (HR)
- 🔄 Invoice Management (Sales)
- 🔄 Purchase Orders (Procurement)
- 🔄 Audit Logs (Analytics)
- 🔄 User Management (Infrastructure)

## 🚀 Features

### Core Modules
- **Company Management** - Manage company profiles and branches
- **HR (Human Resources)**
  - Employee directory with full profiles
  - Leave request management
  - Attendance tracking
- **Inventory Management**
  - Item catalog with SKU tracking
  - Warehouse management
  - Stock level monitoring
  - Low-stock alerts
- **Sales**
  - Customer relationship management
  - Sales order processing
  - Invoice generation
- **Procurement**
  - Vendor management with ratings
  - Purchase order tracking
  - Supplier performance analytics

### Analytics & Reporting
- KPI dashboards with charts
- Sales trend analysis
- Order statistics
- Custom reports (coming soon)

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching & caching
- **Material-UI v5** - Professional UI components
- **React Router v6** - Client-side routing
- **Recharts** - Data visualization
- **Vite** - Lightning-fast build tool
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ahmadmaithaloni/ERP_Frontend.git
cd ERP_Frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### Environment Variables

Create `.env.development` for local development:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=ERP System
```

Create `.env.production` for production:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_APP_NAME=ERP System
```

## 🏗️ Project Structure

```
ERP_Frontend/
├── public/                 # Static assets
├── src/
│   ├── app/               # Redux store & API setup
│   │   ├── store.ts
│   │   └── api/
│   │       └── baseApi.ts
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Authentication
│   │   ├── dashboard/     # Main dashboard
│   │   ├── core/          # Core business modules
│   │   │   ├── company/
│   │   │   ├── hr/
│   │   │   ├── inventory/
│   │   │   ├── sales/
│   │   │   └── procurement/
│   │   └── analytics/     # Reports & analytics
│   ├── shared/            # Shared utilities
│   │   ├── components/    # Reusable components
│   │   └── hooks/         # Custom React hooks
│   ├── layouts/           # Layout components
│   │   ├── MainLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── components/
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── routes/            # Route configuration
│   ├── theme/             # MUI theme customization
│   ├── App.tsx
│   └── main.tsx
├── .env.development
├── .env.production
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔗 Backend Integration

This frontend is designed to work with the [ERP_System_Polished](https://github.com/ahmadmaithaloni/ERP_System_Polished) backend.

**Backend Tech Stack:**
- ASP.NET Core 8.0 Web API
- PostgreSQL Database
- JWT Authentication
- Entity Framework Core
- Clean Architecture

**API Endpoints:**
- Authentication: `/api/auth/*`
- Companies: `/api/companies/*`
- HR: `/api/hr/*`
- Inventory: `/api/inventory/*`
- Sales: `/api/sales/*`
- Procurement: `/api/procurement/*`

## 🎨 UI Components

### Custom Components
- **DataTable** - Advanced table with sorting, filtering, pagination
- **PageHeader** - Consistent page headers with breadcrumbs
- **StatsCard** - Dashboard statistics cards
- **StatusBadge** - Status indicators
- **ConfirmDialog** - Confirmation dialogs for destructive actions

### Features
- Responsive design (mobile, tablet, desktop)
- Dark mode support (coming soon)
- Accessibility (WCAG 2.1 AA)
- RTL support (coming soon)

## 🚦 Getting Started

1. **Start the backend** (see [backend repo](https://github.com/ahmadmaithaloni/ERP_System_Polished))
2. **Configure environment** - Set `VITE_API_BASE_URL` in `.env.development`
3. **Install dependencies** - Run `npm install`
4. **Start dev server** - Run `npm run dev`
5. **Open browser** - Navigate to `http://localhost:3000`
6. **Login** - Use credentials from backend

## 📱 Future Enhancements

### Short Term
- [ ] Form validation with React Hook Form + Zod
- [ ] Advanced filtering and search
- [ ] Export to Excel/PDF
- [ ] Notification system
- [ ] User preferences

### Long Term
- [ ] Flutter mobile app
  - Offline support
  - Barcode scanning
  - Push notifications
  - Biometric auth
- [ ] Real-time updates with SignalR
- [ ] Multi-language support (i18n)
- [ ] Advanced reporting engine
- [ ] Workflow automation builder

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Ahmad Maithaloni**

- GitHub: [@ahmadmaithaloni](https://github.com/ahmadmaithaloni)
- Backend Repo: [ERP_System_Polished](https://github.com/ahmadmaithaloni/ERP_System_Polished)

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Redux Toolkit team for simplified state management
- Vite for the blazing-fast development experience
- React community for continuous innovation

---

**⭐ If you find this project useful, please consider giving it a star!**