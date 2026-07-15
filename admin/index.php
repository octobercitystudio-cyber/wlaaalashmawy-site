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
                <h4 class="mb-4 text-warning">اللوحة الإدارية</h4>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" onclick="showArticles()">المقالات</a>
                    </li>
                    <li class="nav-item mt-auto pt-5">
                        <a class="nav-link text-white opacity-75" href="#" onclick="logout()">تسجيل الخروج</a>
                    </li>
                </ul>
            </div>
            
            <div class="col-md-10 p-5">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>إدارة المقالات</h2>
                    <button class="btn btn-gold" onclick="showAddModal()">+ إضافة مقال جديد</button>
                </div>
                
                <div class="card">
                    <div class="card-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>العنوان</th>
                                    <th>القسم</th>
                                    <th>التاريخ</th>
                                    <th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody id="articles-table">
                                <!-- Articles loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="articleModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitle">إضافة مقال</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="art-id">
                    <div class="mb-3">
                        <label>عنوان المقال</label>
                        <input type="text" class="form-control" id="art-title">
                    </div>
                    <div class="mb-3">
                        <label>القسم</label>
                        <select class="form-control" id="art-category">
                            <option>الاستشارات المحاسبية</option>
                            <option>الاستشارات الضريبية</option>
                            <option>المراجعة والتدقيق</option>
                            <option>الاستشارات المالية</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>رابط الصورة (اختياري)</label>
                        <input type="text" class="form-control" id="art-image" value="/images/articles/placeholder.jpg">
                    </div>
                    <div class="mb-3">
                        <label>المحتوى</label>
                        <textarea class="form-control" id="art-content" rows="6"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                    <button type="button" class="btn btn-gold" onclick="saveArticle()">حفظ المقال</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const API_URL = '/api';
        let articles = [];
        let modal;

        document.addEventListener('DOMContentLoaded', () => {
            modal = new bootstrap.Modal(document.getElementById('articleModal'));
            if(localStorage.getItem('token')) {
                document.getElementById('login-screen').style.display = 'none';
                document.getElementById('dashboard-screen').style.display = 'block';
                loadArticles();
            }
        });

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
                    document.getElementById('login-screen').style.display = 'none';
                    document.getElementById('dashboard-screen').style.display = 'block';
                    loadArticles();
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

        async function loadArticles() {
            const res = await fetch(API_URL + '/articles.php');
            articles = await res.json();
            renderTable();
        }

        function renderTable() {
            const tbody = document.getElementById('articles-table');
            tbody.innerHTML = '';
            articles.forEach(a => {
                tbody.innerHTML += `
                    <tr>
                        <td>${a.title}</td>
                        <td><span class="badge bg-secondary">${a.category}</span></td>
                        <td>${a.date}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="editArticle(${a.id})">تعديل</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteArticle(${a.id})">حذف</button>
                        </td>
                    </tr>
                `;
            });
        }

        function showAddModal() {
            document.getElementById('art-id').value = '';
            document.getElementById('art-title').value = '';
            document.getElementById('art-content').value = '';
            document.getElementById('modalTitle').innerText = 'إضافة مقال جديد';
            modal.show();
        }

        function editArticle(id) {
            const art = articles.find(x => x.id == id);
            document.getElementById('art-id').value = art.id;
            document.getElementById('art-title').value = art.title;
            document.getElementById('art-category').value = art.category;
            document.getElementById('art-image').value = art.image || '/images/articles/placeholder.jpg';
            document.getElementById('art-content').value = art.content;
            document.getElementById('modalTitle').innerText = 'تعديل مقال';
            modal.show();
        }

        async function saveArticle() {
            const id = document.getElementById('art-id').value;
            const data = {
                id: id,
                title: document.getElementById('art-title').value,
                category: document.getElementById('art-category').value,
                image: document.getElementById('art-image').value,
                content: document.getElementById('art-content').value
            };
            
            const method = id ? 'PUT' : 'POST';
            
            await fetch(API_URL + '/articles.php', {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            });
            
            modal.hide();
            loadArticles();
        }

        async function deleteArticle(id) {
            if(confirm('هل أنت متأكد من حذف المقال؟')) {
                await fetch(API_URL + '/articles.php?id=' + id, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                loadArticles();
            }
        }
    </script>
</body>
</html>
