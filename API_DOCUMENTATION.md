# API Documentation สำหรับโปรเจค Davlog

## ภาพรวม
โปรเจคนี้เป็นระบบจัดการโปรเจกต์และระบบย่อย (Systems) โดยมีโครงสร้างข้อมูลหลักประกอบด้วย:
- **Users** - ผู้ใช้งานระบบ
- **Projects** - โปรเจกต์ต่างๆ ที่ผู้ใช้สร้าง
- **Systems** - ระบบย่อยภายในโปรเจกต์
- **Notes** - บันทึกข้อความภายในระบบ

## Database Schema

### User
```typescript
{
  id: string
  name?: string
  email?: string (unique)
  password?: string
  image?: string
  emailVerified?: DateTime
  createdAt: DateTime
}
```

### Project
```typescript
{
  id: string
  title: string
  description?: string
  userId: string (foreign key to User)
  createdAt: DateTime
}
```

### System
```typescript
{
  id: string
  title: string
  description?: string
  projectId: string (foreign key to Project)
  flowData?: Json
  createdAt: DateTime
}
```

### Note
```typescript
{
  id: string
  content: string
  type: "problem" | "solution" | "learning"
  systemId: string (foreign key to System)
  createdAt: DateTime
}
```

## API Endpoints

### Authentication APIs

#### 1. Sign Up
```
POST /api/auth/signup
Content-Type: application/json

Request Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

Response:
{
  "message": "User created successfully"
}
Status: 201
```

#### 2. Sign In
```
POST /api/auth/signin
Content-Type: application/json

Request Body:
{
  "email": "string",
  "password": "string"
}

Response:
{
  // NextAuth session data
}
```

#### 3. Google Auth
```
GET/POST /api/auth/[...nextauth]
```
รองรับการล็อกอินผ่าน Google OAuth 2.0

---

### Project APIs

#### 1. Create Project
```
POST /api/projects
Content-Type: application/json

Request Body:
{
  "title": "string",
  "description": "string",
  "userId": "string"
}

Response:
{
  id: string,
  title: string,
  description: string,
  userId: string,
  createdAt: DateTime,
  systems: System[]
}
Status: 201
```

#### 2. Read All Projects
```
GET /api/projects

Response:
[
  {
    id: string,
    title: string,
    description: string,
    userId: string,
    createdAt: DateTime,
    systems: System[]
  }
]
```

#### 3. Read One Project
```
GET /api/projects/{id}

Response:
{
  id: string,
  title: string,
  description: string,
  userId: string,
  createdAt: DateTime,
  systems: System[]
}
```

#### 4. Update Project
```
PUT /api/projects/{id}
Content-Type: application/json

Request Body:
{
  "title": "string",
  "description": "string"
}

Response:
{
  id: string,
  title: string,
  description: string,
  userId: string,
  createdAt: DateTime
}
```

#### 5. Delete Project
```
DELETE /api/projects/{id}

Response:
{
  "message": "Project deleted"
}
```

---

### System APIs

#### 1. Create System
```
POST /api/systems
Content-Type: application/json

Request Body:
{
  "title": "string",
  "description": "string",
  "projectId": "string"
}

Response:
{
  id: string,
  title: string,
  description: string,
  projectId: string,
  flowData: Json,
  createdAt: DateTime
}
Status: 201
```

#### 2. Read All Systems
```
GET /api/systems

Response:
[
  {
    id: string,
    title: string,
    description: string,
    projectId: string,
    flowData: Json,
    createdAt: DateTime,
    notes: Note[]
  }
]
```

#### 3. Read One System
```
GET /api/systems/{systemId}

Response:
{
  id: string,
  title: string,
  description: string,
  projectId: string,
  flowData: Json,
  createdAt: DateTime,
  notes: Note[]
}
```

#### 4. Update System
```
PUT /api/systems/{systemId}
Content-Type: application/json

Request Body:
{
  "title": "string",
  "description": "string",
  "flowData": Json
}

Response:
{
  id: string,
  title: string,
  description: string,
  projectId: string,
  flowData: Json,
  createdAt: DateTime
}
```

#### 5. Delete System
```
DELETE /api/systems/{systemId}

Response:
{
  "message": "System deleted"
}
```

---

### Note APIs

#### 1. Create Note
```
POST /api/notes
Content-Type: application/json

Request Body:
{
  "content": "string",
  "type": "problem" | "solution" | "learning",
  "systemId": "string"
}

Response:
{
  id: string,
  content: string,
  type: "problem" | "solution" | "learning",
  systemId: string,
  createdAt: DateTime
}
Status: 201
```

#### 2. Read All Notes
```
GET /api/notes

Response:
[
  {
    id: string,
    content: string,
    type: "problem" | "solution" | "learning",
    systemId: string,
    createdAt: DateTime
  }
]
```

#### 3. Read One Note
```
GET /api/notes/{noteId}

Response:
{
  id: string,
  content: string,
  type: "problem" | "solution" | "learning",
  systemId: string,
  createdAt: DateTime,
  system: {
    id: string,
    title: string,
    projectId: string
  }
}

Error Response (404):
{
  "error": "Note not found"
}
```

#### 4. Update Note
```
PUT /api/notes/{noteId}
Content-Type: application/json

Request Body:
{
  "content": "string", // optional
  "type": "problem" | "solution" | "learning" // optional
}

Response:
{
  id: string,
  content: string,
  type: "problem" | "solution" | "learning",
  systemId: string,
  createdAt: DateTime,
  system: {
    id: string,
    title: string,
    projectId: string
  }
}

Error Responses:
- 400: At least one field (content or type) must be provided
- 400: Invalid type. Must be one of: problem, solution, learning
- 404: Note not found
```

#### 5. Delete Note
```
DELETE /api/notes/{noteId}

Response:
{
  "message": "Note deleted successfully",
  "deletedNote": {
    "id": string,
    "content": string
  }
}

Error Response (404):
{
  "error": "Note not found"
}
```

---

## ข้อมูลทดสอบ (Test Data)

จากไฟล์ [`test.rest`](test.rest) มีข้อมูลทดสอบดังนี้:

### User
- Email: ex@gmail.com
- Password: 123456
- Name: Nattapol

### Project
- ID: cmgs1vm360008ttlobc8nta3z
- Title: Roblox Battle Game
- Description: ระบบเกม Roblox ที่มีการจัดการผู้เล่นและทีม
- User ID: cmgr0705x0000ttsk4m06evuq

### System
- ID: cmgs5nshz0001tt40qdxxhbma
- Title: สี
- Description: Red blue
- Project ID: cmgs55vx5000kttlo9hyjt2un

### Note
- ID: cmgs6abc0002tt40qdxxhbmb (ตัวอย่าง)
- Content: ปัญหาในการเชื่อมต่อฐานข้อมูล
- Type: problem
- System ID: cmgs5nshz0001tt40qdxxhbma

---

## การแก้ไขปัญหาล่าสุด

### DELETE System API Issue
**ปัญหา**: `TypeError: Cannot read properties of undefined (reading 'systemId')`

**สาเหตุ**:
1. Function signature ไม่ถูกต้อง - ขาด Request parameter
2. กำลังลบ `project` แทน `system`

**การแก้ไข**:
- เพิ่ม Request parameter ใน DELETE function
- เปลี่ยนจาก `prisma.project.delete` เป็น `prisma.system.delete`
- เพิ่ม error handling และแก้ไข response message

**ก่อนแก้ไข**:
```typescript
export async function DELETE({ params }: { params: { systemId: string } }) {
  await prisma.project.delete({ where: { id: params.systemId } });
  return NextResponse.json({ message: "Project deleted" });
}
```

**หลังแก้ไข**:
```typescript
export async function DELETE(
  _: Request,
  { params }: { params: { systemId: string } }
) {
  try {
    await prisma.system.delete({ where: { id: params.systemId } });
    return NextResponse.json({ message: "System deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", realError: error },
      { status: 500 }
    );
  }
}