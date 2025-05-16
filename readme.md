# AlgoCode Socket Service 🚀

A lightweight Node.js microservice for real-time communication using Socket.io and Redis. Designed for scalable, low-latency messaging between clients, with REST API integration for payload delivery.

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
   ```sh
   git clone <your-repo-url>
   cd AlgoCode_Socket_Service
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment**
   - Edit `.env` (already present):
     ```
     PORT=8050
     ```

4. **Start the server**
   ```sh
   npm start
   ```
   The server will run on the port specified in `.env` (default: 8050).

---

## 🛠️ Features

- Real-time bidirectional communication via Socket.io
- Redis-backed user-to-socket mapping for scalability
- REST API for sending payloads to specific users
- CORS support for frontend integration
- Robust error handling

---

## 📚 API Documentation

### REST Endpoints

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/sendPayload`   | Send a payload to a user socket |

---

### 1. **POST `/sendPayload`**

Send a payload to a specific user by their userId. The server will emit the payload to the user's socket if connected.

#### **Request**

- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "userId": "string",   // Required: The target user's ID
    "payload": "any"      // Required: The payload to send (can be any JSON-serializable value)
  }
  ```

#### **Responses**

| Status | Description                | Body                        |
|--------|----------------------------|-----------------------------|
| 200    | Payload sent successfully  | `"Payload sent successfully"` |
| 400    | Invalid request body       | `"Invalid Request"`         |
| 404    | User not found/connected   | `"User not found"`          |

<details>
<summary>Example Request/Response</summary>

**Request**
```http
POST /sendPayload HTTP/1.1
Host: localhost:8050
Content-Type: application/json

{
  "userId": "user123",
  "payload": { "message": "Hello!" }
}
```

**Success Response**
```http
HTTP/1.1 200 OK
Payload sent successfully
```

**Error Response (User not found)**
```http
HTTP/1.1 404 Not Found
User not found
```
</details>

---

### 2. **Socket.io Events**

#### **Client → Server**

| Event      | Payload      | Description                                 |
|------------|-------------|---------------------------------------------|
| setUserId  | `userId`    | Register the user's socket with their userId |
| fetchId    | `userId`    | Request the socketId for a given userId      |

#### **Server → Client**

| Event             | Payload      | Description                                  |
|-------------------|-------------|----------------------------------------------|
| getId             | `socketId`  | Responds to `fetchId` with the socketId      |
| receiveResPayload | `payload`   | Sends a payload to the specific user socket  |

<details>
<summary>Socket.io Usage Example</summary>

**Register User**
```js
socket.emit('setUserId', 'user123');
```

**Send Payload (from server)**
```js
io.to(socketId).emit('receiveResPayload', { message: "Hello!" });
```
</details>

---

## 🚨 Error Handling

- **400 Bad Request:** Returned if `userId` or `payload` is missing in `/sendPayload`.
- **404 Not Found:** Returned if the target user is not connected or not found in Redis.
- **500 Internal Server Error:** Any unexpected server/Redis errors will be logged and should be handled with generic error responses (not currently implemented, but recommended for production).

---

## 📝 Environment Variables

| Variable | Description                | Default |
|----------|----------------------------|---------|
| PORT     | Port for HTTP/socket server | 8050    |

---

## 👨‍💻 Development

- Uses [nodemon](https://nodemon.io/) for hot-reloading during development.
- CORS is configured for `http://localhost:5500` (adjust as needed).

---

## 🤝 Contributing

Pull requests and issues are welcome!

---

## 📬 Contact

For questions, open an issue and contact me.

---

````
