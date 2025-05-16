# 🚀 AlgoCode Socket Service 

A lightweight Node.js microservice for real-time communication using **Socket.io** and **Redis**. Designed for scalable, low-latency messaging between clients, with REST API integration for targeted payload delivery.

---

## 📦 Project Structure

```plaintext
.
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── .vscode/
│   └── settings.json
└── src/
    ├── index.js
    └── config/
        └── server.config.js
```

---

## ⚡ Quick Start

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd AlgoCode_Socket_Service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Edit the `.env` file:

   ```env
   PORT=8050
   ```

4. **Start the server**

   ```bash
   npm start
   ```

   Server will start on the port defined in `.env` (default: **8050**).

---

## 🛠️ Features

* 🔁 Real-time bidirectional communication via Socket.io
* 🧠 Redis-backed user-to-socket mapping for scalability
* 🌐 REST API for sending payloads to specific users
* 🔒 CORS support for frontend integration
* 🧱 Robust error handling and validations

---

## 📚 API Documentation

### 📮 REST Endpoints

| Method | Endpoint       | Description                     |
| ------ | -------------- | ------------------------------- |
| POST   | `/sendPayload` | Send a payload to a user socket |

---

### 🔸 POST `/sendPayload`

Send a payload to a specific user by their `userId`.

#### 📥 Request

* **Headers:** `Content-Type: application/json`
* **Body:**

  ```json
  {
    "userId": "string",
    "payload": "any JSON-serializable value"
  }
  ```

#### ✅ Valid Example

```json
{
  "userId": "user123",
  "payload": { "message": "Hello!" }
}
```

#### 📤 Responses

| Status | Description               | Example Response              |
| ------ | ------------------------- | ----------------------------- |
| 200    | Payload sent successfully | `"Payload sent successfully"` |
| 400    | Invalid request body      | `"Invalid Request"`           |
| 404    | User not found/connected  | `"User not found"`            |

<details>
<summary>🧪 Example Request/Response</summary>

**Request:**

```http
POST /sendPayload HTTP/1.1
Host: localhost:8050
Content-Type: application/json

{
  "userId": "user123",
  "payload": { "message": "Hello!" }
}
```

**Success Response:**

```http
HTTP/1.1 200 OK
Payload sent successfully
```

**Error Response:**

```http
HTTP/1.1 404 Not Found
User not found
```

</details>

---

### 📡 Socket.io Events

#### 📤 Client → Server

| Event       | Payload  | Description                               |
| ----------- | -------- | ----------------------------------------- |
| `setUserId` | `userId` | Registers the user's socket with their ID |
| `fetchId`   | `userId` | Request the socket ID for a given user ID |

#### 📥 Server → Client

| Event               | Payload    | Description                            |
| ------------------- | ---------- | -------------------------------------- |
| `getId`             | `socketId` | Response to `fetchId`                  |
| `receiveResPayload` | `payload`  | Delivers payload to target user socket |

<details>
<summary>💻 Socket.io Usage Example</summary>

**Register User:**

```js
socket.emit("setUserId", "user123");
```

**Send Payload (from server):**

```js
io.to(socketId).emit("receiveResPayload", { message: "Hello!" });
```

</details>

---

## 🚨 Error Handling

* `400 Bad Request` → Returned if `userId` or `payload` is missing in `/sendPayload`
* `404 Not Found` → Returned if target user is not connected or not found in Redis
* `500 Internal Server Error` → Generic errors during Redis operations or server failures
  *(Logging recommended; currently not implemented)*

---

## 📝 Environment Variables

| Variable | Description                 | Default |
| -------- | --------------------------- | ------- |
| `PORT`   | Port for HTTP/socket server | `8050`  |

---

## 🤝 Contributing

* Fork the repository
* Create a new branch
* Submit a pull request with meaningful commit messages

---

## 📬 Contact

For queries or bug reports, feel free to open an issue.
