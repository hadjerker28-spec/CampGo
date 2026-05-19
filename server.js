const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// 🌟 السماح للمتصفح بالوصول إلى الصور والملفات الثابتة في مجلد المشروع
app.use(express.static(__dirname));

// 1. الاتصال بقاعدة البيانات في XAMPP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'campgo_db'
});

db.connect((err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات: ' + err.message);
        return;
    }
    console.log('تم الاتصال بقاعدة البيانات campgo_db بنجاح! 🎉');
});

// 2. استقبال بيانات التسجيل وحفظها والدخول مباشرة
app.post('/api/signup', (req, res) => {
    const { full_name, email, password } = req.body;
    
    const sql = 'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)';
    
    db.query(sql, [full_name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'حدث خطأ أثناء التسجيل أو الحساب موجود مسبقاً' });
        }
        
        res.json({ 
            success: true, 
            message: 'تم تسجيل حسابك والدخول بنجاح! 🎉',
            user: {
                id: result.insertId,
                full_name: full_name,
                email: email,
                wilaya: 'Setif', 
                favorite_place_type: 'Mountains'
            }
        });
    });
});

// 3. التحقق من بيانات تسجيل الدخول (Login API) - النسخة المطورة للاختبار
app.post('/api/login', (req, res) => {
    // 🌟 استخدام trim() لإزالة أي مسافات زائدة قد تأتي بالخطأ من المتصفح
    const email = req.body.email ? req.body.email.trim() : '';
    const password = req.body.password ? req.body.password.trim() : '';

    console.log("=== محاولة دخول جديدة ===");
    console.log("المتصفح أرسل -> الإيميل:", `[${email}]`, "| كلمة المرور:", `[${password}]`);

    // استعلام لجلب المستخدم بناءً على الإيميل فقط أولاً، لكي نتحقق أين الخلل
    const sql = 'SELECT * FROM users WHERE email = ?';
    
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("خطأ في قاعدة البيانات:", err);
            return res.status(500).json({ success: false, message: 'حدث خطأ في السيرفر' });
        }

        console.log("عدد الحسابات الوجدناها بهذا الإيميل:", results.length);

        if (results.length > 0) {
            // الإيميل صحيح! دعنا نتحقق من كلمة المرور الآن
            const user = results[0];
            
            // 🌟 تنبيه هام: نتحقق هنا من اسم العمود في قاعدة بياناتك (هل هو password أم password_hash)
            const dbPassword = user.password_hash || user.password; 

            console.log("المخزن في قاعدة البيانات -> كلمة المرور:", `[${dbPassword}]`);

            if (dbPassword === password) {
                console.log("🎉 التطابق ناجح! تم تسجيل الدخول.");
                return res.json({ 
                    success: true, 
                    message: 'مرحباً بعودتك!', 
                    user: {
                        id: user.user_id || user.id,
                        full_name: user.full_name,
                        email: user.email,
                        wilaya: user.wilaya || 'Setif',
                        favorite_place_type: user.favorite_place_type || 'Mountains'
                    }
                });
            } else {
                console.log("❌ الإيميل صحيح ولكن كلمة المرور غير متطابقة!");
            }
        } else {
            console.log("❌ الإيميل هذا غير موجود تماماً في قاعدة البيانات!");
        }

        // إذا وصلنا هنا فهناك خطأ في الإيميل أو الباسورد
        res.json({ success: false, message: 'الإيميل أو كلمة المرور غير صحيحة!' });
    });
});
// 🌟 4. تحديد البورت وتشغيل السيرفر ليتصل به المتصفح
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 السيرفر يعمل الآن بنجاح على: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});