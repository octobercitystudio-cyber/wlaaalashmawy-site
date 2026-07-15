<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم | وليد العشماوي</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
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
                    <h6 class="text-light mt-3 mb-2 px-3 fw-bold" style="opacity: 0.6;">إدارة المحتوى (الصفحات)</h6>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('articles')">المقالات</a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('services')">الخدمات</a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('sectors')">القطاعات</a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('features')">المميزات (لماذا تختارنا)</a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('stats')">الإحصائيات</a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('testimonials')">آراء العملاء</a>
                    </li>

                    <h6 class="text-light mt-4 mb-2 px-3 fw-bold" style="opacity: 0.6;">الإعدادات العامة</h6>
                    <li class="nav-item mb-1">
                        <a class="nav-link active" onclick="switchTab('settings')">إعدادات ونصوص الموقع</a>
                    </li>
                    <li class="nav-item mb-1">
                        <a class="nav-link" onclick="switchTab('media')">مكتبة الصور</a>
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

                <!-- Media Library Section -->
                <div id="sec-media" class="section-container">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>مكتبة الصور</h2>
                        <div>
                            <input type="file" id="media-upload-input" style="display: none;" accept="image/*" onchange="handleMediaUpload(this)">
                            <button class="btn btn-gold" onclick="document.getElementById('media-upload-input').click()">+ رفع صورة جديدة</button>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <div id="media-gallery" class="row g-3">
                                <!-- Media items will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Settings Section -->
                <div id="sec-settings" class="section-container active">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>إعدادات ونصوص الموقع</h2>
                        <button class="btn btn-gold" onclick="saveSettings()">حفظ الإعدادات</button>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <form id="settings-form">
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">نبذة عن الشركة (في الصفحة الرئيسية)</label>
                                    <textarea class="form-control tinymce-settings" id="setting_about_short" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">عن الشركة (في صفحة من نحن)</label>
                                    <textarea class="form-control tinymce-settings" id="setting_about_full" rows="6"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">الرؤية</label>
                                    <textarea class="form-control tinymce-settings" id="setting_vision" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">الرسالة</label>
                                    <textarea class="form-control tinymce-settings" id="setting_mission" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">رقم الهاتف الأساسي</label>
                                    <input type="text" class="form-control" id="setting_contact_phone" dir="ltr" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">رقم الواتساب</label>
                                    <input type="text" class="form-control" id="setting_contact_whatsapp" dir="ltr" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">البريد الإلكتروني</label>
                                    <input type="email" class="form-control" id="setting_contact_email" dir="ltr" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">العنوان</label>
                                    <input type="text" class="form-control" id="setting_contact_address" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">رابط الفيسبوك</label>
                                    <input type="text" class="form-control" id="setting_social_facebook" dir="ltr" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-gold fw-bold">رابط لينكد إن</label>
                                    <input type="text" class="form-control" id="setting_social_linkedin" dir="ltr" />
                                </div>
                            </form>
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
                        <div class="input-group">
                            <input type="text" class="form-control" id="item-image" value="/images/placeholder.jpg">
                            <button class="btn btn-outline-secondary" type="button" onclick="openMediaPicker('item-image')">اختر صورة</button>
                        </div>
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

    <!-- Media Picker Modal -->
    <div class="modal fade" id="mediaPickerModal" tabindex="-1" style="z-index: 1060;">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">اختر صورة من المكتبة</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="media-picker-gallery" class="row g-3">
                        <div class="col-12 text-center">جاري التحميل...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        const API_URL = '/api';
        let dataStore = { articles: [], services: [], sectors: [], features: [], stats: [], testimonials: [] };
        let modal;
        let mediaPickerModal;
        let mediaPickerTargetInputId = null;
        let tinyMcePickerCallback = null;

        document.addEventListener('DOMContentLoaded', () => {
            modal = new bootstrap.Modal(document.getElementById('genericModal'));
            mediaPickerModal = new bootstrap.Modal(document.getElementById('mediaPickerModal'));
            if(localStorage.getItem('token')) {
                showDashboard();
            }
            
            const tinymceOptions = {
                height: 400,
                directionality: 'rtl',
                plugins: 'advlist autolink lists link image media charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime table',
                toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat',
                images_upload_url: '/api/upload.php',
                automatic_uploads: true,
                content_style: "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'); body { font-family: 'Cairo', sans-serif; font-size: 1.1rem; line-height: 1.8; color: #333; }",
                file_picker_types: 'image media',
                file_picker_callback: function (callback, value, meta) {
                    tinyMcePickerCallback = callback;
                    openMediaPicker(null, true);
                },
                setup: function (editor) {
                    editor.on('change', function () {
                        editor.save();
                    });
                }
            };
            
            tinymce.init({ ...tinymceOptions, selector: '#item-content' });
            tinymce.init({ ...tinymceOptions, selector: '.tinymce-settings', height: 250 });
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

        function switchTab(tabId) {
            document.querySelectorAll('.section-container').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            
            document.getElementById('sec-' + tabId).classList.add('active');
            if(tabId === 'media') loadMedia();
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
            try {
                const res = await fetch(`${API_URL}/settings.php`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                const settings = await res.json();
                for(let key in settings) {
                    const el = document.getElementById(`setting_${key}`);
                    if(el) el.value = settings[key];
                }
            } catch(e) { console.error('Error loading settings', e); }
        }

        async function saveSettings() {
            let data = {};
            // The settings form uses specific IDs mapped to setting keys
            const keys = ['hero_title', 'hero_subtitle', 'about_short', 'about_full', 'vision', 'mission', 'contact_phone', 'contact_whatsapp', 'contact_email', 'contact_address', 'social_facebook', 'social_linkedin'];
            keys.forEach(k => {
                const el = document.getElementById(`setting_${k}`);
                if(el) data[k] = el.value;
            });
            
            try {
                const res = await fetch(API_URL + '/settings.php', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(data)
                });
                if(res.ok) {
                    alert('تم حفظ الإعدادات بنجاح!');
                } else {
                    alert('حدث خطأ أثناء الحفظ');
                }
            } catch(e) { alert('خطأ في الاتصال'); }
        }

        async function loadMedia() {
            const gallery = document.getElementById('media-gallery');
            gallery.innerHTML = '<div class="col-12 text-center">جاري التحميل...</div>';
            try {
                const res = await fetch(`${API_URL}/media.php`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                const files = await res.json();
                gallery.innerHTML = '';
                if(files.length === 0) {
                    gallery.innerHTML = '<div class="col-12 text-center text-muted">لا توجد صور مرفوعة بعد.</div>';
                    return;
                }
                files.forEach(file => {
                    gallery.innerHTML += `
                        <div class="col-md-3 col-sm-4 col-6">
                            <div class="card h-100">
                                <img src="${file.url}" class="card-img-top" alt="${file.name}" style="height: 150px; object-fit: cover;">
                                <div class="card-body p-2 text-center">
                                    <small class="d-block text-truncate mb-2" title="${file.name}">${file.name}</small>
                                    <button class="btn btn-sm btn-outline-primary w-100 mb-1" onclick="copyToClipboard('${file.url}')">نسخ الرابط</button>
                                    <button class="btn btn-sm btn-outline-danger w-100" onclick="deleteMedia('${file.name}')">حذف</button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } catch(e) { console.error('Error loading media', e); }
        }

        async function openMediaPicker(targetId, isTinyMCE = false) {
            mediaPickerTargetInputId = targetId;
            mediaPickerModal.show();
            
            const gallery = document.getElementById('media-picker-gallery');
            gallery.innerHTML = '<div class="col-12 text-center">جاري التحميل...</div>';
            try {
                const res = await fetch(`${API_URL}/media.php`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                const files = await res.json();
                gallery.innerHTML = '';
                if(files.length === 0) {
                    gallery.innerHTML = '<div class="col-12 text-center text-muted">لا توجد صور مرفوعة بعد. ارفع صورة أولاً من قسم مكتبة الصور.</div>';
                    return;
                }
                files.forEach(file => {
                    gallery.innerHTML += `
                        <div class="col-md-2 col-sm-3 col-4">
                            <div class="card h-100" style="cursor: pointer;" onclick="selectMediaForPicker('${file.url}', ${isTinyMCE})">
                                <img src="${file.url}" class="card-img-top" alt="${file.name}" style="height: 100px; object-fit: cover;">
                            </div>
                        </div>
                    `;
                });
            } catch(e) { console.error('Error loading media', e); }
        }

        function selectMediaForPicker(url, isTinyMCE) {
            if(isTinyMCE && tinyMcePickerCallback) {
                tinyMcePickerCallback(url, { alt: 'صورة' });
                tinyMcePickerCallback = null;
            } else if(mediaPickerTargetInputId) {
                document.getElementById(mediaPickerTargetInputId).value = url;
            }
            mediaPickerModal.hide();
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => alert('تم نسخ الرابط!'));
        }

        async function deleteMedia(filename) {
            if(!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
            try {
                await fetch(`${API_URL}/media.php?file=${encodeURIComponent(filename)}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                loadMedia();
            } catch(e) { alert('خطأ في الحذف'); }
        }

        async function handleMediaUpload(input) {
            if(!input.files || input.files.length === 0) return;
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);
            
            try {
                const res = await fetch(`${API_URL}/upload.php`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: formData
                });
                const data = await res.json();
                if(data.success) {
                    alert('تم الرفع بنجاح!');
                    loadMedia();
                } else {
                    alert(data.error || 'خطأ في الرفع');
                }
            } catch(e) {
                alert('خطأ في الرفع');
            }
            input.value = '';
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
            document.getElementById('item-icon').value = '';
            
            if(tinymce.get('item-content')) tinymce.get('item-content').setContent('');
            document.getElementById('item-content').value = '';
            
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
                if(tinymce.get('item-content')) tinymce.get('item-content').setContent(item.content || '');
                document.getElementById('item-content').value = item.content || '';
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
            
            tinymce.triggerSave(); // Ensure all textareas have latest content from TinyMCE
            
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
