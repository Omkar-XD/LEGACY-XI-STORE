# **LEGACY XI – Retro Football Jersey Store**

<!-- Home page -->
<img width="1918" height="906" alt="home1" src="https://github.com/user-attachments/assets/9d298f18-de95-4fc5-bee1-48b4858fad92" />

A full-stack e-commerce platform for buying **retro**, **classic**, and **modern** football jerseys.  
Includes a customer storefront, backend API, and full admin dashboard for product and order management.

---

## 🚀 **Tech Stack**

### **Frontend**
- React.js  
- Tailwind CSS  
- Shadcn/UI  
- Axios  
- React Router  

### **Backend**
- Node.js  
- Express.js  
- JWT Authentication  
- Mongoose  

### **Database**
- MongoDB (Atlas)

### **Admin Panel**
- React.js  
- Tailwind CSS  
- Shadcn/UI  
- Protected Admin Routes  
- Full CRUD Management

---

## 📁 **Project Structure**

LEGACY-XI-STORE/
│
├── frontend/ # Customer UI (shop, cart, checkout)
├── backend/ # REST API, authentication, controllers
└── admin/ # Admin dashboard (products, orders, analytics)

yaml
Copy code

---

## 🔥 **Core Features**

### 🛍 Storefront
- Retro + modern jerseys  
- Filters by club, country, player, era  
- Product detail pages  
- Cart system  
- Checkout logic  

### 🔐 Authentication
- JWT login/register  
- Role-based access  
- Protected user routes  

### 🧾 Orders
- Place & track orders  
- User order history  
- Admin full order overview  

### 🛠 Admin Panel
- Add/edit/delete products  
- Image uploads  
- Manage inventory & pricing  
- Order management  
- Dashboard stats  

---

## 📸 **Screenshots**

### **Product Display / Retro Collection**
<img width="1918" height="915" alt="coll1" src="https://github.com/user-attachments/assets/a6fd62c3-e3a9-4bd4-bae5-8a5331859ef0" />


<img width="1918" height="916" alt="coll2" src="https://github.com/user-attachments/assets/9dab21ac-8e39-4faa-b8db-a2afb3728ae2" />


---

### **Admin Dashboard**
<img width="1918" height="910" alt="admin1" src="https://github.com/user-attachments/assets/40856fa5-7608-4723-93ee-40050834fa9f" />


<img width="1918" height="922" alt="admin2" src="https://github.com/user-attachments/assets/1cb4dd6b-dbda-4bac-8e40-591205bde018" />


---

## ⚙️ **Installation & Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/Omkar-XD/LEGACY-XI-STORE.git
cd LEGACY-XI-STORE
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
Create .env file:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
Start backend:

bash
Copy code
npm start
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
4️⃣ Admin Panel Setup
bash
Copy code
cd admin
npm install
npm start
🧩 API Overview
Auth
POST /api/auth/register

POST /api/auth/login

Products
GET /api/products

GET /api/products/:id

POST /api/products (Admin)

PUT /api/products/:id (Admin)

DELETE /api/products/:id (Admin)

Orders
POST /api/orders

GET /api/orders/user

GET /api/orders (Admin)

🚀 Deployment
Frontend: Vercel

Admin Panel: Vercel

Backend: Render / Railway / Vercel Serverless

Database: MongoDB Atlas

📜 License
MIT License

⭐ Support
If this project helped you, give it a ⭐ on GitHub.
