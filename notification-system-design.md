# Notification System Design

## Stage 1 - REST API Design

### Objective

Design a notification platform that allows students to receive real-time notifications regarding Placements, Results, and Events.

---

## Core Features

1. Fetch all notifications
2. Fetch unread notifications
3. Mark notification as read
4. Mark all notifications as read
5. Delete notification
6. Receive real-time notifications

---

## Authentication

All endpoints require Bearer Token authentication.

### Headers

```http
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Fetch Notifications

### Request

```http
GET /api/v1/notifications
```

### Query Parameters

```http
?page=1
&limit=20
&type=Placement
```

### Response

```json
{
  "success": true,
  "count": 2,
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Google Hiring",
      "isRead": false,
      "createdAt": "2026-06-18T10:00:00Z"
    }
  ]
}
```

---

## Fetch Unread Notifications

### Request

```http
GET /api/v1/notifications/unread
```

### Response

```json
{
  "success": true,
  "count": 5,
  "notifications": []
}
```

---

## Mark Notification as Read

### Request

```http
PATCH /api/v1/notifications/:id/read
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## Mark All Notifications as Read

### Request

```http
PATCH /api/v1/notifications/read-all
```

### Response

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## Delete Notification

### Request

```http
DELETE /api/v1/notifications/:id
```

### Response

```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Real-Time Notification Mechanism

### Technology

WebSockets

### Flow

```text
Admin Creates Notification
            |
            v
 Notification Service
            |
            v
     WebSocket Server
            |
            v
 Connected Student Clients
```

Benefits:

* Instant delivery
* Reduced polling
* Better user experience
* Lower database load

---
