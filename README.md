# Logbook MSIB Premium Dashboard 🚀

Aplikasi **Logbook MSIB** berbasis Web (PHP & MySQL) untuk mencatat aktivitas harian peserta Magang dan Studi Independen Bersertifikat (MSIB). Aplikasi ini memiliki desain antarmuka premium, interaktif, dan modern yang sangat cocok untuk mengelola laporan magang Anda agar terlihat jauh lebih profesional.

## ✨ Fitur Utama
- **Manajemen Profil Dinamis:** Atur data diri, nama universitas, program studi, dan divisi magang dengan mudah melalui antarmuka web.
- **Catatan per Minggu:** Kelompokkan aktivitas harian Anda berdasarkan "Minggu Ke-" yang spesifik agar lebih rapi.
- **Desain Premium (UI/UX):** Menggunakan desain estetik dengan *custom scrollbar*, efek *hover* dinamis, *mesh gradients background*, serta menggunakan *Phosphor Icons* dan *Icons8*.
- **Export Dokumen Formal:** Ubah tabel logbook Anda menjadi dokumen siap kirim hanya dengan satu klik:
  - 📄 **Export to Word (.doc)** - Siap untuk di-*print* atau dilampirkan sebagai laporan mingguan.
  - 🖼️ **Export to JPEG (.jpeg)** - Untuk kebutuhan bukti foto atau dokumen penunjang.
- **Aman Untuk Dicetak (Print-Safe):** Semua komponen UI interaktif/tombol tidak akan ikut tercetak dalam mode cetak/dokumen.

## 🛠️ Teknologi yang Digunakan
- **Backend:** PHP 8.x (Native menggunakan PDO)
- **Database:** MySQL / MariaDB
- **Frontend:** HTML5, CSS3 (Custom Vanilla CSS untuk performa), JavaScript (Vanilla)
- **Framework Tambahan:** Bootstrap 5.3.0 (Hanya untuk Grid layout & Modal)
- **Library Export:** HTML2Canvas (Untuk export gambar/JPEG)

## 📋 Persyaratan Lingkungan (Environment)
Aplikasi ini dibangun, diuji, dan berjalan dengan sempurna pada lingkungan pengembangan berikut:
- **Web Server:** XAMPP (Apache)
- **PHP Version:** PHP 8.1 / 8.2 (Sangat kompatibel, minimum versi 7.4)
- **Database:** MariaDB 10.4.x atau versi MySQL terbaru

## 🚀 Cara Instalasi (Penggunaan Lokal)
1. *Clone* atau unduh repositori ini ke dalam folder root web server XAMPP Anda (umumnya di `C:\xampp\htdocs\logbook-apps`).
2. Buka aplikasi **XAMPP Control Panel**, kemudian jalankan modul **Apache** dan **MySQL** dengan mengklik tombol *Start*.
3. Buka browser internet Anda dan akses halaman phpMyAdmin di alamat: `http://localhost/phpmyadmin`.
4. Buat database baru (misalnya dengan nama `db_logbook`).
5. **Import Database:**
   - Masuk ke database yang baru dibuat, lalu klik tab **Import**.
   - Pilih file `database.sql` yang telah disertakan di dalam folder proyek ini.
   - Klik tombol **Go** atau **Import** di bagian bawah.
6. **Konfigurasi Koneksi:**
   - Buka file `koneksi.php` menggunakan *Code Editor* Anda (VS Code, Sublime, dll).
   - Sesuaikan parameter *host*, *nama database*, *username*, dan *password* dengan konfigurasi MySQL lokal Anda (jika Anda menggunakan default XAMPP, konfigurasinya sudah sesuai).
     ```php
     $host = 'localhost';
     $db   = 'db_logbook'; // Sesuaikan jika nama database Anda berbeda
     $user = 'root';
     $pass = ''; // Umumnya kosong di XAMPP default
     ```
7. Aplikasi siap digunakan! Akses melalui browser di URL: `http://localhost/logbook-apps`

## 💡 Berkontribusi
Jika Anda memiliki saran peningkatan kode, menemukan *bug*, atau ingin menambahkan fitur baru, silakan *Fork* *repository* ini dan buat *Pull Request*. 

---
Dibuat dengan ❤️ untuk membantu mempermudah kelengkapan administrasi program Kampus Merdeka MSIB.
