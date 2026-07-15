<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم | وليد العشماوي</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; }
        .sidebar { background: #005bab; color: white; min-height: 100vh; padding: 20px; }
        .card { border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 12px; }
        .btn-gold { background: #d4af37; color: white; border: none; }
        .btn-gold:hover { background: #b5952f; color: white; }
        #login-screen { display: flex; align-items: center; justify-content: center; height: 100vh; }
        .nav-link { cursor: pointer; color: white !important; opacity: 0.8; }
        .nav-link.active { opacity: 1; font-weight: bold; background: rgba(255,255,255,0.1); border-radius: 8px; }
        .section-container { display: none; }
        .section-container.active { display: block; }
    </style>
</head>
<body>

    <!-- Login Screen -->
    <div id="login-screen" class="container">
        <div class="card p-5" style="width: 400px; max-width: 100%;">
            <h3 class="text-center mb-4" style="color: #005bab;">تسجيل الدخول</h3>
            <div class="mb-3">
                <input type="password" id="password" class="form-control" placeholder="كلمة المرور">
            </div>
            <button onclick="login()" class="btn btn-gold w-100">دخول</button>
            <div id="login-error" class="text-danger mt-2 text-center" style="display:none;"></div>
        </div>
    </div>

    <!-- Dashboard Screen -->
    <div id="dashboard-screen" class="container-fluid" style="display: none;">
        <div class="row">
            <div class="col-md-2 sidebar">
                <h4 class="mb-4 text-warning text-center">اللوحة الإدارية</h4>
                <ul class="nav flex-column">
                    <li class="nav-item mb-2">
                        <a class="nav-link active" onclick="switchTab('settings')">إعدادات الموقع الأساسية</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('about')">صفحة "من نحن"</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('contact')">صفحة "تواصل معنا"</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('articles')">المقالات</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('services')">الخدمات</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('sectors')">القطاعات</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('features')">لماذا تختارنا (المميزات)</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('stats')">الإحصائيات</a>
                    </li>
                    <li class="nav-item mb-2">
                        <a class="nav-link" onclick="switchTab('testimonials')">آراء العملاء</a>
                    </li>
                    
                    <hr class="border-light opacity-50 my-4">
                    <li class="nav-item mb-2">
                        <button class="btn btn-success w-100 mb-2" onclick="deploySite()">🚀 نشر التعديلات للموقع</button>
                    </li>
                    <li class="nav-item mt-auto">
                        <a class="nav-link text-center text-danger" onclick="logout()">تسجيل الخروج</a>
                    </li>
                </ul>
            </div>
            
            <div class="col-md-10 p-5">
                
                <!-- Settings Section -->
                <div id="sec-settings" class="section-container active">
                    <h2>إعدادات الموقع الأساسية</h2>
                    <div class="card mt-4">
                        <div class="card-body">
                            <form id="settings-form">
                                <div class="mb-3">
                                    <label>عنوان الصفحة الرئيسية</label>
                                    <input type="text" class="form-control" id="set-hero-title" name="hero_title">
                                </div>
                                <div class="mb-3">
                                    <label>نص الصفحة الرئيسية الفرعي</label>
                                    <textarea class="form-control" id="set-hero-sub" name="hero_subtitle" rows="3"></textarea>
                                </div>
                                <button type="button" class="btn btn-gold mt-3" onclick="saveSettings()">حفظ الإعدادات</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- About Us Section -->
                <div id="sec-about" class="section-container">
                    <h2>إدارة صفحة "من نحن"</h2>
                    <div class="card mt-4">
                        <div class="card-body">
                            <form id="about-form">
                                <div class="mb-3">
                                    <label>نص "من نحن" المختصر (يظهر في الرئيسية)</label>
                                    <textarea class="form-control" id="set-about-short" name="about_short" rows="4"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label>نص "من نحن" الكامل (يظهر في صفحة من نحن)</label>
                                    <textarea class="form-control" id="set-about-full" name="about_full" rows="6"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label>الرؤية</label>
                                    <textarea class="form-control" id="set-vision" name="vision" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label>الرسالة</label>
                                    <textarea class="form-control" id="set-mission" name="mission" rows="3"></textarea>
                                </div>
                                <button type="button" class="btn btn-gold mt-3" onclick="saveSettings()">حفظ صفحة من نحن</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Contact Us Section -->
                <div id="sec-contact" class="section-container">
                    <h2>إدارة صفحة "تواصل معنا"</h2>
                    <div class="card mt-4">
                        <div class="card-body">
                            <form id="contact-form">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label>رقم الهاتف الأساسي</label>
                                        <input type="text" class="form-control" id="set-phone" name="contact_phone">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>رقم الواتساب</label>
                                        <input type="text" class="form-control" id="set-whatsapp" name="contact_whatsapp">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>البريد الإلكتروني</label>
                                        <input type="email" class="form-control" id="set-email" name="contact_email">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>العنوان</label>
                                        <input type="text" class="form-control" id="set-address" name="contact_address">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>رابط الفيسبوك</label>
                                        <input type="text" class="form-control" id="set-facebook" name="social_facebook">
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label>رابط لينكد إن</label>
                                        <input type="text" class="form-control" id="set-linkedin" name="social_linkedin">
                                    </div>
                                </div>
                                <button type="button" class="btn btn-gold mt-3" onclick="saveSettings()">حفظ بيانات التواصل</button>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Articles Section -->
                <div id="sec-articles" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إدارة المقالات</h2>
                        <button class="btn btn-gold" onclick="showModal('article')">+ إضافة مقال</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead><tr><th>العنوان</th><th>القسم</th><th>الإجراءات</th></tr></thead>
                                <tbody id="articles-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Services Section -->
                <div id="sec-services" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إدارة الخدمات</h2>
                        <button class="btn btn-gold" onclick="showModal('service')">+ إضافة خدمة</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead><tr><th>اسم الخدمة</th><th>الوصف القصير</th><th>الإجراءات</th></tr></thead>
                                <tbody id="services-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Sectors Section -->
                <div id="sec-sectors" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إدارة القطاعات</h2>
                        <button class="btn btn-gold" onclick="showModal('sector')">+ إضافة قطاع</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead><tr><th>القطاع</th><th>الإجراءات</th></tr></thead>
                                <tbody id="sectors-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Features Section -->
                <div id="sec-features" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إدارة المميزات (لماذا تختارنا)</h2>
                        <button class="btn btn-gold" onclick="showModal('feature')">+ إضافة ميزة</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead><tr><th>العنوان</th><th>الوصف</th><th>الأيقونة</th><th>الإجراءات</th></tr></thead>
                                <tbody id="features-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Stats Section -->
                <div id="sec-stats" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إدارة الإحصائيات</h2>
                        <button class="btn btn-gold" onclick="showModal('stat')">+ إضافة إحصائية</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead><tr><th>العنوان</th><th>القيمة (الرقم)</th><th>الإجراءات</th></tr></thead>
                                <tbody id="stats-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Testimonials Section -->
                <div id="sec-testimonials" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إدارة آراء العملاء</h2>
                        <button class="btn btn-gold" onclick="showModal('testimonial')">+ إضافة رأي</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead><tr><th>الاسم</th><th>المنصب</th><th>الرأي</th><th>الإجراءات</th></tr></thead>
                                <tbody id="testimonials-table"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Generic Modal for Articles/Services/Sectors -->
    <div class="modal fade" id="genericModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">إضافة</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="item-id">
                    <input type="hidden" id="item-type">
                    
                    <div class="mb-3">
                        <label id="lbl-title">العنوان</label>
                        <input type="text" class="form-control" id="item-title">
                    </div>
                    
                    <div class="mb-3" id="div-category" style="display:none;">
                        <label>القسم</label>
                        <select class="form-control" id="item-category">
                            <option>الاستشارات المحاسبية</option>
                            <option>الاستشارات الضريبية</option>
                            <option>المراجعة والتدقيق</option>
                            <option>الاستشارات المالية</option>
                        </select>
                    </div>

                    <div class="mb-3" id="div-icon" style="display:none;">
                        <label>اسم الأيقونة (مثال: FileText, PieChart)</label>
                        <input type="text" class="form-control" id="item-icon">
                    </div>

                    <div class="mb-3" id="div-image" style="display:none;">
                        <label>رابط الصورة</label>
                        <input type="text" class="form-control" id="item-image" value="/images/placeholder.jpg">
                    </div>

                    <div class="mb-3" id="div-description" style="display:none;">
                        <label>وصف قصير</label>
                        <textarea class="form-control" id="item-description" rows="2"></textarea>
                    </div>

                    <div class="mb-3">
                        <label>المحتوى التفصيلي</label>
                        <textarea class="form-control" id="item-content" rows="6"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                    <button type="button" class="btn btn-gold" onclick="saveItem()">حفظ</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const API_URL = '/api';
        let dataStore = { articles: [], services: [], sectors: [], features: [], stats: [], testimonials: [] };
        let modal;

        document.addEventListener('DOMContentLoaded', () => {
            modal = new bootstrap.Modal(document.getElementById('genericModal'));
            if(localStorage.getItem('token')) {
                showDashboard();
            }
        });

        function showDashboard() {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('dashboard-screen').style.display = 'block';
            loadAllData();
        }

        async function login() {
            const pwd = document.getElementById('password').value;
            try {
                const res = await fetch(API_URL + '/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: pwd })
                });
                const data = await res.json();
                if(data.token) {
                    localStorage.setItem('token', data.token);
                    showDashboard();
                } else {
                    document.getElementById('login-error').innerText = data.error || 'خطأ في الدخول';
                    document.getElementById('login-error').style.display = 'block';
                }
            } catch(e) {
                alert('فشل الاتصال بالسيرفر');
            }
        }

        function logout() {
            localStorage.removeItem('token');
            location.reload();
        }

        function switchTab(tabName) {
            document.querySelectorAll('.section-container').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            
            document.getElementById('sec-' + tabName).classList.add('active');
            event.target.classList.add('active');
        }

        async function loadAllData() {
            loadSettings();
            loadItems('articles');
            loadItems('services');
            loadItems('sectors');
            loadItems('features');
            loadItems('stats');
            loadItems('testimonials');
        }

        async function loadSettings() {
            const res = await fetch(API_URL + '/settings.php');
            const settings = await res.json();
            for(let key in settings) {
                const el = document.querySelector(`[name="${key}"]`);
                if(el) el.value = settings[key];
            }
        }

        async function saveSettings() {
            const formData1 = new FormData(document.getElementById('settings-form'));
            const formData2 = new FormData(document.getElementById('about-form'));
            const formData3 = new FormData(document.getElementById('contact-form'));
            
            let data = {};
            for(let [k,v] of formData1.entries()) data[k] = v;
            for(let [k,v] of formData2.entries()) data[k] = v;
            for(let [k,v] of formData3.entries()) data[k] = v;
            
            try {
                const res = await fetch(API_URL + '/settings.php', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(data)
                });
                if(res.ok) alert('تم حفظ الإعدادات بنجاح!');
                else alert('حدث خطأ أثناء الحفظ');
            } catch(e) { alert('خطأ في الاتصال'); }
        }

        async function loadItems(type) {
            const res = await fetch(`${API_URL}/${type}.php`);
            dataStore[type] = await res.json();
            renderTable(type);
        }

        function renderTable(type) {
            const tbody = document.getElementById(`${type}-table`);
            tbody.innerHTML = '';
            dataStore[type].forEach(item => {
                let columns = '';
                if(type === 'articles') {
                    columns = `<td>${item.title}</td><td><span class="badge bg-secondary">${item.category}</span></td>`;
                } else if(type === 'services') {
                    columns = `<td>${item.title}</td><td>${item.description ? item.description.substring(0,30) : ''}...</td>`;
                } else if(type === 'sectors') {
                    columns = `<td>${item.title}</td>`;
                } else if(type === 'features') {
                    columns = `<td>${item.title}</td><td>${item.description ? item.description.substring(0,30) : ''}...</td><td>${item.icon}</td>`;
                } else if(type === 'stats') {
                    columns = `<td>${item.title}</td><td>${item.value}</td>`;
                } else if(type === 'testimonials') {
                    columns = `<td>${item.name}</td><td>${item.position}</td><td>${item.content ? item.content.substring(0,30) : ''}...</td>`;
                }

                tbody.innerHTML += `
                    <tr>
                        ${columns}
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editItem('${type}', ${item.id})">تعديل</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteItem('${type}', ${item.id})">حذف</button>
                        </td>
                    </tr>
                `;
            });
        }

        function showModal(type) {
            document.getElementById('item-id').value = '';
            document.getElementById('item-type').value = type;
            document.getElementById('item-title').value = '';
            document.getElementById('item-content').value = '';
            document.getElementById('item-icon').value = '';
            
            document.getElementById('div-category').style.display = type === 'article' ? 'block' : 'none';
            document.getElementById('div-image').style.display = (type === 'article' || type === 'sector' || type === 'service') ? 'block' : 'none';
            document.getElementById('div-description').style.display = (type === 'service' || type === 'sector' || type === 'feature') ? 'block' : 'none';
            document.getElementById('div-icon').style.display = type === 'feature' ? 'block' : 'none';
            
            let t = 'إضافة ';
            if(type==='article') t+='مقال';
            else if(type==='service') t+='خدمة';
            else if(type==='sector') t+='قطاع';
            else if(type==='feature') t+='ميزة';
            else if(type==='stat') {
                t+='إحصائية';
                document.getElementById('lbl-title').innerText = 'العنوان';
                document.getElementById('div-icon').style.display = 'block';
                document.getElementById('div-icon').querySelector('label').innerText = 'القيمة (الرقم)';
                document.getElementById('item-content').parentElement.style.display = 'none';
            }
            else if(type==='testimonial') {
                t+='رأي عميل';
                document.getElementById('lbl-title').innerText = 'اسم العميل';
                document.getElementById('div-icon').style.display = 'block';
                document.getElementById('div-icon').querySelector('label').innerText = 'المنصب';
                document.getElementById('item-content').parentElement.style.display = 'block';
                document.getElementById('item-content').parentElement.querySelector('label').innerText = 'نص الرأي';
            } else {
                document.getElementById('lbl-title').innerText = 'العنوان';
                document.getElementById('item-content').parentElement.style.display = 'block';
                document.getElementById('item-content').parentElement.querySelector('label').innerText = 'المحتوى التفصيلي';
                if(document.getElementById('div-icon').querySelector('label')) {
                    document.getElementById('div-icon').querySelector('label').innerText = 'اسم الأيقونة (مثال: FileText, PieChart)';
                }
            }
            
            document.getElementById('modalTitle').innerText = t;
            modal.show();
        }

        function editItem(typePlural, id) {
            const type = typePlural.slice(0, -1); // remove 's'
            const item = dataStore[typePlural].find(x => x.id == id);
            
            showModal(type);
            document.getElementById('item-id').value = item.id;
            
            if(type === 'stat') {
                document.getElementById('item-title').value = item.title;
                document.getElementById('item-icon').value = item.value;
            } else if(type === 'testimonial') {
                document.getElementById('item-title').value = item.name;
                document.getElementById('item-icon').value = item.position;
                document.getElementById('item-content').value = item.content;
            } else {
                document.getElementById('item-title').value = item.title;
                document.getElementById('item-content').value = item.content;
            }
            
            if(type === 'article') document.getElementById('item-category').value = item.category;
            if(type === 'article' || type === 'sector' || type === 'service') document.getElementById('item-image').value = item.image;
            if(type === 'service' || type === 'sector' || type === 'feature') document.getElementById('item-description').value = item.description;
            if(type === 'feature') document.getElementById('item-icon').value = item.icon;
            
            document.getElementById('modalTitle').innerText = 'تعديل';
        }

        async function saveItem() {
            const type = document.getElementById('item-type').value;
            const typePlural = type + 's';
            const id = document.getElementById('item-id').value;
            
            let data = { id: id };
            if(type === 'stat') {
                data.title = document.getElementById('item-title').value;
                data.value = document.getElementById('item-icon').value;
            } else if(type === 'testimonial') {
                data.name = document.getElementById('item-title').value;
                data.position = document.getElementById('item-icon').value;
                data.content = document.getElementById('item-content').value;
            } else {
                data.title = document.getElementById('item-title').value;
                data.content = document.getElementById('item-content').value;
            }
            
            if(type === 'article') data.category = document.getElementById('item-category').value;
            if(type === 'article' || type === 'sector' || type === 'service') data.image = document.getElementById('item-image').value;
            if(type === 'service' || type === 'sector' || type === 'feature') data.description = document.getElementById('item-description').value;
            if(type === 'feature') data.icon = document.getElementById('item-icon').value;
            
            const method = id ? 'PUT' : 'POST';
            
            await fetch(`${API_URL}/${typePlural}.php`, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            });
            
            modal.hide();
            loadItems(typePlural);
        }

        async function deleteItem(typePlural, id) {
            if(confirm('هل أنت متأكد من الحذف؟')) {
                await fetch(`${API_URL}/${typePlural}.php?id=${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                loadItems(typePlural);
            }
        }

        async function deploySite() {
            if(!confirm('هل أنت متأكد من رغبتك في تحديث الموقع ليعرض التعديلات الجديدة؟ (ستستغرق العملية حوالي دقيقتين)')) return;
            
            try {
                const res = await fetch(API_URL + '/deploy.php', {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                const data = await res.json();
                if(data.success) {
                    alert('✅ ' + data.message);
                } else {
                    alert('❌ ' + data.error);
                }
            } catch(e) {
                alert('فشل الاتصال بسيرفر النشر.');
            }
        }
    </script>
</body>
</html>
