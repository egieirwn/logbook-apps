<?php
session_start();
require_once 'koneksi.php';

// ==========================================
// 1. LOGIKA UNTUK MENYIMPAN/UPDATE PROFIL
// ==========================================
if (isset($_POST['simpan_profil'])) {
    $nama = $_POST['nama'];
    $universitas = $_POST['universitas'];
    $prodi = $_POST['prodi'];
    $divisi = $_POST['divisi'];
    
    $_SESSION['minggu_cetak'] = $_POST['minggu_cetak'];

    $cekUser = $pdo->query("SELECT id FROM users WHERE id = 1")->fetch();
    
    if ($cekUser) {
        $stmt = $pdo->prepare("UPDATE users SET nama=?, universitas=?, prodi=?, divisi=? WHERE id=1");
        $stmt->execute([$nama, $universitas, $prodi, $divisi]);
    } else {
        $stmt = $pdo->prepare("INSERT INTO users (id, nama, universitas, prodi, divisi) VALUES (1, ?, ?, ?, ?)");
        $stmt->execute([$nama, $universitas, $prodi, $divisi]);
    }
    header("Location: index.php");
    exit;
}

// ==========================================
// 2. LOGIKA UNTUK MENAMBAH KEGIATAN BARU
// ==========================================
if (isset($_POST['simpan_kegiatan'])) {
    $user_id = 1; 
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
if (isset($_POST['update_kegiatan'])) {
    $id_logbook = $_POST['id_logbook'];
    $tanggal = $_POST['tanggal'];
    $deskripsi = $_POST['deskripsi'];

    $stmt = $pdo->prepare("UPDATE logbooks SET tanggal=?, deskripsi_kegiatan=? WHERE id=?");
    $stmt->execute([$tanggal, $deskripsi, $id_logbook]);
    header("Location: index.php");
    exit;
}

// ==========================================
// 4. LOGIKA UNTUK MENGHAPUS KEGIATAN (DELETE)
// ==========================================
if (isset($_GET['hapus'])) {
    $id_logbook = $_GET['hapus'];
    $stmt = $pdo->prepare("DELETE FROM logbooks WHERE id=?");
    $stmt->execute([$id_logbook]);
    header("Location: index.php");
    exit;
}

// ==========================================
// 5. AMBIL DATA UNTUK DITAMPILKAN
// ==========================================
$stmtUser = $pdo->query("SELECT * FROM users WHERE id = 1");
$profil = $stmtUser->fetch();

if (!$profil) {
    // Default sesuai dengan data Anda
    $profil = [
        'nama' => 'Egie Irawan', 
        'universitas' => 'Universitas Duta Bangsa', 
        'prodi' => 'Teknik Informatika', 
        'divisi' => 'UI & UX Web Development'
    ];
}

$minggu_cetak = isset($_SESSION['minggu_cetak']) ? $_SESSION['minggu_cetak'] : 1;

$stmtLog = $pdo->prepare("SELECT * FROM logbooks WHERE minggu_ke = ? ORDER BY tanggal ASC");
$stmtLog->execute([$minggu_cetak]);
$logbooks = $stmtLog->fetchAll();
?>
