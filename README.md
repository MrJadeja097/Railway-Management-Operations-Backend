# 🚆 Railway Operations Management API

**A secure, scalable backend for modern railway operations — built with ⚙️ NestJS and 🗄️ PostgreSQL.**

This API provides complete **CRUD operations** for managing 🚂 **Trains**, 🗺️ **Stations**, 🛤️ **RailLines**, 🛣️ **Routes**, and 👥 **Staff Members** — all secured with **JWT Authentication 🔐** and **Dynamic Role-Based Access Control (RBAC) 🔑**.

---

## 📌 Key Highlights

✨ **Tech Stack**
- **Backend:** NestJS (TypeScript) ⚙️
- **Database:** PostgreSQL 🗄️
- **Auth:** JWT Bearer Tokens 🔐
- **Access Control:** Fully Dynamic RBAC 🔑
- **API Docs:** Swagger UI 📜

✨ **Core Features**
- ✅ CRUD for Trains, Stations, RailLines, Routes & Staff
- ✅ **Dynamic RBAC** — define unlimited roles & permissions
- ✅ JWT-secured endpoints for authenticated access
- ✅ Swagger-based auto-generated API documentation
- ✅ Modular, service-based NestJS architecture
- ✅ Scalable & enterprise-ready design

---

## 🔑 How RBAC Works

This system uses **Dynamic Role-Based Access Control** — you can:
- 🏷️ **Create any number of roles** (Admin, Manager, Operator, Inspector, Auditor, etc.)
- 🎚️ **Assign or revoke permissions** (create, read, update, delete) for each resource
- 🛡️ Protect all routes with granular `@Roles` and `AuthGuard` decorators
- 🔗 Easily extend to more user groups or permissions as needed

---

## 📜 API Documentation

Every endpoint is documented with **Swagger UI** 📜 for easy testing and collaboration.

**Key endpoints include:**
- `POST /trains` — Add a new train 🚂
- `GET /stations` — Get all stations 🗺️
- `PATCH /raillines/:id` — Update a RailLine 🛤️
- `DELETE /routes/:id` — Remove a route 🛣️
- `POST /staff` — Create staff 👥
- And more...

All endpoints:
- Require **Bearer Token** (JWT)
- Enforce **role checks** with RBAC decorators

---

## 🚦 How to Run Locally

```bash
# 1️⃣ Install dependencies
yarn install

# 2️⃣ Run database migrations (adjust for your setup)
yarn typeorm migration:run

# 3️⃣ Start the server (dev mode)
yarn start:dev

# 4️⃣ Access Swagger UI at
http://localhost:3000/api
