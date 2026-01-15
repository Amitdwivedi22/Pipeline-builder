# Pipeline Builder

A node-based pipeline builder  
The application allows users to visually construct pipelines using nodes and edges, submit the pipeline, and analyze its structure using backend DAG validation.

---

## 🚀 Features

### Frontend
- Interactive node-based editor using **React Flow**
- Drag-and-drop node palette (Input, Output, LLM, Math, Merge, Default)
- Connect nodes using directed edges
- Add nodes dynamically
- Submit pipeline to backend
- Analyze pipeline structure with user-friendly UI feedback
- Modern UI built with **Vite + React + Tailwind CSS**

### Backend
- REST API built with **FastAPI**
- Pipeline analysis:
  - Total number of nodes
  - Total number of edges
  - Directed Acyclic Graph (DAG) validation
- Robust cycle detection logic
- CORS-enabled for frontend communication

---

## 🧠 What is DAG?

A **Directed Acyclic Graph (DAG)** is a graph with:
- Directed edges
- No cycles (no node can reach itself again)

DAG validation ensures pipelines can be executed safely without infinite loops.

---

## 🗂 Project Structure


├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── flow/
│ │ ├── store/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── package.json
│
├── backend/
│ ├── app/
│ │ ├── api/
│ │ │ └── pipelines.py
│ │ ├── core/
│ │ │ └── dag.py
│ │ └── main.py
│ └── requirements.txt
│
└── README.md


---

## ⚙️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Flow
- Zustand (state management)

### Backend
- FastAPI
- Pydantic
- Uvicorn

---

## ▶️ Getting Started

### Frontend Setup
```bash
cd frontend
npm install
npm run dev

cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload


