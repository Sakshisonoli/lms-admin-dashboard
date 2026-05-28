# KLP LMS - Super Admin Dashboard

A modern, responsive super admin dashboard for KLP Learning Management System built with React and Material-UI, inspired by Creative Tim's Black Dashboard design.

## Features

### 🎯 Dashboard Analytics
- Real-time statistics and metrics
- System overview with visual charts
- Recent activity tracking
- Performance indicators

### 👥 Team Management
- **Office Staff**: Manage administrative personnel
- **Teachers**: Handle educator profiles and assignments  
- **Students**: Oversee student accounts and batch assignments
- Direct messaging capabilities
- Role-based access control

### 📚 Content Management
- Upload and organize learning materials
- Content filtering by type and batch
- Version control and publishing workflow
- Analytics on content usage

### 🎓 Batch Management
- Create and manage student batches
- Track batch progress and completion
- Assign teachers to batches
- Monitor batch performance

### 💬 Messages & Communication
- Real-time messaging system
- Group conversations
- Direct messaging to team members
- Message history and search

### 🔔 Notifications & Alerts
- System-wide notifications
- Targeted messaging by user role
- Scheduled notifications
- Alert management

### 📊 Admin Activity Log
- Complete audit trail
- User action tracking
- Security monitoring
- Export capabilities

## Technology Stack

- **Frontend**: React 18
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Icons**: Material Icons
- **Charts**: MUI X Charts
- **Data Grid**: MUI X Data Grid

## Design Features

- **Dark Theme**: Inspired by Creative Tim Black Dashboard
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface
- **Accessibility**: WCAG compliant components
- **Performance**: Optimized for fast loading

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd klp-lms-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.js      # Navigation sidebar
│   └── TopBar.js       # Header navigation
├── pages/              # Main application pages
│   ├── Dashboard.js    # Analytics dashboard
│   ├── Team.js         # Team management
│   ├── Content.js      # Content management
│   ├── Batches.js      # Batch management
│   ├── Messages.js     # Communication hub
│   ├── Notifications.js # Notification center
│   └── AdminActivity.js # Activity logging
├── theme.js            # Material-UI theme configuration
├── App.js              # Main application component
└── index.js            # Application entry point
```

## Key Features Demonstration

### Team Management
- Click on "Team" in the sidebar to see staff, teachers, and students
- Use tabs to switch between different user types
- Send direct messages to team members
- Manage user profiles and permissions

### Content Management
- Filter content by type (Video, Document, Interactive, Assessment)
- Filter by batch assignments
- Track upload dates and authors
- Manage content lifecycle (Draft → Published → Archived)

### Batch Management
- Visual batch cards with progress indicators
- Teacher assignments and student counts
- Batch status tracking (Active, Completed, Pending)
- Performance metrics

### Communication System
- Real-time messaging interface
- Conversation management
- File attachments support
- Message history and search

## Customization

### Theme Colors
Edit `src/theme.js` to customize the color scheme:
- Primary: `#e14eca` (Pink)
- Secondary: `#1f8ef1` (Blue)
- Success: `#00d4aa` (Green)
- Warning: `#ff8a00` (Orange)
- Error: `#fd5d93` (Red)

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Add navigation item in `src/components/Sidebar.js`

## Demo Purpose

This dashboard serves as a demonstration for clients to showcase:
- Modern, professional UI design
- Comprehensive admin functionality
- Responsive and accessible interface
- Scalable architecture
- Integration capabilities

## Future Enhancements

- Real-time data integration
- Advanced analytics and reporting
- Multi-language support
- Mobile app companion
- API integration
- Advanced user permissions
- Automated workflows

## License

This project is created for demonstration purposes for KLP LMS.

## Support

For questions or support regarding this demo dashboard, please contact the development team.