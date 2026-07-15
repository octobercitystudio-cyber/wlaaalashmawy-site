<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم | وليد العشماوي</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Bootstrap 5 RTL -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    
    <!-- Summernote -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        :root {
            --primary: #0f172a;
            --secondary: #1e293b;
            --accent: #d4af37; /* Gold */
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
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01); 
            border-radius: 16px; 
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
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
        .btn-gold:hover { background: var(--accent-hover); color: white; transform: translateY(-1px); }

        /* Login Screen */
        #login-screen { 
            display: flex; align-items: center; justify-content: center; height: 100vh; 
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }
        #login-screen .card { padding: 40px; border-radius: 20px; background: rgba(255,255,255,0.9); }

        /* Navigation */
        .nav-link { cursor: pointer; color: #94a3b8 !important; padding: 12px 16px; border-radius: 10px; margin-bottom: 5px; font-weight: 600; display: flex; align-items: center; gap: 10px; transition: all 0.3s; }
        .nav-link:hover { color: white !important; background: rgba(255,255,255,0.05); }
        .nav-link.active { color: white !important; background: var(--accent); box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); }

        .section-container { display: none; animation: fadeIn 0.4s ease; }
        .section-container.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Tables */
        .table { vertical-align: middle; }
        .table thead th { border-bottom: 2px solid #e2e8f0; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.5px; }
        .table tbody tr { transition: all 0.2s; }
        .table tbody tr:hover { background-color: #f8fafc; }
        
        .tox-notifications-container { display: none !important; }

        /* Toast positioning */
        .toast-container { position: fixed; bottom: 20px; left: 20px; z-index: 1055; }
        .toast { background: var(--primary); color: white; border: none; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    </style>
</head>
<body>

    <!-- Toast Notifications -->
    <div class="toast-container">
        <div id="liveToast" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
            <div class="d-flex">
                <div class="toast-body fw-bold" id="toastMessage">
                    تمت العملية بنجاح.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>

    <!-- Mobile Toggle -->
    <button class="mobile-toggle" onclick="document.querySelector('.sidebar').classList.toggle('show')">
        <i class="bi bi-list fs-4"></i>
    </button>

    <!-- Login Screen -->
    <div id="login-screen">
        <div class="card" style="width: 420px; max-width: 90%;">
            <div class="text-center mb-4">
                <div style="width: 70px; height: 70px; background: var(--primary); color: var(--accent); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; font-size: 32px; margin-bottom: 15px;">
                    <i class="bi bi-shield-lock-fill"></i>
                </div>
                <h3 class="fw-bold" style="color: var(--primary);">تسجيل الدخول</h3>
                <p class="text-muted">اللوحة الإدارية - مكتب العشماوي</p>
            </div>
            <div class="mb-4">
                <label class="form-label text-muted fw-bold">كلمة المرور</label>
                <input type="password" id="password" class="form-control form-control-lg bg-light border-0" style="border-radius: 10px;" placeholder="أدخل كلمة المرور">
            </div>
            <button onclick="login()" class="btn btn-gold w-100 btn-lg">دخول للوحة</button>
            <div id="login-error" class="text-danger mt-3 text-center fw-bold" style="display:none;"></div>
        </div>
    </div>

    <!-- Dashboard Screen -->
    <div id="dashboard-screen" style="display: none;">
        <!-- Sidebar -->
        <div class="sidebar d-flex flex-column">
            <div class="text-center mb-4 mt-2">
                <h4 class="text-white fw-bold mb-0">وليد العشماوي</h4>
                <small class="text-muted" style="color: var(--accent) !important;">لوحة التحكم الشاملة</small>
            </div>
            
            <ul class="nav flex-column mb-auto">
                <li class="nav-item mb-2">
                    <a class="nav-link active" onclick="switchTab('home')"><i class="bi bi-grid-1x2-fill"></i> الرئيسية والإحصائيات</a>
                </li>
                
                <h6 class="text-uppercase mt-4 mb-2 px-3 text-muted" style="font-size: 0.75rem; letter-spacing: 1px;">إدارة المحتوى</h6>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('articles')"><i class="bi bi-journal-text"></i> المقالات والمدونة</a></li>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('services')"><i class="bi bi-briefcase-fill"></i> الخدمات المحاسبية</a></li>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('sectors')"><i class="bi bi-buildings-fill"></i> قطاعات الأعمال</a></li>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('features')"><i class="bi bi-star-fill"></i> المميزات التنافسية</a></li>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('stats')"><i class="bi bi-bar-chart-fill"></i> الأرقام والإحصائيات</a></li>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('testimonials')"><i class="bi bi-chat-quote-fill"></i> آراء العملاء</a></li>

                <h6 class="text-uppercase mt-4 mb-2 px-3 text-muted" style="font-size: 0.75rem; letter-spacing: 1px;">الإعدادات والنظام</h6>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('media')"><i class="bi bi-images"></i> مكتبة الوسائط</a></li>
                <li class="nav-item"><a class="nav-link" onclick="switchTab('settings')"><i class="bi bi-gear-fill"></i> إعدادات الموقع</a></li>
            </ul>
            
            <hr class="border-secondary my-3">
            <a class="nav-link text-danger" onclick="logout()"><i class="bi bi-box-arrow-right"></i> تسجيل الخروج</a>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            
            <!-- Home / Analytics Section -->
            <div id="sec-home" class="section-container active">
                <div class="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 class="fw-bold mb-1">مرحباً بك في لوحة القيادة 👋</h2>
                        <p class="text-muted">نظرة عامة على أداء موقعك وإحصائيات الزوار</p>
                    </div>
                </div>
                
                <!-- Stat Cards -->
                <div class="row g-4 mb-5">
                    <div class="col-md-3 col-sm-6">
                        <div class="card stat-card p-4 h-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1 fw-bold">إجمالي الزيارات</p>
                                    <h3 class="fw-bold mb-0" id="stat-total-visits">--</h3>
                                </div>
                                <div class="stat-icon"><i class="bi bi-eye-fill"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="card stat-card p-4 h-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1 fw-bold">الزوار الفريدين</p>
                                    <h3 class="fw-bold mb-0" id="stat-unique-visitors">--</h3>
                                </div>
                                <div class="stat-icon"><i class="bi bi-people-fill"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="card stat-card p-4 h-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1 fw-bold">المقالات المنشورة</p>
                                    <h3 class="fw-bold mb-0" id="stat-articles">--</h3>
                                </div>
                                <div class="stat-icon"><i class="bi bi-journal-check"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-6">
                        <div class="card stat-card p-4 h-100">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <p class="text-muted mb-1 fw-bold">الخدمات</p>
                                    <h3 class="fw-bold mb-0" id="stat-services">--</h3>
                                </div>
                                <div class="stat-icon"><i class="bi bi-briefcase-fill"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row g-4">
                    <!-- Chart -->
                    <div class="col-md-8">
                        <div class="card p-4 h-100">
                            <h5 class="fw-bold mb-4">الزيارات في آخر 7 أيام</h5>
                            <canvas id="visitsChart" height="100"></canvas>
                        </div>
                    </div>
                    <!-- Top Pages -->
                    <div class="col-md-4">
                        <div class="card p-4 h-100">
                            <h5 class="fw-bold mb-4">أعلى الصفحات زيارة</h5>
                            <div id="top-pages-list" class="d-flex flex-column gap-3">
                                <!-- Populated dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Articles Section -->
            <div id="sec-articles" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">إدارة المقالات</h2>
                    <button class="btn btn-gold shadow-sm" onclick="showModal('article')"><i class="bi bi-plus-lg"></i> إضافة مقال</button>
                </div>
                <div class="card p-3">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead><tr><th>الصورة</th><th>العنوان</th><th>القسم</th><th>الإجراءات</th></tr></thead>
                            <tbody id="articles-table"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Services Section -->
            <div id="sec-services" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">إدارة الخدمات</h2>
                    <button class="btn btn-gold shadow-sm" onclick="showModal('service')"><i class="bi bi-plus-lg"></i> إضافة خدمة</button>
                </div>
                <div class="card p-3">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead><tr><th>اسم الخدمة</th><th>الوصف القصير</th><th>الإجراءات</th></tr></thead>
                            <tbody id="services-table"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Sectors Section -->
            <div id="sec-sectors" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">إدارة القطاعات</h2>
                    <button class="btn btn-gold shadow-sm" onclick="showModal('sector')"><i class="bi bi-plus-lg"></i> إضافة قطاع</button>
                </div>
                <div class="card p-3">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead><tr><th>القطاع</th><th>الإجراءات</th></tr></thead>
                            <tbody id="sectors-table"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <div id="sec-features" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">المميزات التنافسية</h2>
                    <button class="btn btn-gold shadow-sm" onclick="showModal('feature')"><i class="bi bi-plus-lg"></i> إضافة ميزة</button>
                </div>
                <div class="card p-3">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead><tr><th>العنوان</th><th>الوصف</th><th>الأيقونة</th><th>الإجراءات</th></tr></thead>
                            <tbody id="features-table"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Stats Section -->
            <div id="sec-stats" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">إدارة أرقام وإحصائيات النجاح</h2>
                    <button class="btn btn-gold shadow-sm" onclick="showModal('stat')"><i class="bi bi-plus-lg"></i> إضافة رقم</button>
                </div>
                <div class="card p-3">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead><tr><th>العنوان</th><th>القيمة (الرقم)</th><th>الإجراءات</th></tr></thead>
                            <tbody id="stats-table"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Testimonials Section -->
            <div id="sec-testimonials" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">آراء العملاء</h2>
                    <button class="btn btn-gold shadow-sm" onclick="showModal('testimonial')"><i class="bi bi-plus-lg"></i> إضافة رأي</button>
                </div>
                <div class="card p-3">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead><tr><th>الاسم</th><th>المنصب</th><th>الرأي</th><th>الإجراءات</th></tr></thead>
                            <tbody id="testimonials-table"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Media Library Section -->
            <div id="sec-media" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">مكتبة الوسائط والصور</h2>
                    <div>
                        <input type="file" id="media-upload-input" style="display: none;" accept="image/*" onchange="handleMediaUpload(this)">
                        <button class="btn btn-gold shadow-sm" onclick="document.getElementById('media-upload-input').click()"><i class="bi bi-upload"></i> رفع صورة جديدة</button>
                    </div>
                </div>
                <div class="card p-4">
                    <div id="media-gallery" class="row g-4">
                        <!-- Media items will be loaded here -->
                    </div>
                </div>
            </div>

            <!-- Settings Section -->
            <div id="sec-settings" class="section-container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">إعدادات ونصوص الموقع</h2>
                    <button class="btn btn-gold shadow-sm px-4" onclick="saveSettings()"><i class="bi bi-save-fill me-2"></i> حفظ الإعدادات</button>
                </div>
                <div class="card p-4">
                    <form id="settings-form">
                        <div class="row g-4">
                            <div class="col-12">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-card-text"></i> نبذة عن الشركة (في الصفحة الرئيسية)</label>
                                <textarea class="form-control summernote-settings" id="setting_about_short" rows="3"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-book"></i> عن الشركة (في صفحة من نحن)</label>
                                <textarea class="form-control summernote-settings" id="setting_about_full" rows="6"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-eye"></i> الرؤية</label>
                                <textarea class="form-control summernote-settings" id="setting_vision" rows="3"></textarea>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-bullseye"></i> الرسالة</label>
                                <textarea class="form-control summernote-settings" id="setting_mission" rows="3"></textarea>
                            </div>
                            
                            <h5 class="fw-bold mt-5 mb-2 border-bottom pb-2">بيانات التواصل</h5>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-telephone"></i> رقم الهاتف الأساسي</label>
                                <input type="text" class="form-control form-control-lg bg-light" id="setting_contact_phone" dir="ltr" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-whatsapp"></i> رقم الواتساب</label>
                                <input type="text" class="form-control form-control-lg bg-light" id="setting_contact_whatsapp" dir="ltr" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-envelope"></i> البريد الإلكتروني</label>
                                <input type="email" class="form-control form-control-lg bg-light" id="setting_contact_email" dir="ltr" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-geo-alt"></i> العنوان</label>
                                <input type="text" class="form-control form-control-lg bg-light" id="setting_contact_address" />
                            </div>
                            
                            <h5 class="fw-bold mt-5 mb-2 border-bottom pb-2">حسابات التواصل الاجتماعي</h5>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-facebook text-primary"></i> رابط الفيسبوك</label>
                                <input type="text" class="form-control form-control-lg bg-light" id="setting_social_facebook" dir="ltr" />
                            </div>
                            <div class="col-md-6">
                                <label class="form-label text-secondary fw-bold"><i class="bi bi-linkedin text-primary"></i> رابط لينكد إن</label>
                                <input type="text" class="form-control form-control-lg bg-light" id="setting_social_linkedin" dir="ltr" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

    <!-- Generic Modal for Articles/Services/Sectors -->
    <div class="modal fade" id="genericModal" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
                <div class="modal-header bg-light border-0 px-4 py-3" style="border-radius: 16px 16px 0 0;">
                    <h5 class="modal-title fw-bold" id="modalTitle">إضافة</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 py-4">
                    <input type="hidden" id="item-id">
                    <input type="hidden" id="item-type">
                    
                    <div class="row g-4">
                        <div class="col-md-8">
                            <div class="mb-4">
                                <label id="lbl-title" class="form-label fw-bold">العنوان</label>
                                <input type="text" class="form-control form-control-lg bg-light" id="item-title">
                            </div>

                            <div class="mb-4" id="div-description" style="display:none;">
                                <label class="form-label fw-bold">وصف قصير (يظهر في القوائم)</label>
                                <textarea class="form-control bg-light" id="item-description" rows="3"></textarea>
                            </div>

                            <div class="mb-0">
                                <label class="form-label fw-bold">المحتوى التفصيلي</label>
                                <textarea class="form-control" id="item-content" rows="6"></textarea>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card bg-light p-3 border-0 h-100">
                                <h6 class="fw-bold mb-3 border-bottom pb-2">خيارات إضافية</h6>
                                
                                <div class="mb-3" id="div-category" style="display:none;">
                                    <label class="form-label text-muted small fw-bold">القسم</label>
                                    <select class="form-select bg-white" id="item-category">
                                        <option>الاستشارات المحاسبية</option>
                                        <option>الاستشارات الضريبية</option>
                                        <option>المراجعة والتدقيق</option>
                                        <option>تأسيس الشركات</option>
                                        <option>الاستشارات المالية</option>
                                    </select>
                                </div>

                                <div class="mb-3" id="div-icon" style="display:none;">
                                    <label class="form-label text-muted small fw-bold">اسم الأيقونة (مثال: FileText)</label>
                                    <input type="text" class="form-control bg-white" id="item-icon">
                                </div>

                                <div class="mb-3" id="div-image" style="display:none;">
                                    <label class="form-label text-muted small fw-bold">الصورة البارزة</label>
                                    <div class="text-center mb-2">
                                        <img id="item-image-preview" src="/images/placeholder.jpg" class="img-fluid rounded shadow-sm" style="height: 120px; object-fit: cover; width: 100%; border: 2px dashed #cbd5e1;">
                                    </div>
                                    <input type="hidden" id="item-image" value="/images/placeholder.jpg">
                                    <button class="btn btn-outline-primary w-100 btn-sm" type="button" onclick="openMediaPicker('item-image')"><i class="bi bi-image"></i> اختيار صورة</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 px-4 py-3 bg-light" style="border-radius: 0 0 16px 16px;">
                    <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">إلغاء</button>
                    <button type="button" class="btn btn-gold px-5" onclick="saveItem()"><i class="bi bi-save"></i> حفظ ونشر</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Media Picker Modal -->
    <div class="modal fade" id="mediaPickerModal" tabindex="-1" style="z-index: 1060;">
        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 16px;">
                <div class="modal-header bg-light border-0">
                    <h5 class="modal-title fw-bold"><i class="bi bi-images text-primary"></i> مكتبة الصور</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-4 bg-light">
                    <div id="media-picker-gallery" class="row g-3">
                        <div class="col-12 text-center text-muted py-5"><div class="spinner-border text-primary" role="status"></div></div>
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
        let activeSummernote = null;
        let chartInstance = null;

        function showToast(msg, isError = false) {
            const toastEl = document.getElementById('liveToast');
            document.getElementById('toastMessage').innerText = msg;
            toastEl.classList.remove('bg-danger', 'bg-success', 'var(--primary)');
            if (isError) toastEl.classList.add('bg-danger');
            else toastEl.style.backgroundColor = 'var(--accent)';
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }

        document.addEventListener('DOMContentLoaded', () => {
            modal = new bootstrap.Modal(document.getElementById('genericModal'));
            mediaPickerModal = new bootstrap.Modal(document.getElementById('mediaPickerModal'));
            if(localStorage.getItem('token')) {
                showDashboard();
            }
            
            const summernoteOptions = {
                height: 350,
                direction: 'rtl',
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'customMedia', 'video']],
                    ['view', ['fullscreen', 'codeview']]
                ],
                buttons: {
                    customMedia: function (context) {
                        var ui = $.summernote.ui;
                        var button = ui.button({
                            contents: '<i class="bi bi-image"></i> صورة من المكتبة',
                            tooltip: 'إدراج صورة من المكتبة',
                            className: 'btn btn-light btn-sm',
                            click: function () {
                                activeSummernote = context;
                                openMediaPicker(null, true);
                            }
                        });
                        return button.render();
                    }
                }
            };
            
            $('#item-content').summernote({ ...summernoteOptions, height: 450 });
            $('.summernote-settings').summernote({ ...summernoteOptions, height: 200 });

            // Preview image when input changes
            document.getElementById('item-image').addEventListener('change', function() {
                document.getElementById('item-image-preview').src = this.value;
            });
        });

        function showDashboard() {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('dashboard-screen').style.display = 'block';
            loadAllData();
            loadAnalytics();
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
                showToast('فشل الاتصال بالسيرفر', true);
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
            
            // Find nav link
            const links = document.querySelectorAll('.nav-link');
            for(let link of links) {
                if(link.getAttribute('onclick') === `switchTab('${tabId}')`) {
                    link.classList.add('active');
                }
            }

            if(window.innerWidth <= 768) {
                document.querySelector('.sidebar').classList.remove('show');
            }

            if(tabId === 'media') loadMedia();
            if(tabId === 'home') loadAnalytics();
        }

        async function loadAnalytics() {
            try {
                const res = await fetch(`${API_URL}/analytics.php`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                const stats = await res.json();
                
                document.getElementById('stat-total-visits').innerText = stats.total_visits || '0';
                document.getElementById('stat-unique-visitors').innerText = stats.unique_visitors || '0';
                document.getElementById('stat-articles').innerText = stats.articles_count || '0';
                document.getElementById('stat-services').innerText = stats.services_count || '0';

                // Chart
                if(stats.chart_data) {
                    const labels = stats.chart_data.map(d => d.date);
                    const data = stats.chart_data.map(d => d.count);
                    
                    const ctx = document.getElementById('visitsChart').getContext('2d');
                    if(chartInstance) chartInstance.destroy();
                    
                    chartInstance = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: 'عدد الزيارات',
                                data: data,
                                borderColor: '#d4af37',
                                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                                borderWidth: 3,
                                tension: 0.4,
                                fill: true
                            }]
                        },
                        options: {
                            responsive: true,
                            plugins: { legend: { display: false } },
                            scales: {
                                y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                                x: { grid: { display: false } }
                            }
                        }
                    });
                }

                // Top Pages
                const pagesContainer = document.getElementById('top-pages-list');
                pagesContainer.innerHTML = '';
                if(stats.top_pages && stats.top_pages.length > 0) {
                    stats.top_pages.forEach(p => {
                        pagesContainer.innerHTML += `
                            <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
                                <span class="text-truncate" style="max-width: 70%;" dir="ltr">${p.page_path}</span>
                                <span class="badge bg-primary rounded-pill px-3 py-2">${p.count} زيارة</span>
                            </div>
                        `;
                    });
                } else {
                    pagesContainer.innerHTML = '<p class="text-muted text-center mt-3">لا توجد بيانات كافية</p>';
                }

            } catch (e) {
                console.error("Failed to load analytics", e);
            }
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
                    if(el) {
                        if (el.classList.contains('summernote-settings')) {
                            $(el).summernote('code', settings[key]);
                        } else {
                            el.value = settings[key];
                        }
                    }
                }
            } catch(e) { console.error('Error loading settings', e); }
        }

        async function saveSettings() {
            let data = {};
            const keys = ['hero_title', 'hero_subtitle', 'about_short', 'about_full', 'vision', 'mission', 'contact_phone', 'contact_whatsapp', 'contact_email', 'contact_address', 'social_facebook', 'social_linkedin'];
            keys.forEach(k => {
                const el = document.getElementById(`setting_${k}`);
                if(el) {
                    if (el.classList.contains('summernote-settings')) {
                        data[k] = $(el).summernote('code');
                    } else {
                        data[k] = el.value;
                    }
                }
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
                    showToast('تم حفظ الإعدادات بنجاح! ✨');
                } else {
                    showToast('حدث خطأ أثناء الحفظ', true);
                }
            } catch(e) { showToast('خطأ في الاتصال', true); }
        }

        async function loadMedia() {
            const gallery = document.getElementById('media-gallery');
            gallery.innerHTML = '<div class="col-12 text-center text-muted py-5"><div class="spinner-border text-primary" role="status"></div></div>';
            try {
                const res = await fetch(`${API_URL}/media.php`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                const files = await res.json();
                gallery.innerHTML = '';
                if(files.length === 0) {
                    gallery.innerHTML = '<div class="col-12 text-center text-muted py-5">لا توجد صور مرفوعة بعد.</div>';
                    return;
                }
                files.forEach(file => {
                    gallery.innerHTML += `
                        <div class="col-md-3 col-sm-4 col-6">
                            <div class="card h-100 overflow-hidden border">
                                <img src="${file.url}" class="card-img-top" alt="${file.name}" style="height: 160px; object-fit: cover; background:#eee;">
                                <div class="card-body p-3 text-center bg-white">
                                    <small class="d-block text-truncate mb-3 text-secondary" title="${file.name}">${file.name}</small>
                                    <div class="btn-group w-100">
                                        <button class="btn btn-sm btn-outline-secondary" onclick="copyToClipboard('${file.url}')"><i class="bi bi-link-45deg"></i> نسخ</button>
                                        <button class="btn btn-sm btn-outline-danger" onclick="deleteMedia('${file.name}')"><i class="bi bi-trash"></i></button>
                                    </div>
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
            gallery.innerHTML = '<div class="col-12 text-center text-muted py-5"><div class="spinner-border text-primary" role="status"></div></div>';
            try {
                const res = await fetch(`${API_URL}/media.php`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
                const files = await res.json();
                gallery.innerHTML = '';
                if(files.length === 0) {
                    gallery.innerHTML = '<div class="col-12 text-center text-muted py-5">لا توجد صور مرفوعة. ارفع صورة أولاً.</div>';
                    return;
                }
                files.forEach(file => {
                    gallery.innerHTML += `
                        <div class="col-md-2 col-sm-3 col-4">
                            <div class="card h-100 border overflow-hidden" style="cursor: pointer; transition: transform 0.2s;" onclick="selectMediaForPicker('${file.url}', ${isTinyMCE})" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                                <img src="${file.url}" class="card-img-top" alt="${file.name}" style="height: 120px; object-fit: cover;">
                            </div>
                        </div>
                    `;
                });
            } catch(e) { console.error('Error loading media', e); }
        }

        function selectMediaForPicker(url, isEditor) {
            if(isEditor && activeSummernote) {
                activeSummernote.invoke('editor.insertImage', url);
                activeSummernote = null;
            } else if(mediaPickerTargetInputId) {
                const el = document.getElementById(mediaPickerTargetInputId);
                if(el) {
                    el.value = url;
                    // trigger change event to update preview
                    el.dispatchEvent(new Event('change'));
                }
            }
            mediaPickerModal.hide();
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => showToast('تم نسخ الرابط!'));
        }

        async function deleteMedia(filename) {
            if(!confirm('هل أنت متأكد من حذف هذه الصورة نهائياً؟')) return;
            try {
                await fetch(`${API_URL}/media.php?file=${encodeURIComponent(filename)}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                showToast('تم الحذف بنجاح');
                loadMedia();
            } catch(e) { showToast('خطأ في الحذف', true); }
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
                    showToast('تم الرفع بنجاح!');
                    loadMedia();
                } else {
                    showToast(data.error || 'خطأ في الرفع', true);
                }
            } catch(e) {
                showToast('خطأ في الرفع', true);
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
            if(!tbody) return;
            tbody.innerHTML = '';
            
            if(dataStore[type].length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">لا توجد بيانات بعد.</td></tr>`;
                return;
            }

            dataStore[type].forEach(item => {
                let columns = '';
                let imgCol = '';
                
                if (item.image) {
                    imgCol = `<td><img src="${item.image}" class="rounded shadow-sm" style="width: 50px; height: 50px; object-fit: cover;"></td>`;
                }

                if(type === 'articles') {
                    columns = `${imgCol}<td><span class="fw-bold">${item.title}</span></td><td><span class="badge bg-light text-dark border">${item.category}</span></td>`;
                } else if(type === 'services') {
                    columns = `<td><span class="fw-bold">${item.title}</span></td><td><span class="text-muted small">${item.description ? item.description.substring(0,40) : ''}...</span></td>`;
                } else if(type === 'sectors') {
                    columns = `<td><span class="fw-bold">${item.title}</span></td>`;
                } else if(type === 'features') {
                    columns = `<td><span class="fw-bold">${item.title}</span></td><td><span class="text-muted small">${item.description ? item.description.substring(0,40) : ''}...</span></td><td><i class="bi bi-${item.icon} text-primary fs-5"></i></td>`;
                } else if(type === 'stats') {
                    columns = `<td><span class="fw-bold">${item.title}</span></td><td><span class="badge bg-gold px-3 text-dark" style="background-color: var(--accent); color:white!important;">${item.value}</span></td>`;
                } else if(type === 'testimonials') {
                    columns = `<td><span class="fw-bold">${item.name}</span></td><td><span class="badge bg-light text-dark border">${item.position}</span></td><td><span class="text-muted small">${item.content ? item.content.substring(0,40) : ''}...</span></td>`;
                }

                tbody.innerHTML += `
                    <tr>
                        ${columns}
                        <td style="white-space: nowrap;">
                            <button class="btn btn-sm btn-light border text-primary me-1" onclick="editItem('${type}', ${item.id})" title="تعديل"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn btn-sm btn-light border text-danger" onclick="deleteItem('${type}', ${item.id})" title="حذف"><i class="bi bi-trash"></i></button>
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
            document.getElementById('item-description').value = '';
            document.getElementById('item-image').value = '/images/placeholder.jpg';
            document.getElementById('item-image-preview').src = '/images/placeholder.jpg';
            
            $('#item-content').summernote('code', '');
            
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
                    document.getElementById('div-icon').querySelector('label').innerText = 'اسم الأيقونة (مثال: FileText)';
                }
            }
            
            document.getElementById('modalTitle').innerText = t;
            modal.show();
        }

        function editItem(typePlural, id) {
            const type = typePlural.slice(0, -1);
            const item = dataStore[typePlural].find(x => x.id == id);
            
            showModal(type);
            document.getElementById('item-id').value = item.id;
            
            if(type === 'stat') {
                document.getElementById('item-title').value = item.title;
                document.getElementById('item-icon').value = item.value;
            } else if(type === 'testimonial') {
                document.getElementById('item-title').value = item.name;
                document.getElementById('item-icon').value = item.position;
                $('#item-content').summernote('code', item.content || '');
            } else {
                document.getElementById('item-title').value = item.title;
                $('#item-content').summernote('code', item.content || '');
            }
            
            if(type === 'article') document.getElementById('item-category').value = item.category;
            if(type === 'article' || type === 'sector' || type === 'service') {
                document.getElementById('item-image').value = item.image;
                document.getElementById('item-image-preview').src = item.image || '/images/placeholder.jpg';
            }
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
                data.content = $('#item-content').summernote('code');
            } else {
                data.title = document.getElementById('item-title').value;
                data.content = $('#item-content').summernote('code');
            }
            
            if(type === 'article') data.category = document.getElementById('item-category').value;
            if(type === 'article' || type === 'sector' || type === 'service') data.image = document.getElementById('item-image').value;
            if(type === 'service' || type === 'sector' || type === 'feature') data.description = document.getElementById('item-description').value;
            if(type === 'feature') data.icon = document.getElementById('item-icon').value;
            
            const method = id ? 'PUT' : 'POST';
            
            try {
                await fetch(`${API_URL}/${typePlural}.php`, {
                    method: method,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(data)
                });
                
                showToast('تم الحفظ بنجاح! ✨');
                modal.hide();
                loadItems(typePlural);
                if(type === 'article' || type === 'service') loadAnalytics(); // refresh counts
            } catch(e) {
                showToast('خطأ في الاتصال بالسيرفر', true);
            }
        }

        async function deleteItem(typePlural, id) {
            if(confirm('هل أنت متأكد من الحذف النهائي؟')) {
                try {
                    await fetch(`${API_URL}/${typePlural}.php?id=${id}`, {
                        method: 'DELETE',
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    });
                    showToast('تم الحذف بنجاح');
                    loadItems(typePlural);
                    loadAnalytics(); // refresh counts
                } catch(e) {
                    showToast('خطأ في الحذف', true);
                }
            }
        }
    </script>
</body>
</html>
