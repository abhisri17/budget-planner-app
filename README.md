# 💰 Budget Planner Pro

Full-stack budget planning application with React TypeScript and Node.js.

## ✨ Features

- Monthly, Quarterly & Yearly budget tracking
- Expense categorization (Food, Transport, Healthcare, etc.)
- SIP Calculator with inflation adjustment
- EMI Calculator with detailed breakdown
- Real-time budget progress tracking
- Responsive design with Tailwind CSS

## 🛠 Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, Axios  
**Backend:** Node.js, Express, TypeScript, CORS

## 📁 Project Structure

budget-planner-app/
├── frontend/          # React TypeScript app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── types/
│       └── services/
└── backend/           # Node.js Express API
    └── src/
        ├── controllers/
        ├── routes/
        └── models/

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Running

**Backend:**
cd backend
npm install
npm run dev

**Frontend:**
cd frontend
npm install
npm run dev

**Access:** http://localhost:5173

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/budgets | Get all budgets |
| POST | /api/budgets | Create budget |
| PUT | /api/budgets/:id | Update budget |
| DELETE | /api/budgets/:id | Delete budget |
| POST | /api/calculators/sip | Calculate SIP |
| POST | /api/calculators/emi | Calculate EMI |

## 🔮 Future Features

- Database integration
- User authentication
- Data visualization charts
- PDF export
- Dark mode

## 📄 License

MIT License

## 👤 Author

**Your Name**  
GitHub: @abhisri1705

---

⭐ Star this repo if you find it helpful!