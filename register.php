<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar | Logbook Pro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="style.css">
    <style>
        .auth-wrapper {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .auth-card {
            width: 100%;
            max-width: 450px;
        }
    </style>
</head>
<body>

<div class="auth-wrapper">
    <div class="card auth-card animate-up">
        <div class="card-body p-5">
            <div class="text-center mb-4">
                <h1 class="app-title justify-content-center mb-2"><i class="ph-fill ph-user-plus"></i> Daftar Akun</h1>
                <p class="text-muted">Buat akun untuk mulai mengelola laporan Anda secara eksklusif.</p>
            </div>

            <?php if (isset($_SESSION['error'])): ?>
                <div class="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert" style="border-radius: 12px; border: none; background: rgba(239, 68, 68, 0.1); color: var(--danger);">
                    <i class="ph-fill ph-warning-circle fs-5"></i>
                    <div><?= htmlspecialchars($_SESSION['error']); unset($_SESSION['error']); ?></div>
                </div>
            <?php endif; ?>

            <form action="functions.php" method="POST">
                <div class="mb-3">
                    <label class="form-label">Username Baru</label>
                    <div class="input-group-custom">
                        <input type="text" name="username" class="form-control" required placeholder="Buat username unik">
                        <i class="ph ph-user"></i>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label">Password</label>
                    <div class="input-group-custom">
                        <input type="password" name="password" class="form-control" required placeholder="Buat kata sandi yang aman">
                        <i class="ph ph-lock-key"></i>
                    </div>
                </div>
                
                <button type="submit" name="register_user" class="btn btn-dark w-100 py-3 mb-3">
                    <i class="ph ph-paper-plane-tilt"></i> Daftarkan Akun
                </button>
                
                <p class="text-center text-muted m-0">Sudah punya akun? <a href="login.php" class="text-primary fw-bold text-decoration-none">Login di sini</a></p>
            </form>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
