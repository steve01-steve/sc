# SURAWITTAYAKARN STUDENT COUNCIL

เว็บไซต์สภานักเรียนโรงเรียนสุรวิทยาคาร ออกแบบตามแนวทาง Bright Minds ด้วยโทนสี Alice Blue, Columbia Blue, Uranian Blue และ Maya Blue พร้อมภาษาไทย/อังกฤษและระบบจัดการเนื้อหา

## ส่วนของเว็บไซต์

- หน้าแนะนำสภานักเรียน วิสัยทัศน์ และแนวทางการทำงาน
- โปรไฟล์คณะกรรมการและโครงสร้างฝ่ายงาน
- โครงการ ข่าวสาร และแกลเลอรีกิจกรรม
- แบบฟอร์มรับข้อเสนอแนะและคำถาม
- สลับภาษาไทย/อังกฤษ
- ระบบผู้ดูแล 3 ระดับ: Super Admin, Admin และ Editor
- อัปโหลดภาพไปยัง Supabase Storage

เว็บไซต์เป็น static site และเผยแพร่ได้ผ่าน GitHub Pages ส่วนข้อมูล บัญชีผู้ดูแล และข้อความติดต่อจัดเก็บใน Supabase

## ตั้งค่า Supabase

1. สร้าง Supabase project
2. เปิด SQL Editor แล้วรันไฟล์ `supabase-schema.sql` ทั้งไฟล์ เพื่อสร้างตาราง, Row Level Security, สิทธิ์, trigger โปรไฟล์ผู้ใช้ และ bucket ภาพ `sc-media`
3. ไปที่ Project Settings → API แล้วคัดลอก Project URL กับ anon/publishable key ลงใน `supabase-config.js`
4. ห้ามใช้ `service_role` key ในไฟล์หน้าเว็บ เพราะไฟล์เหล่านี้ถูกส่งให้ผู้เข้าชมทุกคน
5. ใน Authentication settings ให้ปิดการสมัครสมาชิกสาธารณะ และใช้การเชิญผู้ใช้จาก Supabase Dashboard สำหรับบัญชีทีมงาน
6. เชิญอีเมลของ Super Admin คนแรกผ่าน Authentication → Users จากนั้นรันคำสั่งนี้ใน SQL Editor โดยแทนอีเมลจริง:

   ```sql
   update public.profiles
   set role = 'super_admin', is_active = true
   where lower(email) = lower('admin@example.com');
   ```

   Trigger จาก schema จะสร้าง profile ที่ยังไม่ active ให้ผู้ใช้ใหม่โดยอัตโนมัติ
7. กำหนด Site URL และ Redirect URLs ใน Authentication settings ให้ตรงกับโดเมนที่ใช้เผยแพร่เว็บไซต์

## บทบาทผู้ดูแล

| บทบาท | สิทธิ์ |
| --- | --- |
| Super Admin | จัดการเนื้อหาและข้อความติดต่อ, ลบบันทึก, เปิด/ปิดบัญชี และกำหนดบทบาท |
| Admin | จัดการและเผยแพร่เนื้อหา, ลบบันทึก และดูข้อความติดต่อ |
| Editor | สร้างและแก้ไขฉบับร่าง อัปโหลดภาพได้ แต่เผยแพร่หรือลบไม่ได้ |

ผู้ดูแลเข้าสู่ระบบที่ `admin.html` ผู้ใช้ที่ถูกเชิญจะยังเข้าไม่ได้จนกว่า Super Admin จะเปิดใช้งานบัญชีและกำหนดบทบาทให้

## เผยแพร่ด้วย GitHub Pages

1. เปิด Settings → Pages ใน repository
2. เลือก Deploy from a branch, branch `main` และโฟลเดอร์ `/(root)`
3. บันทึกและตั้งโดเมนที่ได้ใน Supabase Authentication → URL Configuration

การตั้งค่า Supabase ทำครั้งเดียวต่อ project ส่วนแก้ไขเนื้อหาประจำวันทำได้จากหน้า Admin

## ข้อมูลตัวอย่าง

เมื่อยังไม่ได้ตั้งค่า Supabase หน้าแรกจะแสดงตัวอย่างเนื้อหาสำหรับดูเลย์เอาต์เท่านั้น แบบฟอร์มติดต่อและ Admin จะเปิดใช้งานหลังตั้งค่า Supabase

สคริปต์จะเก็บหัวข้อโครงการ 6 รายการจากหน้าเดิมไว้เป็นฉบับร่างใน Supabase เพื่อให้ทีมตรวจสอบก่อนเผยแพร่ รายชื่อสมาชิกเดิมไม่ได้ตั้งเป็นคณะกรรมการโดยอัตโนมัติ ให้เพิ่มรายชื่อและตำแหน่งของชุดปัจจุบันผ่าน Admin หลังยืนยันข้อมูลแล้ว
