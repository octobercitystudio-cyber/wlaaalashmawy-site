<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم | مكتب العشماوي</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Bootstrap 5 RTL -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <!-- Summernote -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.20/summernote-lite.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Amiri:wght@400;700&display=swap');
        
        body, .form-control, .form-label, .btn, .note-editable {
            font-family: 'Cairo', sans-serif !important;
        }
        
        /* Match frontend styling */
        .note-editable {
            background-color: #FAFAFA !important;
            color: #1A1A1A !important;
            font-size: 1.1rem !important;
            line-height: 1.6 !important;
        }
        .note-editable h1, .note-editable h2, .note-editable h3 {
            font-weight: 700;
            color: #005BAB; 
        }

        /* LTR styling for English fields */
        .summernote-settings-en + .note-editor .note-editable,
        #setting_hero_title_en, #setting_hero_subtitle_en, #setting_contact_address_en,
        #setting_seo_desc_en, #item-description_en, #item-content_en {
            direction: ltr !important;
            text-align: left !important;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        :root {
            --primary: #0f172a;
            --secondary: #1e293b;
            --accent: #d4af37;
            --accent-hover: #b5952f;
            --bg: #f1f5f9;
            --card-bg: rgba(255, 255, 255, 0.95);
        }

        body { 
            font-family: 'Cairo', sans-serif; 
            background: var(--bg); 
            color: #334155;
            overflow-x: hidden;
        }

        /* Glassmorphism Cards */
        .card { 
            border: none; 
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); 
            border-radius: 16px; 
            background: var(--card-bg);
            backdrop-filter: blur(10px);
        }
        
        .stat-icon {
            width: 48px; height: 48px; border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 24px; color: var(--accent); background: rgba(212, 175, 55, 0.1);
        }

        /* Sidebar */
        .sidebar { 
            background: var(--primary); 
            color: white; 
            min-height: 100vh; 
            padding: 20px 15px; 
            box-shadow: 4px 0 15px rgba(0,0,0,0.05);
            transition: all 0.3s;
            position: fixed;
            top: 0; right: 0; bottom: 0;
            width: 260px;
            z-index: 1000;
        }
        .main-content {
            margin-right: 260px;
            padding: 40px;
            min-height: 100vh;
            transition: all 0.3s;
        }
        
        @media (max-width: 768px) {
            .sidebar { transform: translateX(100%); }
            .sidebar.show { transform: translateX(0); }
            .main-content { margin-right: 0; padding: 20px; }
            .mobile-toggle { display: block !important; }
        }
        
        .mobile-toggle { display: none; background: var(--primary); color: white; border: none; padding: 10px 15px; border-radius: 8px; position: fixed; top: 15px; right: 15px; z-index: 1001; }

        .btn-gold { background: var(--accent); color: white; border: none; font-weight: 600; padding: 10px 24px; border-radius: 8px; transition: all 0.3s; }
        .btn-gold:hover { background: var(--accent-hover); color: white; }

        /* Login Screen */
        #login-screen { 
            display: flex; align-items: center; justify-content: center; height: 100vh; 
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }

        /* Navigation */
        .nav-link-sidebar { cursor: pointer; color: #94a3b8; padding: 12px 16px; border-radius: 10px; margin-bottom: 5px; font-weight: 600; display: flex; align-items: center; gap: 10px; transition: all 0.3s; text-decoration: none;}
        .nav-link-sidebar:hover { color: white; background: rgba(255,255,255,0.05); }
        .nav-link-sidebar.active { color: white; background: var(--accent); box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); }

        .section-container { display: none; animation: fadeIn 0.4s ease; }
        .section-container.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Inner Tabs */
        .nav-pills .nav-link { color: #64748b; font-weight: 600; border-radius: 8px; padding: 10px 20px; margin-left: 5px; margin-bottom: 10px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02); border: 1px solid #e2e8f0; cursor: pointer; }
        .nav-pills .nav-link.active { background-color: var(--primary); color: white; border-color: var(--primary); }
        .nav-pills .nav-link i { margin-left: 5px; }

        .inner-tab-content { display: none; animation: fadeIn 0.3s ease; }
        .inner-tab-content.active { display: block; }

        /* Tables */
        .table { vertical-align: middle; }
        .table thead th { border-bottom: 2px solid #e2e8f0; color: #64748b; font-weight: 600; font-size: 0.9rem; }
        .tox-notifications-container { display: none !important; }

        .toast-container { position: fixed; bottom: 20px; left: 20px; z-index: 1055; }
        .toast { background: var(--primary); color: white; border: none; border-radius: 10px; }

        .dynamic-list-item { display: flex; gap: 10px; margin-bottom: 10px; }
    </style>
</head>
<body>

    <!-- Toast Notifications -->
    <div class="toast-container">
        <div id="liveToast" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
            <div class="d-flex">
                <div class="toast-body fw-bold" id="toastMessage">تمت العملية بنجاح.</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>

    <!-- Mobile Toggle -->
    <button class="mobile-toggle" onclick="document.querySelector('.sidebar').classList.toggle('show')"><i class="bi bi-list fs-4"></i></button>

    <!-- Login Screen -->
    <div id="login-screen">
        <div class="card p-4" style="width: 420px; max-width: 90%;">
            <div class="text-center mb-4">
                <div style="width: 70px; height: 70px; background: var(--primary); color: var(--accent); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 15px;"><i class="bi bi-shield-lock-fill"></i></div>
                <h3 class="fw-bold" style="color: var(--primary);">تسجيل الدخول</h3>
            </div>
            <div class="mb-3">
                <label class="form-label text-muted fw-bold">اسم المستخدم</label>
                <input type="text" id="username" class="form-control form-control-lg bg-light border-0" style="border-radius: 10px;" autocomplete="username">
            </div>
            <div class="mb-4">
                <label class="form-label text-muted fw-bold">كلمة المرور</label>
                <input type="password" id="password" class="form-control form-control-lg bg-light border-0" style="border-radius: 10px;" autocomplete="current-password" onkeydown="if(event.key === 'Enter') login()">
            </div>
            <button onclick="login()" class="btn btn-gold w-100 btn-lg">دخول</button>
            <div id="login-error" class="text-danger mt-3 text-center fw-bold" style="display:none;"></div>
            <button type="button" class="btn btn-link w-100 mt-2 text-decoration-none" onclick="togglePasswordReset()">نسيت كلمة المرور؟</button>
            <div id="password-reset-panel" class="mt-2 pt-3 border-top" style="display:none;">
                <p class="small text-muted text-center mb-3">سيتم إرسال رمز تحقق إلى بريد الاستعادة المسجل.</p>
                <div id="reset-request-stage">
                    <button type="button" id="send-reset-code" class="btn btn-outline-primary w-100" onclick="requestPasswordReset()">إرسال رمز التحقق</button>
                </div>
                <div id="reset-verify-stage" style="display:none;">
                    <div class="mb-3">
                        <label class="form-label text-muted fw-bold">رمز التحقق</label>
                        <input type="text" id="reset-code" class="form-control bg-light border-0 text-center" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" dir="ltr" placeholder="000000">
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted fw-bold">كلمة المرور الجديدة</label>
                        <input type="password" id="reset-password" class="form-control bg-light border-0" minlength="12" maxlength="4096" autocomplete="new-password" dir="ltr" placeholder="12 حرفًا على الأقل">
                    </div>
                    <div class="mb-3">
                        <label class="form-label text-muted fw-bold">تأكيد كلمة المرور</label>
                        <input type="password" id="reset-password-confirm" class="form-control bg-light border-0" minlength="12" maxlength="4096" autocomplete="new-password" dir="ltr">
                    </div>
                    <button type="button" id="complete-reset" class="btn btn-gold w-100" onclick="completePasswordReset()">تغيير كلمة المرور</button>
                    <button type="button" class="btn btn-link w-100 btn-sm text-decoration-none" onclick="requestPasswordReset()">إرسال رمز جديد</button>
                </div>
                <div id="reset-message" class="mt-3 text-center fw-bold" role="status" style="display:none;"></div>
            </div>
        </div>
    </div>

    <!-- Dashboard Screen -->
    <div id="dashboard-screen" style="display: none;">
        <!-- Sidebar -->
        <div class="sidebar d-flex flex-column">
            <div class="text-center mb-4 mt-2">
                <h2 class="text-white fw-bold mb-0" style="letter-spacing: 2px;">AFC</h2>
                <small class="text-muted" style="color: var(--accent) !important;">إدارة الموقع</small>
            </div>
            
            <ul class="nav flex-column mb-auto">
                <li class="nav-item"><a class="nav-link-sidebar active" onclick="switchMainTab('overview')"><i class="bi bi-graph-up"></i> نظرة عامة</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('visual-editor')"><i class="bi bi-magic"></i> المحرر المرئي (Live Edit)</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('home')"><i class="bi bi-house-door-fill"></i> الرئيسية</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('about')"><i class="bi bi-info-circle-fill"></i> من نحن</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('services')"><i class="bi bi-briefcase-fill"></i> الخدمات</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('sectors')"><i class="bi bi-buildings-fill"></i> القطاعات</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('articles')"><i class="bi bi-journal-text"></i> المدونة والمقالات</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('contact')"><i class="bi bi-telephone-fill"></i> اتصل بنا</a></li>
                <hr class="border-secondary my-2">
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('media')"><i class="bi bi-images"></i> مكتبة الصور</a></li>
                <li class="nav-item"><a class="nav-link-sidebar" onclick="switchMainTab('settings')"><i class="bi bi-gear-fill"></i> الإعدادات</a></li>
            </ul>
            
            <a class="nav-link-sidebar text-danger mt-3" onclick="logout()"><i class="bi bi-box-arrow-right"></i> تسجيل الخروج</a>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            
            <!-- VISUAL EDITOR SECTION -->
            <div id="sec-visual-editor" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold mb-0">المحرر المرئي</h2>
                    <button class="btn btn-primary" onclick="openVisualEditorInNewTab()"><i class="bi bi-box-arrow-up-right"></i> فتح في نافذة جديدة</button>
                </div>
                <div class="card p-0" style="height: calc(100vh - 150px); overflow: hidden; border: 2px solid var(--accent);">
                    <iframe id="visual-editor-iframe" src="about:blank" style="width: 100%; height: 100%; border: none;"></iframe>
                </div>
            </div>

            <!-- OVERVIEW SECTION -->
            <div id="sec-overview" class="section-container active">
                <h2 class="fw-bold mb-4">نظرة عامة</h2>
                <div class="row g-4 mb-4">
                    <div class="col-md-3"><div class="card p-4 h-100"><p class="text-muted mb-1 fw-bold">إجمالي الزيارات</p><h3 class="fw-bold mb-0 text-primary" id="stat-total-visits">--</h3></div></div>
                    <div class="col-md-3"><div class="card p-4 h-100"><p class="text-muted mb-1 fw-bold">الزوار الحقيقيين (IPs)</p><h3 class="fw-bold mb-0 text-success" id="stat-unique-visitors">--</h3></div></div>
                    <div class="col-md-3"><div class="card p-4 h-100"><p class="text-muted mb-1 fw-bold">زيارات اليوم</p><h3 class="fw-bold mb-0 text-warning" id="stat-visits-today">--</h3></div></div>
                    <div class="col-md-3"><div class="card p-4 h-100"><p class="text-muted mb-1 fw-bold">إجمالي المقالات</p><h3 class="fw-bold mb-0" id="stat-articles">--</h3></div></div>
                </div>
                <div class="row g-4 mb-4">
                    <div class="col-12">
                        <div class="card p-4">
                            <h5 class="fw-bold mb-4">أداء الزيارات (آخر 30 يوم)</h5>
                            <div style="position: relative; height: 350px; width: 100%;">
                                <canvas id="visitsChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card p-4">
                    <h5 class="fw-bold mb-4">تفاصيل زيارات كل صفحة</h5>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>الصفحة / الرابط</th>
                                <th>إجمالي الزيارات (مرات الفتح)</th>
                                <th>الزوار الحقيقيين (IPs فريدة)</th>
                            </tr>
                        </thead>
                        <tbody id="detailed-pages-list">
                            <tr><td colspan="3" class="text-center">جاري التحميل...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- HOME SECTION -->
            <div id="sec-home" class="section-container">
                <h2 class="fw-bold mb-4">الرئيسية</h2>
                <ul class="nav nav-pills mb-4">
                    <li class="nav-item"><a class="nav-link active" onclick="switchInnerTab('home', 'hero')"><i class="bi bi-card-heading"></i> القسم الترحيبي (Hero)</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('home', 'features')"><i class="bi bi-star-fill"></i> المميزات</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('home', 'stats')"><i class="bi bi-bar-chart-fill"></i> أرقام النجاح</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('home', 'testimonials')"><i class="bi bi-chat-quote-fill"></i> آراء العملاء</a></li>
                </ul>

                <div id="home-hero" class="inner-tab-content active">
                    <div class="card p-4">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="fw-bold mb-0">نصوص القسم الترحيبي (أعلى الموقع)</h5>
                            <button class="btn btn-gold" onclick="saveSettingsGroup(['hero_title', 'hero_subtitle', 'about_short', 'hero_title_en', 'hero_subtitle_en', 'about_short_en'])">حفظ التعديلات</button>
                        </div>
                        <div class="row g-3 mb-3"><div class="col-md-6"><label class="form-label fw-bold">العنوان الرئيسي (عربي)</label><input type="text" class="form-control" id="setting_hero_title"></div><div class="col-md-6"><label class="form-label fw-bold">العنوان الرئيسي (English)</label><input type="text" class="form-control" id="setting_hero_title_en" dir="ltr"></div></div>
                        <div class="row g-3 mb-3"><div class="col-md-6"><label class="form-label fw-bold">العنوان الفرعي (عربي)</label><input type="text" class="form-control" id="setting_hero_subtitle"></div><div class="col-md-6"><label class="form-label fw-bold">العنوان الفرعي (English)</label><input type="text" class="form-control" id="setting_hero_subtitle_en" dir="ltr"></div></div>
                        <div class="row g-3 mb-3"><div class="col-md-6"><label class="form-label fw-bold">نبذة مختصرة (عربي)</label><textarea class="form-control summernote-settings" id="setting_about_short"></textarea></div><div class="col-md-6"><label class="form-label fw-bold">نبذة مختصرة (English)</label><textarea class="form-control summernote-settings-en" id="setting_about_short_en"></textarea></div></div>
                    </div>
                </div>

                <div id="home-features" class="inner-tab-content">
                    <div class="card p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="fw-bold mb-0">المميزات التنافسية</h5>
                            <button class="btn btn-gold btn-sm" onclick="showModal('feature')"><i class="bi bi-plus"></i> إضافة ميزة</button>
                        </div>
                        <table class="table"><tbody id="features-table"></tbody></table>
                    </div>
                </div>

                <div id="home-stats" class="inner-tab-content">
                    <div class="card p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="fw-bold mb-0">أرقام وإحصائيات النجاح</h5>
                            <button class="btn btn-gold btn-sm" onclick="showModal('stat')"><i class="bi bi-plus"></i> إضافة رقم</button>
                        </div>
                        <table class="table"><tbody id="stats-table"></tbody></table>
                    </div>
                </div>

                <div id="home-testimonials" class="inner-tab-content">
                    <div class="card p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="fw-bold mb-0">آراء العملاء</h5>
                            <button class="btn btn-gold btn-sm" onclick="showModal('testimonial')"><i class="bi bi-plus"></i> إضافة رأي</button>
                        </div>
                        <table class="table"><tbody id="testimonials-table"></tbody></table>
                    </div>
                </div>
            </div>

            <!-- ABOUT SECTION -->
            <div id="sec-about" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">من نحن</h2>
                    <button class="btn btn-gold" onclick="saveSettingsGroup(['about_full', 'vision', 'mission', 'about_full_en', 'vision_en', 'mission_en'])">حفظ التعديلات</button>
                </div>
                <ul class="nav nav-pills mb-4">
                    <li class="nav-item"><a class="nav-link active" onclick="switchInnerTab('about', 'main')">من نحن (التفاصيل)</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('about', 'vision')">الرؤية</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('about', 'mission')">الرسالة</a></li>
                </ul>

                <div id="about-main" class="inner-tab-content active"><div class="card p-4 mb-3"><label class="fw-bold mb-2">التفاصيل (عربي)</label><textarea class="form-control summernote-settings" id="setting_about_full"></textarea></div><div class="card p-4"><label class="fw-bold mb-2">التفاصيل (English)</label><textarea class="form-control summernote-settings-en" id="setting_about_full_en"></textarea></div></div>
                <div id="about-vision" class="inner-tab-content"><div class="card p-4 mb-3"><label class="fw-bold mb-2">الرؤية (عربي)</label><textarea class="form-control summernote-settings" id="setting_vision"></textarea></div><div class="card p-4"><label class="fw-bold mb-2">الرؤية (English)</label><textarea class="form-control summernote-settings-en" id="setting_vision_en"></textarea></div></div>
                <div id="about-mission" class="inner-tab-content"><div class="card p-4 mb-3"><label class="fw-bold mb-2">الرسالة (عربي)</label><textarea class="form-control summernote-settings" id="setting_mission"></textarea></div><div class="card p-4"><label class="fw-bold mb-2">الرسالة (English)</label><textarea class="form-control summernote-settings-en" id="setting_mission_en"></textarea></div></div>
            </div>

            <!-- SERVICES SECTION -->
            <div id="sec-services" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">الخدمات المحاسبية</h2>
                    <button class="btn btn-gold" onclick="showModal('service')"><i class="bi bi-plus-lg"></i> إضافة خدمة</button>
                </div>
                <div class="card p-4"><table class="table"><thead><tr><th>الخدمة</th><th>الوصف</th><th>إجراءات</th></tr></thead><tbody id="services-table"></tbody></table></div>
            </div>

            <!-- SECTORS SECTION -->
            <div id="sec-sectors" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">قطاعات الأعمال</h2>
                    <button class="btn btn-gold" onclick="showModal('sector')"><i class="bi bi-plus-lg"></i> إضافة قطاع</button>
                </div>
                <div class="card p-4"><table class="table"><thead><tr><th>القطاع</th><th>إجراءات</th></tr></thead><tbody id="sectors-table"></tbody></table></div>
            </div>

            <!-- ARTICLES SECTION -->
            <div id="sec-articles" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">المدونة والمقالات</h2>
                    <div>
                        <button class="btn btn-outline-primary me-2" onclick="openCategoriesModal()"><i class="bi bi-tags"></i> إدارة أقسام المقالات</button>
                        <button class="btn btn-gold" onclick="showModal('article')"><i class="bi bi-plus-lg"></i> إضافة مقال</button>
                    </div>
                </div>
                <div class="card p-4"><table class="table"><thead><tr><th>العنوان</th><th>القسم</th><th>إجراءات</th></tr></thead><tbody id="articles-table"></tbody></table></div>
            </div>

            <!-- CONTACT SECTION -->
            <div id="sec-contact" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">اتصل بنا</h2>
                    <button class="btn btn-gold" onclick="saveContactSettings()">حفظ كافة بيانات التواصل</button>
                </div>
                <ul class="nav nav-pills mb-4">
                    <li class="nav-item"><a class="nav-link active" onclick="switchInnerTab('contact', 'socials')"><i class="bi bi-share"></i> السوشيال ميديا</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('contact', 'phones')"><i class="bi bi-telephone"></i> أرقام التواصل</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('contact', 'emails')"><i class="bi bi-envelope"></i> الإيميلات</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('contact', 'address')"><i class="bi bi-geo-alt"></i> العنوان</a></li>
                    <li class="nav-item"><a class="nav-link" onclick="switchInnerTab('contact', 'location')"><i class="bi bi-map"></i> خريطة جوجل</a></li>
                </ul>

                <div id="contact-socials" class="inner-tab-content active">
                    <div class="card p-4">
                        <div class="row g-3">
                            <div class="col-md-6"><label class="form-label fw-bold"><i class="bi bi-facebook text-primary"></i> فيسبوك</label><input type="text" class="form-control" dir="ltr" id="setting_social_facebook"></div>
                            <div class="col-md-6"><label class="form-label fw-bold"><i class="bi bi-instagram text-danger"></i> إنستجرام</label><input type="text" class="form-control" dir="ltr" id="setting_social_instagram"></div>
                            <div class="col-md-6"><label class="form-label fw-bold"><i class="bi bi-youtube text-danger"></i> يوتيوب</label><input type="text" class="form-control" dir="ltr" id="setting_social_youtube"></div>
                            <div class="col-md-6"><label class="form-label fw-bold"><i class="bi bi-linkedin text-primary"></i> لينكد إن</label><input type="text" class="form-control" dir="ltr" id="setting_social_linkedin"></div>
                            <div class="col-md-6"><label class="form-label fw-bold"><i class="bi bi-tiktok text-dark"></i> تيك توك</label><input type="text" class="form-control" dir="ltr" id="setting_social_tiktok"></div>
                        </div>
                    </div>
                </div>

                <div id="contact-phones" class="inner-tab-content">
                    <div class="card p-4">
                        <label class="form-label fw-bold">أرقام الهواتف (يمكن إضافة أكثر من رقم)</label>
                        <div id="phones-container"></div>
                        <button class="btn btn-light border text-primary mt-2" onclick="addDynamicField('phones-container', 'phone')"><i class="bi bi-plus-lg"></i> إضافة رقم جديد</button>
                    </div>
                </div>

                <div id="contact-emails" class="inner-tab-content">
                    <div class="card p-4">
                        <label class="form-label fw-bold">الإيميلات (يمكن إضافة أكثر من إيميل)</label>
                        <div id="emails-container"></div>
                        <button class="btn btn-light border text-primary mt-2" onclick="addDynamicField('emails-container', 'email')"><i class="bi bi-plus-lg"></i> إضافة إيميل جديد</button>
                    </div>
                </div>

                <div id="contact-address" class="inner-tab-content">
<div class="card p-4 mb-3">
<label class="form-label fw-bold">العنوان (عربي)</label>
<textarea class="form-control" id="setting_contact_address" rows="3"></textarea>
</div>
<div class="card p-4">
<label class="form-label fw-bold">العنوان (English)</label>
<textarea class="form-control" id="setting_contact_address_en" rows="3" dir="ltr"></textarea>
</div>
</div>

                <div id="contact-location" class="inner-tab-content">
                    <div class="card p-4">
                        <label class="form-label fw-bold">رابط / كود خريطة جوجل (Google Maps iframe src)</label>
                        <textarea class="form-control" id="setting_contact_map" rows="3" dir="ltr" placeholder="https://www.google.com/maps/embed?..."></textarea>
                    </div>
                </div>
            </div>

            <!-- MEDIA SECTION -->
            <div id="sec-media" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">مكتبة الوسائط والصور</h2>
                    <div>
                        <input type="file" id="media-upload-input" style="display: none;" accept="image/*" onchange="handleMediaUpload(this)">
                        <button class="btn btn-gold shadow-sm" onclick="document.getElementById('media-upload-input').click()"><i class="bi bi-upload"></i> رفع صورة جديدة</button>
                    </div>
                </div>
                <div class="card p-4"><div id="media-gallery" class="row g-4"></div></div>
            </div>

            <!-- SETTINGS SECTION -->
            <div id="sec-settings" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">إعدادات الموقع العامة</h2>
                    <button class="btn btn-gold" onclick="saveSettingsGroup(['admin_username', 'admin_password', 'seo_title', 'seo_desc', 'seo_title_en', 'seo_desc_en'])">حفظ كافة الإعدادات</button>
                </div>
                
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="card p-4 h-100">
                            <h5 class="fw-bold mb-3"><i class="bi bi-shield-lock text-primary"></i> بيانات الدخول للوحة التحكم</h5>
                            <div class="mb-3">
                                <label class="form-label fw-bold">اسم المستخدم</label>
                                <input type="text" class="form-control" id="setting_admin_username" dir="ltr">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">كلمة المرور الجديدة</label>
                                <input type="password" class="form-control" id="setting_admin_password" dir="ltr" autocomplete="new-password" minlength="12" placeholder="اتركها فارغة للاحتفاظ بكلمة المرور الحالية">
                                <small class="text-muted">استخدم 12 حرفًا على الأقل. لا تُعرض كلمة المرور الحالية داخل اللوحة.</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card p-4 h-100">
                            <h5 class="fw-bold mb-3"><i class="bi bi-google text-primary"></i> إعدادات السيو (SEO)</h5>
                            <div class="mb-3">
<label class="form-label fw-bold">عنوان الموقع (عربي) Meta Title</label>
<input type="text" class="form-control" id="setting_seo_title">
</div>
<div class="mb-3">
<label class="form-label fw-bold">عنوان الموقع (English) Meta Title</label>
<input type="text" class="form-control" id="setting_seo_title_en" dir="ltr">
</div>
                            <div class="mb-3">
<label class="form-label fw-bold">وصف الموقع (عربي) Meta Description</label>
<textarea class="form-control" id="setting_seo_desc" rows="3"></textarea>
</div>
<div class="mb-3">
<label class="form-label fw-bold">وصف الموقع (English) Meta Description</label>
<textarea class="form-control" id="setting_seo_desc_en" rows="3" dir="ltr"></textarea>
</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Generic Modal for Articles/Services/Sectors/Features -->
    <div class="modal fade" id="genericModal" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
                <div class="modal-header bg-light border-0 px-4 py-3">
                    <h5 class="modal-title fw-bold" id="modalTitle">إضافة عنصر</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 py-4">
                    <input type="hidden" id="item-id">
                    <input type="hidden" id="item-type">
                    
                    <div class="row g-4">
                        <div class="col-md-8">
                            <ul class="nav nav-tabs mb-3" id="langTabs" role="tablist">
                                <li class="nav-item" role="presentation"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#ar-pane" type="button" role="tab">العربية (AR)</button></li>
                                <li class="nav-item" role="presentation"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#en-pane" type="button" role="tab" dir="ltr">English (EN)</button></li>
                            </ul>
                            
                            <div class="tab-content" id="langTabsContent">
                                <div class="tab-pane fade show active" id="ar-pane" role="tabpanel">
                                    <div class="mb-4">
                                        <label id="lbl-title" class="form-label fw-bold">العنوان (بالعربية)</label>
                                        <input type="text" class="form-control form-control-lg bg-light" id="item-title">
                                    </div>
                                    <div class="mb-4" id="div-description" style="display:none;">
                                        <label class="form-label fw-bold">وصف قصير (بالعربية)</label>
                                        <textarea class="form-control bg-light" id="item-description" rows="3"></textarea>
                                    </div>
                                    <div class="mb-0">
                                        <label class="form-label fw-bold">المحتوى (بالعربية)</label>
                                        <textarea class="form-control" id="item-content" rows="6"></textarea>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="en-pane" role="tabpanel" dir="ltr">
                                    <div class="mb-4">
                                        <label id="lbl-title-en" class="form-label fw-bold">Title (English)</label>
                                        <input type="text" class="form-control form-control-lg bg-light" id="item-title_en">
                                    </div>
                                    <div class="mb-4" id="div-description-en" style="display:none;">
                                        <label class="form-label fw-bold">Short Description (English)</label>
                                        <textarea class="form-control bg-light" id="item-description_en" rows="3"></textarea>
                                    </div>
                                    <div class="mb-0">
                                        <label class="form-label fw-bold">Content (English)</label>
                                        <textarea class="form-control" id="item-content_en" rows="6"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card bg-light p-3 border-0 h-100">
                                <div class="mb-3" id="div-category" style="display:none;">
                                    <label class="form-label fw-bold">اختر قسم المقال</label>
                                    <select class="form-select mb-2" id="item-category-select" onchange="onCategorySelectChange()">
                                    </select>
                                    <div id="custom-category-inputs" style="display:none; background: #f8f9fa; border: 1px dashed #ced4da; padding: 12px; border-radius: 8px; margin-top: 10px;">
                                        <label class="form-label fw-bold text-primary mb-1" style="font-size:0.85rem;">اسم القسم الجديد (بالعربية)</label>
                                        <input type="text" class="form-control mb-2 form-control-sm" id="item-category" placeholder="مثال: مقالات ضريبية">
                                        <label class="form-label fw-bold text-primary mb-1" style="font-size:0.85rem;">New Category Name (English)</label>
                                        <input type="text" class="form-control form-control-sm" id="item-category_en" placeholder="e.g. Tax Articles" dir="ltr">
                                    </div>
                                </div>
                                <div class="mb-3" id="div-icon" style="display:none;">
                                    <label class="form-label fw-bold">القيمة / الأيقونة</label>
                                    <input type="text" class="form-control mb-2" id="item-icon" dir="ltr">
                                    <label class="form-label fw-bold mt-2" id="lbl-icon-en">Value / Position (English)</label>
                                    <input type="text" class="form-control" id="item-icon_en" dir="ltr">
                                </div>
                                <div class="mb-3" id="div-verified" style="display:none;">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" role="switch" id="item-verified">
                                        <label class="form-check-label fw-bold" for="item-verified">شهادة موثقة ومصرح بنشرها</label>
                                    </div>
                                    <small class="text-muted">لن تظهر الشهادة للزوار قبل تفعيل هذا الخيار بعد التحقق من صحتها وموافقة صاحبها.</small>
                                </div>
                                <div class="mb-3" id="div-image" style="display:none;">
                                    <label class="form-label fw-bold">الصورة البارزة (أو صورة اليوتيوب)</label>
                                    <img id="item-image-preview" src="/images/placeholder.jpg" class="img-fluid rounded mb-2" style="height:140px;width:100%;object-fit:cover;">
                                    <input type="hidden" id="item-image" value="/images/placeholder.jpg">
                                    <div class="d-flex gap-2 mb-2">
                                        <button class="btn btn-outline-primary flex-grow-1 btn-sm" type="button" onclick="openMediaPicker('item-image')"><i class="bi bi-images"></i> اختيار من المكتبة</button>
                                        <button class="btn btn-gold flex-grow-1 btn-sm" type="button" onclick="document.getElementById('direct-article-img-upload').click()"><i class="bi bi-upload"></i> رفع صورة مباشرة</button>
                                        <input type="file" id="direct-article-img-upload" accept="image/*" style="display:none;" onchange="handleDirectArticleImageUpload(this)">
                                    </div>
                                    <button class="btn btn-outline-danger w-100 btn-sm" type="button" onclick="removeArticleImage()" title="حذف الصورة وبدون صورة"><i class="bi bi-trash"></i> بدون صورة (أو الاعتماد على اليوتيوب)</button>
                                </div>
                                <div class="mb-3" id="div-video" style="display:none;">
                                    <label class="form-label fw-bold"><i class="bi bi-youtube text-danger"></i> رابط يوتيوب (يظهر مكان الصورة ومصغرة اليوتيوب)</label>
                                    <input type="text" class="form-control mb-1" id="item-video" placeholder="https://www.youtube.com/watch?v=XXXXX" dir="ltr" oninput="onYoutubeUrlInput()">
                                    <div class="d-flex justify-content-between align-items-center mt-1">
                                        <small class="text-muted" style="font-size:0.75rem;">يتم إدراج مصغرة اليوتيوب وعرض الفيديو مكان الصورة</small>
                                        <button class="btn btn-outline-danger btn-sm py-0" type="button" onclick="useYoutubeThumbnail()" style="font-size:0.75rem;"><i class="bi bi-image"></i> استخدام صورة اليوتيوب</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 px-4 py-3 bg-light">
                    <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">إلغاء</button>
                    <button type="button" class="btn btn-gold px-5" onclick="saveItem()"><i class="bi bi-save"></i> حفظ</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Categories Management Modal -->
    <div class="modal fade" id="categoriesModal" tabindex="-1" style="z-index: 1060;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-light border-0">
                    <h5 class="modal-title fw-bold"><i class="bi bi-tags text-primary"></i> إدارة أقسام المقالات</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="bg-light p-3 rounded mb-4">
                        <h6 class="fw-bold mb-3">إضافة قسم جديد</h6>
                        <div class="row g-2">
                            <div class="col-md-6">
                                <input type="text" id="new-cat-ar" class="form-control" placeholder="اسم القسم (عربي)">
                            </div>
                            <div class="col-md-6">
                                <input type="text" id="new-cat-en" class="form-control" placeholder="Name (English)" dir="ltr">
                            </div>
                            <div class="col-12 mt-2">
                                <button type="button" class="btn btn-gold w-100 btn-sm" onclick="addNewCategoryFromModal()"><i class="bi bi-plus-circle"></i> إضافة القسم</button>
                            </div>
                        </div>
                    </div>
                    <h6 class="fw-bold mb-2">الأقسام الحالية</h6>
                    <ul class="list-group list-group-flush border rounded" id="categories-list-modal" style="max-height: 250px; overflow-y: auto;">
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Media Picker Modal -->
    <div class="modal fade" id="mediaPickerModal" tabindex="-1" style="z-index: 1060;">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-light border-0">
                    <h5 class="modal-title fw-bold"><i class="bi bi-images text-primary"></i> مكتبة الصور</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4 bg-light">
                    <div id="media-picker-gallery" class="row g-3"></div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const API_URL = '/api';
        let dataStore = { articles: [], services: [], sectors: [], features: [], stats: [], testimonials: [] };
        let modal, mediaPickerModal, categoriesModal, chartInstance;
        let mediaPickerTargetInputId = null, activeSummernote = null;
        let savedArticleCategories = [];

        function escapeHtml(value) {
            return String(value ?? '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function plainText(value) {
            return String(value ?? '')
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
        }

        function authHeaders(extra = {}) {
            const token = localStorage.getItem('token');
            return token
                ? { ...extra, 'Authorization': `Bearer ${token}` }
                : { ...extra };
        }

        async function authorizedFetch(url, options = {}) {
            const response = await fetch(url, {
                ...options,
                headers: authHeaders(options.headers || {})
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                document.getElementById('dashboard-screen').style.display = 'none';
                document.getElementById('login-screen').style.display = 'flex';
                document.getElementById('login-error').innerText = 'انتهت الجلسة. سجل الدخول مرة أخرى.';
                document.getElementById('login-error').style.display = 'block';
                throw new Error('Unauthorized');
            }

            return response;
        }

        function showToast(msg, isError = false) {
            const toastEl = document.getElementById('liveToast');
            document.getElementById('toastMessage').innerText = msg;
            toastEl.style.backgroundColor = isError ? '#dc3545' : 'var(--accent)';
            new bootstrap.Toast(toastEl).show();
        }

        document.addEventListener('DOMContentLoaded', () => {
            modal = new bootstrap.Modal(document.getElementById('genericModal'));
            mediaPickerModal = new bootstrap.Modal(document.getElementById('mediaPickerModal'));
            categoriesModal = new bootstrap.Modal(document.getElementById('categoriesModal'));
            if(localStorage.getItem('token')) restoreSession();
            
            const summernoteOptionsAR = {
                height: 300, direction: 'rtl',
                toolbar: [
                    ['style', ['style', 'bold', 'italic', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['insert', ['link', 'customMedia', 'customUpload', 'video', 'customYoutube']],
                    ['view', ['codeview']]
                ],
                buttons: {
                    customMedia: function (context) {
                        return $.summernote.ui.button({
                            contents: '<i class="bi bi-image"></i> مكتبة الصور',
                            click: function () { activeSummernote = context; openMediaPicker(null, true); }
                        }).render();
                    },
                    customUpload: function (context) {
                        return $.summernote.ui.button({
                            contents: '<i class="bi bi-upload"></i> رفع مباشر',
                            click: function () {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = async () => {
                                    if (!input.files || !input.files[0]) return;
                                    showToast('جاري رفع الصورة للمقال...', 'info');
                                    const formData = new FormData();
                                    formData.append('image', input.files[0]);
                                    try {
                                        const res = await fetch(`${API_URL}/upload.php`, {
                                            method: 'POST',
                                            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                                            body: formData
                                        });
                                        const data = await res.json();
                                        const imgUrl = data.url || (data.filename ? `/images/${data.filename}` : '');
                                        if (imgUrl) {
                                            context.invoke('editor.insertImage', imgUrl);
                                            showToast('تم إدراج الصورة بنجاح!');
                                            loadMedia();
                                        } else {
                                            showToast(data.error || 'فشل رفع الصورة', true);
                                        }
                                    } catch (e) {
                                        showToast('حدث خطأ أثناء الرفع', true);
                                    }
                                };
                                input.click();
                            }
                        }).render();
                    },
                    customYoutube: function (context) {
                        return $.summernote.ui.button({
                            contents: '<i class="bi bi-youtube text-danger"></i> يوتيوب',
                            click: function () {
                                const url = prompt('قم بلصق رابط فيديو اليوتيوب هنا (YouTube Link):');
                                if (url) {
                                    let videoId = '';
                                    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
                                    else if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0];
                                    else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0].split('&')[0];
                                    else if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0].split('&')[0];
                                    if (videoId) {
                                        const embedHtml = `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:20px 0;border-radius:12px;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen></iframe></div><p><br></p>`;
                                        context.invoke('editor.pasteHTML', embedHtml);
                                    } else {
                                        alert('رابط يوتيوب غير صالح. يرجى التأكد من الرابط.');
                                    }
                                }
                            }
                        }).render();
                    }
                }
            };
            const summernoteOptionsEN = { ...summernoteOptionsAR, direction: 'ltr' };
            $('#item-content, .summernote-settings').summernote(summernoteOptionsAR);
            $('#item-content_en, .summernote-settings-en').summernote(summernoteOptionsEN);

            document.getElementById('item-image').addEventListener('change', function() {
                document.getElementById('item-image-preview').src = this.value;
            });
        });

        // Tabs Logic
        function switchMainTab(tabId) {
            document.querySelectorAll('.section-container').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.nav-link-sidebar').forEach(el => el.classList.remove('active'));
            document.getElementById('sec-' + tabId).classList.add('active');
            event.currentTarget.classList.add('active');
            
            if(window.innerWidth <= 768) document.querySelector('.sidebar').classList.remove('show');
            if(tabId === 'media') loadMedia();
            
            if(tabId === 'visual-editor') {
                const targetUrl = '/?edit_mode=true';
                const iframe = document.getElementById('visual-editor-iframe');
                if(!iframe.src || iframe.src === 'about:blank' || !iframe.src.includes('edit_mode=true')) {
                    iframe.src = targetUrl;
                }
            }
        }

        function openVisualEditorInNewTab() {
            window.open('/?edit_mode=true', '_blank', 'noopener');
        }

        function switchInnerTab(section, innerTab) {
            document.querySelectorAll(`#sec-${section} .inner-tab-content`).forEach(el => el.classList.remove('active'));
            document.querySelectorAll(`#sec-${section} .nav-pills .nav-link`).forEach(el => el.classList.remove('active'));
            document.getElementById(`${section}-${innerTab}`).classList.add('active');
            event.currentTarget.classList.add('active');
        }

        // Auth
        async function login() {
            const usr = document.getElementById('username').value;
            const pwd = document.getElementById('password').value;
            try {
                const res = await fetch(API_URL + '/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usr, password: pwd })
                });
                const data = await res.json();
                if(data.token) {
                    localStorage.setItem('token', data.token);
                    document.getElementById('password').value = '';
                    showDashboard();
                }
                else { document.getElementById('login-error').innerText = data.error || 'خطأ في تسجيل الدخول'; document.getElementById('login-error').style.display='block'; }
            } catch(e) { showToast('فشل الاتصال', true); }
        }

        function togglePasswordReset() {
            const panel = document.getElementById('password-reset-panel');
            const isVisible = panel.style.display !== 'none';
            panel.style.display = isVisible ? 'none' : 'block';
            document.getElementById('login-error').style.display = 'none';
        }

        function showResetMessage(message, isError = false) {
            const element = document.getElementById('reset-message');
            element.textContent = message;
            element.className = `mt-3 text-center fw-bold ${isError ? 'text-danger' : 'text-success'}`;
            element.style.display = 'block';
        }

        async function requestPasswordReset() {
            const button = document.getElementById('send-reset-code');
            button.disabled = true;
            showResetMessage('جارٍ إرسال الرمز...');
            try {
                const response = await fetch(API_URL + '/password-reset.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'request' })
                });
                const result = await response.json();
                if (!response.ok) {
                    const message = response.status === 429
                        ? 'تم طلب رموز كثيرة. حاول مرة أخرى لاحقًا.'
                        : 'تعذر إرسال الرمز الآن. حاول مرة أخرى.';
                    showResetMessage(message, true);
                    return;
                }
                document.getElementById('reset-request-stage').style.display = 'none';
                document.getElementById('reset-verify-stage').style.display = 'block';
                showResetMessage('تم إرسال الرمز. يمكنك استخدام أي رمز وصلك خلال آخر 10 دقائق.');
                document.getElementById('reset-code').focus();
            } catch (error) {
                showResetMessage('فشل الاتصال بالخادم. حاول مرة أخرى.', true);
            } finally {
                button.disabled = false;
            }
        }

        async function completePasswordReset() {
            const code = document.getElementById('reset-code').value.trim();
            const password = document.getElementById('reset-password').value;
            const confirmation = document.getElementById('reset-password-confirm').value;
            if (!/^[0-9]{6}$/.test(code)) {
                showResetMessage('أدخل رمز التحقق المكون من 6 أرقام.', true);
                return;
            }
            if (password.length < 12) {
                showResetMessage('يجب ألا تقل كلمة المرور عن 12 حرفًا.', true);
                return;
            }
            if (password !== confirmation) {
                showResetMessage('كلمتا المرور غير متطابقتين.', true);
                return;
            }

            const button = document.getElementById('complete-reset');
            button.disabled = true;
            showResetMessage('جارٍ تغيير كلمة المرور...');
            try {
                const response = await fetch(API_URL + '/password-reset.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'reset', code, password })
                });
                const result = await response.json();
                if (!response.ok) {
                    showResetMessage(
                        response.status === 422
                            ? 'الرمز غير صحيح أو انتهت صلاحيته.'
                            : 'تعذر تغيير كلمة المرور الآن.',
                        true
                    );
                    return;
                }
                document.getElementById('reset-code').value = '';
                document.getElementById('reset-password').value = '';
                document.getElementById('reset-password-confirm').value = '';
                document.getElementById('password-reset-panel').style.display = 'none';
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
                document.getElementById('login-error').textContent = 'تم تغيير كلمة المرور. يمكنك تسجيل الدخول الآن.';
                document.getElementById('login-error').className = 'text-success mt-3 text-center fw-bold';
                document.getElementById('login-error').style.display = 'block';
            } catch (error) {
                showResetMessage('فشل الاتصال بالخادم. حاول مرة أخرى.', true);
            } finally {
                button.disabled = false;
            }
        }

        async function restoreSession() {
            try {
                const response = await authorizedFetch(`${API_URL}/login.php`);
                if (response.ok) showDashboard();
            } catch (e) {
                // authorizedFetch restores the login screen for expired sessions.
            }
        }

        async function logout() {
            try {
                await authorizedFetch(`${API_URL}/login.php`, { method: 'DELETE' });
            } catch (e) {
                // Clear the local session even if the server is unavailable.
            } finally {
                localStorage.removeItem('token');
                sessionStorage.removeItem('admin_token');
                sessionStorage.removeItem('edit_mode');
                location.reload();
            }
        }

        function showDashboard() {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('dashboard-screen').style.display = 'block';
            loadAllData();
            loadAnalytics();
        }

        // Analytics
        async function loadAnalytics() {
            try {
                const res = await authorizedFetch(`${API_URL}/analytics.php`);
                const stats = await res.json();
                document.getElementById('stat-total-visits').innerText = stats.total_visits || '0';
                document.getElementById('stat-unique-visitors').innerText = stats.unique_visitors || '0';
                document.getElementById('stat-visits-today').innerText = stats.visits_today || '0';
                document.getElementById('stat-articles').innerText = stats.articles_count || '0';
                
                if(stats.chart_data && document.getElementById('visitsChart')) {
                    if(chartInstance) chartInstance.destroy();
                    chartInstance = new Chart(document.getElementById('visitsChart').getContext('2d'), {
                        type: 'line',
                        data: {
                            labels: stats.chart_data.map(d=>d.date),
                            datasets: [{ label: 'الزيارات اليومية', data: stats.chart_data.map(d=>d.count), borderColor: '#d4af37', backgroundColor: 'rgba(212, 175, 55, 0.2)', fill: true, tension: 0.3 }]
                        },
                        options: { maintainAspectRatio: false }
                    });
                }

                if (stats.page_stats) {
                    const tbody = document.getElementById('detailed-pages-list');
                    tbody.innerHTML = '';
                    
                    const pageNames = {
                        '/': 'الرئيسية',
                        '/about': 'من نحن',
                        '/services': 'جميع الخدمات',
                        '/sectors': 'قطاعات الأعمال',
                        '/articles': 'المقالات والمدونة',
                        '/contact': 'اتصل بنا'
                    };

                    stats.page_stats.forEach(page => {
                        let pageName = page.page_path;
                        // Format service or sector specific pages
                        if (pageName.startsWith('/services/')) {
                            pageName = 'خدمة: ' + pageName.replace('/services/', '').replace(/-/g, ' ');
                        } else if (pageName.startsWith('/sectors/')) {
                            pageName = 'قطاع: ' + pageName.replace('/sectors/', '').replace(/-/g, ' ');
                        } else if (pageName.startsWith('/articles/')) {
                            pageName = 'مقال: ' + decodeURIComponent(pageName.replace('/articles/', '')).replace(/-/g, ' ');
                        } else if (pageNames[pageName]) {
                            pageName = pageNames[pageName];
                        }

                        const tr = document.createElement('tr');
                        const nameCell = document.createElement('td');
                        nameCell.className = 'text-start fw-bold';
                        nameCell.style.color = 'var(--primary)';
                        nameCell.append(document.createTextNode(pageName), document.createElement('br'));
                        const path = document.createElement('small');
                        path.className = 'text-muted';
                        path.dir = 'ltr';
                        path.textContent = page.page_path;
                        nameCell.appendChild(path);

                        const totalCell = document.createElement('td');
                        totalCell.className = 'fw-bold';
                        totalCell.style.fontSize = '1.1rem';
                        totalCell.textContent = String(page.total_views);

                        const uniqueCell = document.createElement('td');
                        uniqueCell.className = 'fw-bold text-success';
                        uniqueCell.style.fontSize = '1.1rem';
                        uniqueCell.textContent = String(page.unique_views);

                        tr.append(nameCell, totalCell, uniqueCell);
                        tbody.appendChild(tr);
                    });
                }
            } catch (e) {}
        }

        // Dynamic Lists for Phones & Emails
        function renderDynamicList(containerId, items, type) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            let list = [];
            try { list = JSON.parse(items); } catch(e) { if(items) list = [items]; }
            if(!Array.isArray(list)) list = list ? [list] : [''];
            if(list.length === 0) list = [''];
            
            list.forEach(val => {
                const div = document.createElement('div');
                div.className = 'dynamic-list-item';
                const input = document.createElement('input');
                input.type = type === 'email' ? 'email' : 'tel';
                input.className = 'form-control';
                input.dir = 'ltr';
                input.value = String(val);
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-outline-danger';
                button.setAttribute('aria-label', 'حذف');
                button.innerHTML = '<i class="bi bi-trash" aria-hidden="true"></i>';
                button.addEventListener('click', () => div.remove());
                div.append(input, button);
                container.appendChild(div);
            });
        }
        function addDynamicField(containerId) {
            const div = document.createElement('div');
            div.className = 'dynamic-list-item';
            div.innerHTML = `<input type="text" class="form-control" dir="ltr"><button class="btn btn-outline-danger" onclick="this.parentElement.remove()"><i class="bi bi-trash"></i></button>`;
            document.getElementById(containerId).appendChild(div);
        }
        function getDynamicListValues(containerId) {
            return Array.from(document.getElementById(containerId).querySelectorAll('input')).map(inp => inp.value.trim()).filter(v => v);
        }

        // Settings
        async function loadSettings() {
            try {
                const res = await authorizedFetch(`${API_URL}/settings.php`);
                const s = await res.json();
                if (s.article_categories) {
                    try { savedArticleCategories = JSON.parse(s.article_categories); } catch(e) { savedArticleCategories = []; }
                }
                
                const defaults = {
                    hero_title: "نساعدك على تحقيق أهدافك المالية بنجاح",
                    hero_title_en: "We help you achieve your financial goals successfully",
                    hero_subtitle: "حلول محاسبية مبتكرة وموثوقة لشركتك",
                    hero_subtitle_en: "Innovative and reliable accounting solutions for your company",
                    about_short: "نقدم لك أفضل الخدمات المحاسبية والاستشارية بخبرة تمتد لسنوات.",
                    about_short_en: "We offer you the best accounting and consulting services with years of experience.",
                    about_full: "تُعد شركة \"ولاء مجدي العشماوي للمحاسبة القانونية\" (AFC) واحدة من الشركات الرائدة في مصر في مجالات المحاسبة، والمراجعة، والضرائب، والخدمات الاستشارية المالية. تأسست الشركة عام 2024 على يد السيدة ولاء مجدي العشماوي، انطلاقاً من رؤية واضحة تهدف إلى تقديم خدمات مهنية متميزة ترتكز على النزاهة والخبرة وبناء علاقات مستدامة مع العملاء.<br/><br/>في AFC، نضمن لعملائنا أن يتولى تنفيذ كل مهمة فريق من المهنيين المتفانين الملتزمين بأعلى معايير الجودة والتميز. ونحن نتبنى نهجاً متكاملاً يرتكز على فهم عميق للتحديات الفريدة التي تواجه الشركات الصغيرة والمتوسطة، مما يتيح لنا تقديم حلول عملية واستراتيجية تعزز القيمة.<br/><br/>صُممت خدماتنا الشاملة لدعم العملاء في كل مرحلة من مراحل رحلة أعمالهم، مما يُمكّنهم من اتخاذ قرارات مدروسة، وتحقيق نمو مستدام، والتركيز على تعظيم القيمة طويلة الأمد لأعمالهم.",
                    about_full_en: "\"Wlaa Magdy Al-Ashmawy for Legal Accounting\" (AFC) is one of the leading firms in Egypt in the fields of accounting, auditing, taxation, and financial advisory services. Founded in 2024 by Ms. Wlaa Magdy Al-Ashmawy, the firm was built on a clear vision aimed at providing outstanding professional services based on integrity, expertise, and building sustainable relationships with clients.<br/><br/>At AFC, we ensure our clients that every engagement is handled by a team of dedicated professionals committed to the highest standards of quality and excellence. We adopt an integrated approach rooted in a deep understanding of the unique challenges facing small and medium-sized enterprises (SMEs), allowing us to provide practical and strategic solutions that enhance value.<br/><br/>Our comprehensive services are designed to support clients at every stage of their business journey, empowering them to make informed decisions, achieve sustainable growth, and focus on maximizing the long-term value of their business.",
                    vision: "أن نكون الشريك الموثوق والاختيار الأول للشركات التي تبحث عن خدمات محاسبية وضريبية ومراجعة واستشارات مالية استثنائية، من خلال الخبرة والنزاهة والابتكار.",
                    vision_en: "To be the trusted partner and first choice for companies seeking exceptional accounting, tax, auditing, and financial advisory services, through expertise, integrity, and innovation.",
                    mission: "أن نكون القوة الموثوقة وراء نجاح عملائنا، من خلال تقديم حلول ثاقبة، وجودة لا تقبل التنازل، وتوجيه استراتيجي يعزز النمو، ويرسخ الثقة، ويخلق قيمة مستدامة.",
                    mission_en: "To be the reliable force behind our clients' success by delivering insightful solutions, uncompromising quality, and strategic guidance that fosters growth, builds trust, and creates sustainable value.",
                    contact_address: "مكتب 204 الدور الثاني مول اجياد فيو - ٦ اكتوبر - الجيزة - مصر",
                    contact_address_en: "Office 204, 2nd Floor, Agyad View Mall - 6th of October - Giza - Egypt",
                    contact_map: "https://maps.google.com/maps?q=29.9607581,30.9246025&hl=ar&z=16&output=embed",
                    seo_title: "شركة الاستشارات المحاسبية",
                    seo_title_en: "AFC",
                    seo_desc: "شريكك الموثوق في تقديم حلول محاسبية وضريبية متكاملة لضمان نجاح واستدامة أعمالك.",
                    seo_desc_en: "Your trusted partner in providing comprehensive accounting and tax solutions.",
                    social_facebook: "",
                    social_instagram: "",
                    social_youtube: "",
                    social_linkedin: "",
                    social_tiktok: ""
                };
                
                ['hero_title', 'hero_subtitle', 'hero_title_en', 'hero_subtitle_en', 'contact_address', 'contact_address_en', 'contact_map', 'social_facebook', 'social_instagram', 'social_youtube', 'social_linkedin', 'social_tiktok', 'admin_username', 'admin_password', 'seo_title', 'seo_desc', 'seo_title_en', 'seo_desc_en'].forEach(k => {
                    if(document.getElementById(`setting_${k}`)) document.getElementById(`setting_${k}`).value = s[k] || defaults[k] || '';
                });
                
                ['about_short', 'about_full', 'vision', 'mission', 'about_short_en', 'about_full_en', 'vision_en', 'mission_en'].forEach(k => {
                    if(document.getElementById(`setting_${k}`)) $(`#setting_${k}`).summernote('code', s[k] || defaults[k] || '');
                });

                renderDynamicList('phones-container', s.contact_phones || s.contact_phone || JSON.stringify(['01155729429', '0238345397']), 'phone');
                renderDynamicList('emails-container', s.contact_emails || s.contact_email || JSON.stringify(['info@afc-cpa.com']), 'email');

            } catch(e) {}
        }

        async function saveSettingsGroup(keys) {
            let data = {};
            keys.forEach(k => {
                const el = document.getElementById(`setting_${k}`);
                data[k] = el.classList.contains('summernote-settings') ? $(el).summernote('code') : el.value;
            });
            await sendSettings(data);
        }

        async function saveContactSettings() {
            let data = {
                contact_phones: JSON.stringify(getDynamicListValues('phones-container')),
                contact_emails: JSON.stringify(getDynamicListValues('emails-container')),
                contact_address: document.getElementById('setting_contact_address').value,
                contact_map: document.getElementById('setting_contact_map').value,
                social_facebook: document.getElementById('setting_social_facebook').value,
                social_instagram: document.getElementById('setting_social_instagram').value,
                social_youtube: document.getElementById('setting_social_youtube').value,
                social_linkedin: document.getElementById('setting_social_linkedin').value,
                social_tiktok: document.getElementById('setting_social_tiktok').value,
            };
            await sendSettings(data);
        }

        async function sendSettings(data) {
            try {
                const res = await authorizedFetch(API_URL + '/settings.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                if(res.ok) {
                    document.getElementById('setting_admin_password').value = '';
                    if (result.reauthenticate) {
                        localStorage.removeItem('token');
                        showToast('تم الحفظ. سجل الدخول مجددًا بالبيانات الجديدة.');
                        setTimeout(() => location.reload(), 1500);
                    } else {
                        showToast('تم الحفظ بنجاح!');
                    }
                } else {
                    showToast(result.error || 'حدث خطأ', true);
                }
            } catch(e) { showToast('خطأ اتصال', true); }
        }

        // CRUD Items
        async function loadAllData() {
            loadSettings();
            ['articles', 'services', 'sectors', 'features', 'stats', 'testimonials'].forEach(t => loadItems(t));
        }

        async function loadItems(type) {
            try {
                const res = await authorizedFetch(`${API_URL}/${type}.php`);
                const data = await res.json();
                if (!res.ok || !Array.isArray(data)) {
                    throw new Error(data.error || 'Invalid response');
                }
                dataStore[type] = data;
                renderTable(type);
            } catch (error) {
                dataStore[type] = [];
                renderTable(type);
                showToast('تعذر تحميل بعض بيانات الموقع', true);
            }
        }

        function renderTable(type) {
            const tbody = document.getElementById(`${type}-table`);
            if(!tbody) return;
            tbody.innerHTML = dataStore[type].length ? '' : `<tr><td colspan="4" class="text-center text-muted py-3">لا توجد بيانات</td></tr>`;
            dataStore[type].forEach(item => {
                let cols = '';
                if(type === 'articles') cols = `<td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.category)}</td>`;
                else if(type === 'services' || type === 'sectors') cols = `<td>${escapeHtml(item.title)}</td>${type==='services'?`<td>${escapeHtml(plainText(item.description).substring(0,30))}...</td>`:''}`;
                else if(type === 'features') {
                    const icon = /^[A-Za-z][A-Za-z0-9-]{0,99}$/.test(item.icon || '') ? item.icon : 'circle';
                    cols = `<td>${escapeHtml(item.title)}</td><td>${escapeHtml(plainText(item.description).substring(0,30))}...</td><td><i class="bi bi-${icon}"></i></td>`;
                }
                else if(type === 'stats') cols = `<td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.value)}</td>`;
                else if(type === 'testimonials') {
                    const verification = Number(item.is_verified) === 1
                        ? '<span class="badge text-bg-success">موثقة</span>'
                        : '<span class="badge text-bg-secondary">غير منشورة</span>';
                    cols = `<td>${escapeHtml(item.name)}<br>${verification}</td><td>${escapeHtml(item.position)}</td><td>${escapeHtml(plainText(item.content).substring(0,30))}...</td>`;
                }

                const safeId = Number.isInteger(Number(item.id)) ? Number(item.id) : 0;
                tbody.innerHTML += `<tr>${cols}<td>
                    <button class="btn btn-sm btn-light border text-primary" onclick="editItem('${type}', ${safeId})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-light border text-danger" onclick="deleteItem('${type}', ${safeId})"><i class="bi bi-trash"></i></button>
                </td></tr>`;
            });
        }

        function removeArticleImage() {
            document.getElementById('item-image').value = '';
            document.getElementById('item-image-preview').src = '/images/placeholder.jpg';
        }

        function extractYoutubeId(url) {
            if (!url) return '';
            let videoId = '';
            if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
            else if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0];
            else if (url.includes('embed/')) videoId = url.split('embed/')[1].split('?')[0].split('&')[0];
            else if (url.includes('shorts/')) videoId = url.split('shorts/')[1].split('?')[0].split('&')[0];
            return /^[A-Za-z0-9_-]{6,20}$/.test(videoId) ? videoId : '';
        }

        function onYoutubeUrlInput() {
            const url = document.getElementById('item-video').value;
            const videoId = extractYoutubeId(url);
            const currentImg = document.getElementById('item-image').value;
            if (videoId && (!currentImg || currentImg === '' || currentImg === '/images/placeholder.jpg' || currentImg === '/images/articles/placeholder.jpg')) {
                const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                document.getElementById('item-image').value = thumbUrl;
                document.getElementById('item-image-preview').src = thumbUrl;
            }
        }

        function useYoutubeThumbnail() {
            const url = document.getElementById('item-video').value;
            const videoId = extractYoutubeId(url);
            if (videoId) {
                const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                document.getElementById('item-image').value = thumbUrl;
                document.getElementById('item-image-preview').src = thumbUrl;
                showToast('تم اعتماد صورة اليوتيوب المصغرة كصورة بارزة للمقال بنجاح');
            } else {
                showToast('يرجى إدخال رابط يوتيوب صحيح أولاً', true);
            }
        }

        async function handleDirectArticleImageUpload(input) {
            if (!input.files || !input.files[0]) return;
            showToast('جاري رفع الصورة...', 'info');
            const formData = new FormData();
            formData.append('image', input.files[0]);
            try {
                const res = await fetch(`${API_URL}/upload.php`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: formData
                });
                const data = await res.json();
                if (data.url || (res.ok && data.success !== false)) {
                    const imgUrl = data.url || (data.filename ? `/images/${data.filename}` : '');
                    if (imgUrl) {
                        document.getElementById('item-image').value = imgUrl;
                        document.getElementById('item-image-preview').src = imgUrl;
                        showToast('تم رفع الصورة واعتمادها بنجاح!');
                        loadMedia();
                    } else {
                        showToast('فشل في استلام رابط الصورة المرفوعة', true);
                    }
                } else {
                    showToast(data.error || 'فشل رفع الصورة', true);
                }
            } catch (e) {
                showToast('حدث خطأ أثناء الرفع', true);
            }
            input.value = '';
        }

        function getMergedArticleCategories() {
            const catsMap = new Map();
            const defaults = [
                { ar: 'الاستشارات المحاسبية', en: 'Accounting Advisory' },
                { ar: 'الاستشارات الضريبية', en: 'Tax Advisory' },
                { ar: 'المراجعة والتدقيق', en: 'Audit & Assurance' },
                { ar: 'تأسيس الشركات', en: 'Company Formation' },
                { ar: 'الاستشارات المالية', en: 'Financial Advisory' }
            ];
            defaults.forEach(c => catsMap.set(c.ar.trim(), c));
            if (dataStore['services']) {
                dataStore['services'].forEach(s => {
                    if (s && s.title && s.title.trim()) {
                        if (!catsMap.has(s.title.trim())) {
                            catsMap.set(s.title.trim(), { ar: s.title.trim(), en: (s.title_en || s.title).trim() });
                        }
                    }
                });
            }
            savedArticleCategories.forEach(c => {
                if (c && c.ar) catsMap.set(c.ar.trim(), { ar: c.ar.trim(), en: (c.en || c.ar).trim() });
            });
            if (dataStore['articles']) {
                dataStore['articles'].forEach(a => {
                    if (a.category && a.category.trim()) {
                        if (!catsMap.has(a.category.trim())) {
                            catsMap.set(a.category.trim(), { ar: a.category.trim(), en: (a.category_en || a.category).trim() });
                        }
                    }
                });
            }
            return Array.from(catsMap.values());
        }

        function openCategoriesModal() {
            renderCategoriesModalList();
            if (!categoriesModal) categoriesModal = new bootstrap.Modal(document.getElementById('categoriesModal'));
            categoriesModal.show();
        }

        function renderCategoriesModalList() {
            const list = document.getElementById('categories-list-modal');
            const cats = getMergedArticleCategories();
            if (cats.length === 0) {
                list.innerHTML = '<li class="list-group-item text-muted text-center py-3">لا توجد أقسام حالياً</li>';
                return;
            }
            list.innerHTML = cats.map((c, idx) => `
                <li class="list-group-item d-flex justify-content-between align-items-center py-2">
                    <div>
                        <span class="fw-bold">${escapeHtml(c.ar)}</span>
                        <span class="text-muted ms-2 small" dir="ltr">(${escapeHtml(c.en)})</span>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteArticleCategoryByIndex(${idx})" title="حذف القسم"><i class="bi bi-trash"></i></button>
                </li>
            `).join('');
        }

        function deleteArticleCategoryByIndex(index) {
            const category = getMergedArticleCategories()[index];
            if (category) deleteArticleCategory(category.ar);
        }

        async function addNewCategoryFromModal() {
            const ar = document.getElementById('new-cat-ar').value.trim();
            const en = document.getElementById('new-cat-en').value.trim() || ar;
            if (!ar) { showToast('يرجى إدخال اسم القسم بالعربية', true); return; }
            
            await saveNewCategoryToSettings(ar, en);
            document.getElementById('new-cat-ar').value = '';
            document.getElementById('new-cat-en').value = '';
            renderCategoriesModalList();
            showToast('تمت إضافة القسم بنجاح');
        }

        async function saveNewCategoryToSettings(ar, en) {
            if (!ar) return;
            const cats = getMergedArticleCategories();
            if (!cats.some(c => c.ar === ar)) {
                cats.push({ ar: ar, en: en || ar });
            } else {
                return;
            }
            savedArticleCategories = cats;
            await authorizedFetch(API_URL + '/settings.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ article_categories: JSON.stringify(savedArticleCategories) })
            });
        }

        async function deleteArticleCategory(arName) {
            if (!confirm(`هل أنت متأكد من حذف القسم "${arName}"؟\nملاحظة: المقالات المرتبطة بهذا القسم لن تُحذف ولكن يفضل تعديل قسمها إذا رغبت.`)) return;
            savedArticleCategories = getMergedArticleCategories().filter(c => c.ar !== arName);
            await authorizedFetch(API_URL + '/settings.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ article_categories: JSON.stringify(savedArticleCategories) })
            });
            renderCategoriesModalList();
            showToast('تم حذف القسم بنجاح');
        }

        function populateCategorySelect(selectedAr = '', selectedEn = '') {
            const sel = document.getElementById('item-category-select');
            if (!sel) return;
            const cats = getMergedArticleCategories();
            sel.replaceChildren();
            sel.add(new Option('-- اختر قسم المقال --', ''));
            let matched = false;
            cats.forEach((c, idx) => {
                const option = new Option(`${c.ar} (${c.en})`, String(idx));
                option.dataset.ar = c.ar;
                option.dataset.en = c.en;
                option.selected = Boolean(selectedAr && c.ar === selectedAr);
                if (option.selected) matched = true;
                sel.add(option);
            });
            if (selectedAr && !matched) {
                const option = new Option(`${selectedAr} (${selectedEn || selectedAr})`, 'custom_sel');
                option.dataset.ar = selectedAr;
                option.dataset.en = selectedEn;
                option.selected = true;
                sel.add(option);
                matched = true;
            }
            const newOption = new Option('+ إضافة قسم جديد...', 'new');
            newOption.className = 'fw-bold text-primary';
            sel.add(newOption);
            
            if (!selectedAr && cats.length > 0) {
                sel.selectedIndex = 1;
            }
            onCategorySelectChange();
        }

        function onCategorySelectChange() {
            const sel = document.getElementById('item-category-select');
            if (!sel) return;
            if (sel.value === 'new') {
                document.getElementById('custom-category-inputs').style.display = 'block';
                document.getElementById('item-category').value = '';
                document.getElementById('item-category_en').value = '';
            } else if (sel.value !== '' && sel.value !== 'custom_sel') {
                document.getElementById('custom-category-inputs').style.display = 'none';
                const opt = sel.options[sel.selectedIndex];
                document.getElementById('item-category').value = opt.getAttribute('data-ar') || '';
                document.getElementById('item-category_en').value = opt.getAttribute('data-en') || '';
            } else {
                document.getElementById('custom-category-inputs').style.display = 'none';
            }
        }

        function showModal(type) {
            document.getElementById('item-id').value = ''; document.getElementById('item-type').value = type;
            ['title','icon','description', 'title_en', 'description_en'].forEach(id => { if(document.getElementById(`item-${id}`)) document.getElementById(`item-${id}`).value = ''; });
            document.getElementById('item-image').value = '/images/placeholder.jpg'; document.getElementById('item-image-preview').src = '/images/placeholder.jpg';
            document.getElementById('item-verified').checked = false;
            document.getElementById('div-verified').style.display = type === 'testimonial' ? 'block' : 'none';
            $('#item-content').summernote('code', '');
            $('#item-content_en').summernote('code', '');
            
            document.getElementById('div-category').style.display = type === 'article' ? 'block' : 'none';
            if (document.getElementById('div-video')) document.getElementById('div-video').style.display = type === 'article' ? 'block' : 'none';
            if (type === 'article') { populateCategorySelect(); if (document.getElementById('item-video')) document.getElementById('item-video').value = ''; }
            document.getElementById('div-description').style.display = ['service', 'sector', 'feature'].includes(type) ? 'block' : 'none';
            document.getElementById('div-description-en').style.display = ['service', 'sector', 'feature'].includes(type) ? 'block' : 'none';
            document.getElementById('div-icon').style.display = ['stat', 'testimonial', 'feature'].includes(type) ? 'block' : 'none';
            document.getElementById('item-image').parentElement.style.display = type === 'stat' || type === 'testimonial' ? 'none' : 'block';
            
            if(type === 'stat' || type === 'testimonial') { document.getElementById('item-content').parentElement.style.display = type==='testimonial' ? 'block' : 'none'; document.getElementById('item-content_en').parentElement.style.display = type==='testimonial' ? 'block' : 'none'; document.getElementById('lbl-title').innerText = type==='stat'?'الرقم/العنوان':'اسم العميل'; if(document.getElementById('lbl-title-en')) document.getElementById('lbl-title-en').innerText = type==='stat'?'Value / Title (English)':'Client Name (English)'; if(document.getElementById('div-icon').querySelector('label')) document.getElementById('div-icon').querySelector('label').innerText = type==='stat'?'القيمة (أو أيقونة)':'الوظيفة/الشركة'; if(document.getElementById('lbl-icon-en')) document.getElementById('lbl-icon-en').innerText = type==='stat'?'Value (English)':'Position/Company (English)'; }
            else { document.getElementById('lbl-title').innerText = 'العنوان';
              if(document.getElementById('lbl-title-en')) document.getElementById('lbl-title-en').innerText = 'Title (English)'; document.getElementById('item-content').parentElement.style.display = 'block'; document.getElementById('item-content_en').parentElement.style.display = 'block'; if(document.getElementById('div-icon').querySelector('label')) document.getElementById('div-icon').querySelector('label').innerText = 'رمز الأيقونة'; if(document.getElementById('lbl-icon-en')) document.getElementById('lbl-icon-en').innerText = 'Icon Code (English)'; }
            
            modal.show();
        }

        function editItem(typePlural, id) {
            const type = typePlural.slice(0, -1);
            const item = dataStore[typePlural].find(x => x.id == id);
            showModal(type);
            document.getElementById('item-id').value = item.id;
            
            if(type === 'stat') { document.getElementById('item-title').value = item.title; document.getElementById('item-title_en').value = item.title_en || ''; document.getElementById('item-icon').value = item.value; if(document.getElementById('item-icon_en')) document.getElementById('item-icon_en').value = item.value_en || ''; }
            else if(type === 'testimonial') { document.getElementById('item-title').value = item.name; document.getElementById('item-title_en').value = item.name_en || ''; document.getElementById('item-icon').value = item.position; if(document.getElementById('item-icon_en')) document.getElementById('item-icon_en').value = item.position_en || ''; document.getElementById('item-verified').checked = Number(item.is_verified) === 1; $('#item-content').summernote('code', item.content); $('#item-content_en').summernote('code', item.content_en || ''); }
            else { 
                document.getElementById('item-title').value = item.title; $('#item-content').summernote('code', item.content); 
                document.getElementById('item-title_en').value = item.title_en || ''; $('#item-content_en').summernote('code', item.content_en || '');
            }
            
            if(type === 'article') {
                populateCategorySelect(item.category, item.category_en);
                if (document.getElementById('item-video')) document.getElementById('item-video').value = item.video_url || '';
            }
            if(['service', 'sector', 'feature'].includes(type)) {
                document.getElementById('item-description').value = item.description;
                document.getElementById('item-description_en').value = item.description_en || '';
            }
            if(type === 'feature') {
                document.getElementById('item-icon').value = item.icon;
                document.getElementById('item-content').parentElement.style.display = 'none';
                document.getElementById('item-content_en').parentElement.style.display = 'none';
            }
            if(item.image) { document.getElementById('item-image').value = item.image; document.getElementById('item-image-preview').src = item.image; }
        }

        async function saveItem() {
            const id = document.getElementById('item-id').value;
            const type = document.getElementById('item-type').value;
            const typePlural = type + 's';
            let data = { id: id };
            if(type === 'stat') { 
                data.title = document.getElementById('item-title').value; 
                data.title_en = document.getElementById('item-title_en') ? document.getElementById('item-title_en').value : '';
                data.value = document.getElementById('item-icon').value; 
                data.value_en = document.getElementById('item-icon_en') ? document.getElementById('item-icon_en').value : '';
            }
            else if(type === 'testimonial') { 
                data.name = document.getElementById('item-title').value; 
                data.name_en = document.getElementById('item-title_en') ? document.getElementById('item-title_en').value : '';
                data.position = document.getElementById('item-icon').value; 
                data.position_en = document.getElementById('item-icon_en') ? document.getElementById('item-icon_en').value : '';
                data.content = $('#item-content').summernote('code'); 
                data.content_en = $('#item-content_en').length ? $('#item-content_en').summernote('code') : '';
                data.is_verified = document.getElementById('item-verified').checked;
            }
            else { 
                data.title = document.getElementById('item-title').value; 
                data.title_en = document.getElementById('item-title_en') ? document.getElementById('item-title_en').value : ''; 
                data.content = $('#item-content').summernote('code'); 
                data.content_en = $('#item-content_en').length ? $('#item-content_en').summernote('code') : ''; 
            }
            
            if(type === 'article') { 
                data.category = document.getElementById('item-category').value; 
                data.category_en = document.getElementById('item-category_en') ? document.getElementById('item-category_en').value : ''; 
                data.video_url = document.getElementById('item-video') ? document.getElementById('item-video').value : '';
                if (document.getElementById('item-category-select') && document.getElementById('item-category-select').value === 'new') {
                    saveNewCategoryToSettings(data.category, data.category_en);
                }
            }
            if(['service', 'sector'].includes(type)) { 
                data.description = document.getElementById('item-description').value; 
                data.description_en = document.getElementById('item-description_en') ? document.getElementById('item-description_en').value : ''; 
            }
            
            if(['article','sector','service'].includes(type)) data.image = document.getElementById('item-image').value;
            if (type === 'article') {
                const vidId = extractYoutubeId(data.video_url);
                if (vidId && (!data.image || data.image === '' || data.image === '/images/placeholder.jpg' || data.image === '/images/articles/placeholder.jpg')) {
                    data.image = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
                }
            }
            if(type === 'feature') {
                data.icon = document.getElementById('item-icon').value;
                data.description = document.getElementById('item-description').value;
                data.description_en = document.getElementById('item-description_en') ? document.getElementById('item-description_en').value : '';
            }
            
            try {
                const response = await authorizedFetch(`${API_URL}/${typePlural}.php`, {
                    method: id ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (!response.ok) {
                    showToast(result.error || 'تعذر حفظ البيانات', true);
                    return;
                }
                showToast('تم الحفظ');
                modal.hide();
                loadItems(typePlural);
            } catch(e) { showToast('خطأ', true); }
        }

        async function deleteItem(typePlural, id) {
            if(confirm('متأكد؟')) {
                const response = await authorizedFetch(`${API_URL}/${typePlural}.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
                const result = await response.json();
                if (!response.ok) {
                    showToast(result.error || 'تعذر حذف العنصر', true);
                    return;
                }
                loadItems(typePlural);
                showToast('تم الحذف');
            }
        }

        // Media
        async function loadMedia() {
            const res = await authorizedFetch(`${API_URL}/media.php`);
            const files = await res.json();
            const g = document.getElementById('media-gallery');
            g.replaceChildren();
            files.forEach(f => g.appendChild(createMediaCard(f, false)));
        }
        async function openMediaPicker(targetId, isEditor = false) {
            mediaPickerTargetInputId = targetId; mediaPickerModal.show();
            const res = await authorizedFetch(`${API_URL}/media.php`);
            const files = await res.json();
            const g = document.getElementById('media-picker-gallery');
            g.replaceChildren();
            files.forEach(f => g.appendChild(createMediaCard(f, true, isEditor)));
        }

        function createMediaCard(file, picker, isEditor = false) {
            const wrapper = document.createElement('div');
            wrapper.className = 'col-md-2 col-4';
            const image = document.createElement('img');
            image.src = file.url;
            image.alt = file.name || '';
            image.loading = 'lazy';
            image.style.cssText = 'height:100px;width:100%;object-fit:cover;';

            if (picker) {
                image.className = 'img-thumbnail';
                image.style.cursor = 'pointer';
                image.addEventListener('click', () => selectMediaForPicker(file.url, isEditor));
                wrapper.appendChild(image);
                return wrapper;
            }

            const card = document.createElement('div');
            card.className = 'card overflow-hidden';
            const controls = document.createElement('div');
            controls.className = 'btn-group w-100';
            const copyButton = document.createElement('button');
            copyButton.type = 'button';
            copyButton.className = 'btn btn-sm btn-light';
            copyButton.textContent = 'نسخ';
            copyButton.addEventListener('click', () => navigator.clipboard.writeText(file.url));
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'btn btn-sm btn-danger';
            deleteButton.textContent = 'حذف';
            deleteButton.addEventListener('click', () => deleteMedia(file.name));
            controls.append(copyButton, deleteButton);
            card.append(image, controls);
            wrapper.appendChild(card);
            return wrapper;
        }
        function selectMediaForPicker(url, isEditor) {
            if(isEditor && activeSummernote) activeSummernote.invoke('editor.insertImage', url);
            else if(mediaPickerTargetInputId) { document.getElementById(mediaPickerTargetInputId).value = url; document.getElementById(mediaPickerTargetInputId).dispatchEvent(new Event('change')); }
            mediaPickerModal.hide();
        }
        async function deleteMedia(filename) {
            if(confirm('متأكد؟')) {
                const response = await authorizedFetch(`${API_URL}/media.php?file=${encodeURIComponent(filename)}`, { method: 'DELETE' });
                const result = await response.json();
                if (!response.ok) {
                    showToast(result.error || 'تعذر حذف الصورة', true);
                    return;
                }
                loadMedia();
            }
        }
        async function handleMediaUpload(input) {
            const formData = new FormData(); formData.append('image', input.files[0]);
            await fetch(`${API_URL}/upload.php`, { method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: formData });
            loadMedia(); input.value = '';
        }
    </script>
</body>
</html>
