## วิธีการติดตั้ง Product และตั้งค่า Database.

1. clone git `https://github.com/kitsada8621/e-commerce.git`
2. เปิด command prompt ไปยัง dir ของ auth-service และทำการ `npm install`
3. ไปยังไฟล์ `.env` เพื่อทำการตรวจสอบความถูกต้องของ config database
4. พิมพ์คำสั่ง `npx sequelize-cli db:create` เพื่อทำการสร้าง database
5. พิมพ์คำสั่ง `npx sequelize-cli db:migrate` เพื่อ migrate table ยังไปยัง database
6. ไปยัง folder product-service และ เปิด command prompt จากนั้นทำการ `npm install` และ `npm run start`
7. ไปยัง folder order-service และ เปิด command prompt จากนั้นทำการ `npm install` และ `npm run start`
8. ไปยัง folder user-service และ เปิด command prompt จากนั้นทำการ `npm install` และ `npm run start`

