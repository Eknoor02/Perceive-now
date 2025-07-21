# 🏗️ How I’d Make This Production-Grade in 7 Days

### 🔁 Day 1–2: Database + ORM
- Replace mock JSON with PostgreSQL (via Prisma or Sequelize)
- Create models: Report, Feedback, Source

### 🔐 Day 3: JWT Auth
- Implement login flow with JWT
- Setup role-based access: viewer / reviewer
- Protect sensitive endpoints

### 🚀 Day 4–5: CI/CD + Testing
- Add ESLint, Prettier
- Setup GitHub Actions: test → lint → deploy
- Add unit tests using Jest (backend) and React Testing Library (frontend)

### 📈 Day 6: Logging + Monitoring
- Backend: Winston + Sentry for structured logging
- Frontend: LogRocket for user session tracking
- Add health check endpoints

### 🧼 Day 7: UX Polish & Accessibility
- Add loading states and error handling
- Improve mobile responsiveness and accessibility (ARIA labels, contrast)
