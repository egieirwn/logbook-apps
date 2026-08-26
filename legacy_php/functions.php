<?php
session_start();
require_once 'koneksi.php';

// ==========================================
// 0. LOGIKA REGISTER & LOGIN
// ==========================================

// Register
if (isset($_POST['register_user'])) {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Cek username apakah sudah ada
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        $_SESSION['error'] = "Username sudah terdaftar!";
        header("Location: register.php");
        exit;
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt->execute([$username, $hashed_password])) {
        $_SESSION['success'] = "Pendaftaran berhasil, silakan login.";
        header("Location: login.php");
        exit;
    }
}

// Login
if (isset($_POST['login_user'])) {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: index.php");
        exit;
    } else {
        $_SESSION['error'] = "Username atau password salah!";
        header("Location: login.php");
        exit;
    }
}

// Mendapatkan user_id dari sesi
$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;

// ==========================================
// 1. LOGIKA UNTUK MENYIMPAN/UPDATE PROFIL
// ==========================================
if (isset($_POST['simpan_profil']) && $user_id) {
    $nama = $_POST['nama'];
    $universitas = $_POST['universitas'];
    $prodi = $_POST['prodi'];
    $divisi = $_POST['divisi'];
    
    $_SESSION['minggu_cetak'] = $_POST['minggu_cetak'];

    $stmt = $pdo->prepare("UPDATE users SET nama=?, universitas=?, prodi=?, divisi=? WHERE id=?");
    $stmt->execute([$nama, $universitas, $prodi, $divisi, $user_id]);
    
    header("Location: index.php");
    exit;
}

// ==========================================
// 2. LOGIKA UNTUK MENAMBAH KEGIATAN BARU
// ==========================================
if (isset($_POST['simpan_kegiatan']) && $user_id) {
    $minggu_ke = $_POST['minggu_ke'];
    $tanggal = $_POST['tanggal'];
    $deskripsi = $_POST['deskripsi'];

    $stmt = $pdo->prepare("INSERT INTO logbooks (user_id, minggu_ke, tanggal, deskripsi_kegiatan) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, $minggu_ke, $tanggal, $deskripsi]);
    header("Location: index.php");
    exit;
}

// ==========================================
// 3. LOGIKA UNTUK MENGEDIT KEGIATAN (UPDATE)
// ==========================================
if (isset($_POST['update_kegiatan']) && $user_id) {
    $id_logbook = $_POST['id_logbook'];
    $tanggal = $_POST['tanggal'];
    $deskripsi = $_POST['deskripsi'];

    // Keamanan: Pastikan user hanya bisa update miliknya
    $stmt = $pdo->prepare("UPDATE logbooks SET tanggal=?, deskripsi_kegiatan=? WHERE id=? AND user_id=?");
    $stmt->execute([$tanggal, $deskripsi, $id_logbook, $user_id]);
    header("Location: index.php");
    exit;
}

// ==========================================
// 4. LOGIKA UNTUK MENGHAPUS KEGIATAN (DELETE)
// ==========================================
if (isset($_GET['hapus']) && $user_id) {
    $id_logbook = $_GET['hapus'];
    // Keamanan: Pastikan user hanya bisa hapus miliknya
    $stmt = $pdo->prepare("DELETE FROM logbooks WHERE id=? AND user_id=?");
    $stmt->execute([$id_logbook, $user_id]);
    header("Location: index.php");
    exit;
}

// ==========================================
// 5. AMBIL DATA UNTUK DITAMPILKAN
// ==========================================
$profil = ['nama' => '', 'universitas' => '', 'prodi' => '', 'divisi' => ''];
$logbooks = [];
$minggu_cetak = isset($_SESSION['minggu_cetak']) ? $_SESSION['minggu_cetak'] : 1;

if ($user_id) {
    $stmtUser = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmtUser->execute([$user_id]);
    $profilData = $stmtUser->fetch();
    
    if ($profilData) {
        $profil = $profilData;
    }

    $stmtLog = $pdo->prepare("SELECT * FROM logbooks WHERE user_id = ? AND minggu_ke = ? ORDER BY tanggal ASC");
    $stmtLog->execute([$user_id, $minggu_cetak]);
    $logbooks = $stmtLog->fetchAll();
}
?>
