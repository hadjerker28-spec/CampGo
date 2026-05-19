/* ===================================== */
/* 🔥 SAVE TRIP FUNCTION */
/* ===================================== */

function saveTrip() {

    // 📌 نجيبو المعلومات من الفورم
    let name = document.getElementById("name").value;
    let place = document.getElementById("place").value;
    let wilaya = document.getElementById("wilaya").value;
    let type = document.getElementById("type").value;

    // 📌 تحقق اذا الفورم فارغ
    if(name == "" || place == ""){
        alert("Fill all fields!");
        return;
    }

    // 📌 صورة حسب النوع
    let image = "";

    if(type == "Mountain"){
        image = "image/mountains.jpg";
    }

    else if(type == "Sea"){
        image = "image/sea.jpg";
    }

    else{
        image = "image/rever.jpg";
    }

    // 📌 object تاع الرحلة
    let trip = {
        name: name,
        place: place,
        wilaya: wilaya,
        type: type,
        date: new Date().toLocaleDateString(),
        image: image
    };

    // 📌 نجيبو trips القديمة
    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    // 📌 نضيفو الجديدة
    trips.push(trip);

    // 📌 نحفظو ف localStorage
    localStorage.setItem("trips", JSON.stringify(trips));

    // 📌 رسالة نجاح
    alert("✅ Trip Saved Successfully!");

    // 📌 نفرغو الفورم
    document.getElementById("name").value = "";
    document.getElementById("place").value = "";
}



/* ===================================== */
/* 🔥 LOAD TRIPS FUNCTION */
/* ===================================== */

function loadTrips() {

    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    let box = document.getElementById("trip-gallery");

    if(!box) return;

    box.innerHTML = "";

    trips.forEach(function(trip){

        box.innerHTML += `

        <div class="trip-card">

            <img src="${trip.image}" class="trip-img">

            <div class="trip-card-content">

                <h2>${trip.name}</h2>

                <p>📍 ${trip.place} - ${trip.wilaya}</p>

                <p>🏕 ${trip.type}</p>

                <p>📅 ${trip.date}</p>

            </div>

        </div>

        `;
    });

    // 📌 statistiques
    document.getElementById("totalTrips").innerHTML = trips.length;
    document.getElementById("upcomingTrips").innerHTML = trips.length;
    document.getElementById("pastTrips").innerHTML = 0;
}


/* ========================= */
/* 🔥 DELETE TRIP            */
/* ========================= */

function deleteTrip(index){

    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    trips.splice(index,1);

    localStorage.setItem("trips", JSON.stringify(trips));

    loadTrips();
}


/* ========================= */
/* 🎒 CHECKLIST              */
/* ========================= */

function generateChecklist(type){

    let data = {
        "Mountain": ["Jacket", "Hiking shoes", "Flashlight", "Water"],
        "Sea": ["Sunscreen", "Swimsuit", "Towel"],
        "River": ["Fishing tools", "Boots", "Rope"]
    };

    let list = data[type];

    let box = document.getElementById("checklist");

    if(!list){
        box.innerHTML = "";
        return;
    }

    box.innerHTML = "<h3>🎒 What to take:</h3>";

    list.forEach(item => {
        box.innerHTML += `
        <label>
            <input type="checkbox"> ${item}
        </label><br>
        `;
    });
}



// 🔥 الذهاب لصفحة الجبال
function goMountain() {
    window.location.href = "mountain.html";
}

// 🔥 الذهاب لصفحة البحر
function goSea() {
    window.location.href = "sea.html";
}

// 🔥 الذهاب لصفحة الأنهار
function goRiver() {
    window.location.href = "river.html";
}

// 🔥 الذهاب لصفحة Create Trip
function goToTrip(){
    window.location.href = "trip.html";
}
function showSeaInfo(name, desc, safety){
    document.getElementById("sea-info-box").innerHTML = `
        <h2>${name}</h2>
        <p>${desc}</p>
        <p><strong>Safety:</strong> ${safety}</p>
    `;
}







// ===================================== */
// 🔥 دالة تسجيل مستخدم جديد (نسخة المتصفح الذكية بدون سيرفر)
// ===================================== */
function registerUser() {
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-pass").value;

    // التحقق من أن الحقول ليست فارغة
    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields! ⚠️");
        return;
    }

    // جلب قائمة المستخدمين المسجلين سابقاً أو إنشاء قائمة جديدة
    let users = JSON.parse(localStorage.getItem("campgo_users")) || [];

    // التحقق إذا كان الإيميل مسجل من قبل
    let userExists = users.some(u => u.email === email);
    if (userExists) {
        alert("This email is already registered! ❌");
        return;
    }

    // إضافة المستخدم الجديد للقائمة
    let newUser = {
        full_name: name,
        email: email,
        password: password
    };
    users.push(newUser);

    // حفظ القائمة المحدثة في المتصفح
    localStorage.setItem("campgo_users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert("Account Created Successfully! 🎉"); 
    
    // الانتقال مباشرة إلى صفحة تسجيل الدخول
    window.location.href = "login.html"; 
}

// ===================================== */
// 🔥 دالة تسجيل الدخول والتحقق (نسخة المتصفح الذكية بدون سيرفر)
// ===================================== */
function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("pass").value;
    let remember = document.getElementById("remember") ? document.getElementById("remember").checked : false;
    let msgBox = document.getElementById("msg");

    // التحقق من الحقول قبل الإرسال
    if (email === "" || pass === "") {
        if (msgBox) {
            msgBox.style.color = "red";
            msgBox.innerHTML = "Please fill all fields! ⚠️";
        } else {
            alert("Please fill all fields! ⚠️");
        }
        return;
    }

    // جلب قائمة المستخدمين المخزنة في المتصفح
    let users = JSON.parse(localStorage.getItem("campgo_users")) || [];

    // البحث عن المستخدم المطابق للإيميل والباسورد
    let validUser = users.find(u => u.email === email && u.password === pass);

    if (validUser) {
        // إذا تطابقت البيانات بنجاح 🎉
        if (msgBox) {
            msgBox.style.color = "green";
            msgBox.innerHTML = "Login Successful! Welcome back 🎉";
        }

        // حفظ المستخدم الحالي ليعرفه الموقع
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        if (remember) {
            localStorage.setItem("rememberUser", "true");
        }

        // الانتقال فوراً إلى الصفحة الرئيسية بعد ثانية واحدة للاحتفال
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } else {
        // إذا كانت البيانات خاطئة أو الحساب غير موجود ❌
        if (msgBox) {
            msgBox.style.color = "red";
            msgBox.innerHTML = "Invalid email or password! ❌";
        } else {
            alert("Invalid email or password! ❌");
        }
    }
}









function openModal(name, img, desc, safety, wilaya, type){

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modal-img").src = img;

    document.getElementById("modal-info").innerHTML = `
        <h2>${name}</h2>
        <p>${desc}</p>
        <p><strong>Safety:</strong> ${safety}</p>

        <button onclick="addToTrip('${name}','${wilaya}','${type}')">
            ➕ Add to Trip
        </button>
    `;
}

// 🔥 CLOSE MODAL
function closeModal(){
    document.getElementById("modal").style.display = "none";
}

// 🔥 حفظ المكان و الذهاب ل Create Trip
// 🔥 حفظ المكان و الذهاب ل Create Trip
function addToTrip(name, wilaya, type){

    localStorage.setItem("selectedPlace", name);
    localStorage.setItem("selectedWilaya", wilaya);
    localStorage.setItem("selectedType", type);

    window.location.href = "trip.html";
}

// 📑 مصفوفة تحتوي على ولايات الجزائر (58 ولاية مرتبة)
const algeriaWilayas = [
    "01-Adrar", "02-Chlef", "03-Laghouat", "04-Oum El Bouaghi", "05-Batna", 
    "06-Béjaïa", "07-Biskra", "08-Béchar", "09-Blida", "10-Bouira", 
    "11-Tamanrasset", "12-Tébessa", "13-Tlemcen", "14-Tiaret", "15-Tizi Ouzou", 
    "16-Alger", "17-Djelfa", "18-Jijel", "19-Sétif", "20-Saïda", 
    "21-Skikda", "22-Sidi Bel Abbès", "23-Annaba", "24-Guelma", "25-Constantine", 
    "26-Médéa", "27-Mostaganem", "28-M'Sila", "29-Mascara", "30-Ouargla", 
    "31-Oran", "32-El Bayadh", "33-Illizi", "34-Bordj Bou Arréridj", "35-Boumerdès", 
    "36-El Tarf", "37-Tindouf", "38-Tissemsilt", "39-El Oued", "40-Khenchela", 
    "41-Souk Ahras", "42-Tipaza", "43-Mila", "44-Aïn Defla", "45-Naâma", 
    "46-Aïn Témouchent", "47-Ghardaïa", "48-Relizane",
    "49-El M'Ghair", "50-El Meniaa", "51-Ouled Djellal", "52-Bordj Badji Mokhtar", 
    "53-Béni Abbès", "54-In Salah", "55-In Guezzam", "56-Touggourt", "57-Djanet", "58-Al M'Ghair"
];

// 🔥 دالة سحرية لملء قائمة خيارات الولايات تلقائياً في أي صفحة
function fillWilayaDropdown() {
    let wilayaSelect = document.getElementById("wilaya");
    
    // إذا لم يكن عنصر الـ select موجوداً في هذه الصفحة الحالية، نتوقف لكي لا يحدث خطأ
    if (!wilayaSelect) return; 

    // مسح الخيارات القديمة والإبقاء على الخيار الافتراضي الأول فقط
    wilayaSelect.innerHTML = '<option value="">-- Select Wilaya --</option>';

    // دوران يمر على كل الولايات ويصنع لها وسم <option> داخل القائمة
    algeriaWilayas.forEach(wilaya => {
        let option = document.createElement("option");
        option.value = wilaya; 
        option.innerText = wilaya; 
        wilayaSelect.appendChild(option);
    });
}

// 🚀 دالة window.onload المحدثة والمقاومة للأخطاء النصوص
window.onload = function() {

    // 1️⃣ أولاً: ملء قائمة الولايات الـ 58 ديناميكياً لكي تصبح الخيارات موجودة في الصفحة
    fillWilayaDropdown();

    // 2️⃣ ثانياً: استرجاع البيانات الممررة من صفحة الأماكن
    let place = localStorage.getItem("selectedPlace");
    let wilaya = localStorage.getItem("selectedWilaya"); 
    let type = localStorage.getItem("selectedType");

    // تعبئة حقل اسم المكان تلقائياً
    if (place) {
        document.getElementById("place").value = place;
    }

    // ✨ التحديد التلقائي الذكي والمرن للولاية داخل القائمة المنسدلة
    if (wilaya) {
        let wilayaSelect = document.getElementById("wilaya");
        
        // تحويل الولاية القادمة لأحرف صغيرة ونزع أي مسافات زائدة
        let cleanWilaya = wilaya.trim().toLowerCase();

        // دوران يمر على كل ولاية في القائمة ويقارنها بشكل مرن جداً
        for (let i = 0; i < wilayaSelect.options.length; i++) {
            let optionValue = wilayaSelect.options[i].value.toLowerCase();
            
            // إذا كانت القائمة تحتوي على اسم الولاية (مثلاً "19-sétif" تحتوي على "setif" أو "sétif")
            if (optionValue.includes(cleanWilaya) || cleanWilaya.includes(optionValue)) {
                wilayaSelect.selectedIndex = i; // اختيار الولاية تلقائياً!
                break;
            }
        }
    }

    // تعبئة نوع الرحلة وإنشاء قائمة المستلزمات (Checklist)
    if (type) {
        document.getElementById("type").value = type;
        generateChecklist(type);
    }

    // تنظيف الـ localStorage لكي لا تختلط البيانات لاحقاً
    localStorage.removeItem("selectedPlace");
    localStorage.removeItem("selectedWilaya");
    localStorage.removeItem("selectedType");
};

function rate(n){
    alert("You rated " + n + " stars ⭐");
}


// 1️⃣ دالة فتح النافذة المنبثقة للأماكن (تعمل مع كل الجبال، البحار، والأنهار)
function openPopup(name, wilaya, desc, safety) {
    // إظهار الـ Popup
    document.getElementById("popup").style.display = "flex";

    // تحديد نوع الرحلة تلقائياً بذكاء من خلال البحث عن الكارت الذي يحتوي على هذا الاسم!
    let type = "Mountain"; // القيمة الافتراضية
    const allCards = document.querySelectorAll('.card');
    for (let card of allCards) {
        if (card.querySelector('h3').innerText.trim().toLowerCase() === name.toLowerCase()) {
            type = card.getAttribute('data-type'); // يأخذ Mountain أو Sea أو river تلقائياً
            break;
        }
    }

    // بناء محتوى الـ Popup ديناميكياً وتمرير البيانات لدالة addToTrip
    document.getElementById("content").innerHTML = `
        <h2>${name}</h2>
        <p><strong>Location:</strong> ${wilaya}</p>
        <p>${desc}</p>
        <p><strong>Safety Rate:</strong> ${safety}</p>
        <br>
        <button class="btn" style="background-color: #e67e22; color: white;" 
                onclick="addToTrip('${name}', '${wilaya}', '${type}')">
            ➕ Add to Trip
        </button>
    `;
}

// 2️⃣ دالة غلق الـ Popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// 3️⃣ دالة حفظ البيانات والانتقال لصفحة إنشاء الرحلة
function addToTrip(name, wilaya, type) {
    localStorage.setItem("selectedPlace", name);
    localStorage.setItem("selectedWilaya", wilaya);
    localStorage.setItem("selectedType", type);

    window.location.href = "trip.html";
}

// 4️⃣ دالة window.onload الذكية والمصلحة تماماً في صفحة trip.html
window.onload = function() {
    // ملء قائمة الولايات الـ 58 أولاً
    if (typeof fillWilayaDropdown === "function") {
        fillWilayaDropdown();
    }

    let place = localStorage.getItem("selectedPlace");
    let wilaya = localStorage.getItem("selectedWilaya"); 
    let type = localStorage.getItem("selectedType");

    if (place) {
        let placeInput = document.getElementById("place");
        if (placeInput) placeInput.value = place;
    }

    // ✨ التحديد التلقائي السحري والمرن للولاية القادمة
    if (wilaya) {
        let wilayaSelect = document.getElementById("wilaya");
        if (wilayaSelect) {
            let cleanWilaya = wilaya.trim().toLowerCase();

            for (let i = 0; i < wilayaSelect.options.length; i++) {
                let optionValue = wilayaSelect.options[i].value.toLowerCase();
                
                // مقارنة مرنة: إذا كانت "19-sétif" تحتوي على "setif" أو العكس
                if (optionValue.includes(cleanWilaya) || cleanWilaya.includes(optionValue)) {
                    wilayaSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    // اختيار نوع الرحلة وتوليد الـ Checklist تلقائياً
    if (type) {
        let typeSelect = document.getElementById("type");
        if (typeSelect) {
            // معالجة حالة الحروف الصغيرة لـ river في الـ HTML لتطابق الـ Select
            if (type.toLowerCase() === "river") type = "River"; 
            
            typeSelect.value = type;
            if (typeof generateChecklist === "function") {
                generateChecklist(type);
            }
        }
    }

    // تنظيف الذاكرة
    localStorage.removeItem("selectedPlace");
    localStorage.removeItem("selectedWilaya");
    localStorage.removeItem("selectedType");
};