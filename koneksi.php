<?php
// Konfigurasi environment database lokal
$host = '127.0.0.1';
$db   = 'msib_logbook';
$user = 'root'; // Sesuaikan jika ada perubahan user
$pass = '';     // Sesuaikan jika menggunakan password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     $pdo = new PDO($dsn, $user, $pass, $options);
     // Uncomment baris di bawah ini untuk mengecek apakah koneksi berhasil saat testing
     // echo "Koneksi database berhasil!"; 
} catch (\PDOException $e) {
     // Menangkap error routing atau koneksi database
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
?>