# Devlog - ระบบจัดการโปรเจคและบันทึกการพัฒนา

Devlog เป็นเว็บแอปพลิเคชันสำหรับจัดการโปรเจคและบันทึกการพัฒนาซอฟต์แวร์ ออกแบบมาเพื่อช่วยนักพัฒนาในการจัดระเบียบโปรเจค ติดตามความคืบหน้า และบันทึกปัญหา/วิธีแก้ไขที่พบระหว่างการพัฒนา

## 🚀 ฟีเจอร์หลัก

- **📊 แดชบอร์ด** - แสดงภาพรวมสถิติโปรเจค ระบบย่อย โน้ต และงานที่สำเร็จ
- **📁 การจัดการโปรเจค** - สร้าง แก้ไข ลบ และติดตามสถานะโปรเจค (TODO/DOING/DONE)
- **⚙️ ระบบย่อย (Systems)** - แบ่งโปรเจคออกเป็นระบบย่อยๆ เพื่อจัดการงานได้ง่ายขึ้น
- **📝 ระบบโน้ต** - บันทึกปัญหา วิธีแก้ไข และสิ่งที่เรียนรู้ระหว่างการพัฒนา
- **🔐 ระบบยืนยันตัวตน** - รองรับการล็อกอินด้วย Email/Password และ Google OAuth
- **🌙 ธีมมืด/สว่าง** - รองรับการสลับธีมตามการตั้งค่าระบบ

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Radix UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL กับ Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (แนะนำ)

## 📋 โครงสร้างข้อมูล

```
Users
├── Projects (1:N)
    ├── Systems (1:N)
        └── Notes (1:N)
```

- **Users**: ข้อมูลผู้ใช้งาน
- **Projects**: โปรเจคต่างๆ ที่ผู้ใช้สร้าง
- **Systems**: ระบบย่อยภายในโปรเจค
- **Notes**: บันทึกข้อความภายในระบบ (problem/solution/learning)

## 🚀 การติดตั้งและรันโปรเจค

### ข้อกำหนดเบื้องต้น

- Node.js 18.x หรือสูงกว่า
- PostgreSQL หรือฐานข้อมูลที่รองรับโดย Prisma
- Google OAuth Credentials (ถ้าต้องการใช้การล็อกอินด้วย Google)

### ขั้นตอนการติดตั้ง

1. Clone โปรเจค
```bash
git clone <repository-url>
cd davlog
```

2. ติดตั้ง dependencies
```bash
npm install
```

3. ตั้งค่าตัวแปรแวดล้อม
```bash
cp .env.example .env.local
```

แก้ไขไฟล์ `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/davlog"
DIRECT_URL="postgresql://username:password@localhost:5432/davlog"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth (ถ้าต้องการ)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. ตั้งค่าฐานข้อมูล
```bash
npx prisma migrate dev
npx prisma generate
```

5. รัน development server
```bash
npm run dev
```

6. เปิด browser ที่ [http://localhost:3000](http://localhost:3000)

## 📁 โครงสร้างโปรเจค

```
davlog/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard page
│   │   ├── projects/       # Project management pages
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/            # UI components (Radix UI)
│   │   └── ...            # Other components
│   ├── lib/               # Utility functions
│   │   ├── auth.ts        # NextAuth configuration
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # General utilities
│   └── types/             # TypeScript type definitions
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## 🔧 คำสั่งที่มีประโยชน์

```bash
# Development
npm run dev          # รัน development server

# Build
npm run build        # Build สำหรับ production
npm start            # รัน production server

# Database
npx prisma studio    # เปิด Prisma Studio
npx prisma migrate dev # สร้าง migration ใหม่
npx prisma generate   # Generate Prisma Client

# Linting
npm run lint         # รัน ESLint
```

## 📚 API Documentation

สำหรับข้อมูล API endpoints ทั้งหมด สามารถดูได้ที่ [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🤝 การมีส่วนร่วม

1. Fork โปรเจค
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📝 ข้อมูลทดสอบ

จากไฟล์ [`test.rest`](./test.rest) มีข้อมูลทดสอบดังนี้:

- **User**: ex@gmail.com / 123456
- **Project**: Roblox Battle Game
- **System**: สี (Red blue)
- **Note**: ปัญหาในการเชื่อมต่อฐานข้อมูล

## 📄 License

โปรเจคนี้ใช้ MIT License - ดูรายละเอียดที่ [LICENSE](LICENSE) สำหรับข้อมูลเพิ่มเติม

## 🆘 การแก้ไขปัญหา

สำหรับปัญหาที่พบบ่อยและวิธีแก้ไข สามารถดูได้ที่ [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#การแก้ไขปัญหาล่าสุด)

---

พัฒนาด้วย ❤️ โดยทีม Devlog