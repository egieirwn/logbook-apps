<div align="center">
  
  # 🚀 Logbook MSIB Premium Dashboard
  
  **Aplikasi Pencatatan Kegiatan Harian Kampus Merdeka MSIB yang Profesional, Modern, dan Interaktif.**
  
  [![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
  [![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
  [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
  [![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)](#)
  
  <br>
  
  *(📸 Tips: Anda dapat meletakkan *screenshot* visual aplikasi Anda di bawah ini)*
  
  <!-- ![Screenshot Aplikasi](link-gambar-screenshot.png) -->
</div>

---

## 🌟 Tentang Proyek

Aplikasi **Logbook MSIB** berbasis Web ini dirancang khusus untuk mempermudah peserta Magang dan Studi Independen Bersertifikat (MSIB) dalam mencatat rutinitas aktivitas harian. Tidak seperti logbook biasa, aplikasi ini hadir dengan **Dashboard UI Premium**, menjadikannya sangat estetik, profesional, dan nyaman digunakan.

Sangat cocok digunakan sebagai laporan administrasi mingguan ke Dosen Pembimbing Lapangan (DPL) maupun Perusahaan!

---

## ✨ Fitur Unggulan

- 👤 **Manajemen Profil Dinamis:** Atur data diri, nama universitas, program studi, dan divisi magang Anda secara langsung dari *dashboard*.
- 📅 **Pengelompokan per Minggu:** Catat kegiatan harian dengan rapi dan filter laporan berdasarkan "Minggu Ke-" tertentu.
- 🎨 **Desain Premium (Glassmorphism & Animasi):** Nikmati antarmuka yang sangat indah! Dilengkapi dengan efek *mesh gradients background*, *custom scrollbars*, animasi *fade-in*, serta *Phosphor Icons* modern yang memanjakan mata.
- 💾 **Export Dokumen Formal:**
  - 📄 **Microsoft Word (.doc)** — Otomatis mengekspor tabel logbook mingguan ke format dokumen untuk diserahkan ke Dosen Pembimbing.
  - 🖼️ **Gambar (.jpeg)** — Unduh laporan dalam bentuk gambar berkualitas tinggi untuk keperluan bukti lampiran (*evidence*).
- 🖨️ **Print-Safe Technology:** Tidak perlu khawatir saat mengekspor dokumen; semua tombol aksi, warna latar interaktif, dan elemen navigasi secara otomatis disembunyikan agar hasil cetak terlihat bersih layaknya dokumen resmi!

---

## 🛠️ Tech Stack (Teknologi)

| Komponen | Teknologi yang Digunakan |
| :--- | :--- |
| **Backend** | PHP 8.x (Native dengan arsitektur PDO) |
| **Database** | MySQL / MariaDB |
| **Frontend** | HTML5, CSS3 (Vanilla Custom CSS), Vanilla JavaScript |
| **UI Framework** | Bootstrap 5.3 (Hanya untuk Grid System & Modal Layout) |
| **Icons & Assets**| [Phosphor Icons](https://phosphoricons.com/), [Icons8](https://icons8.com) |
| **Library Export** | HTML2Canvas (Berperan dalam fitur Export to JPEG) |

---

## 🚀 Panduan Instalasi (Local Development)

Ingin mencoba, mengembangkan, atau memodifikasi aplikasi ini di komputer Anda? Ikuti langkah mudah berikut:

### 1. Persiapan Server
Pastikan Anda sudah menginstal aplikasi Web Server lokal seperti **XAMPP**, **Laragon**, atau **MAMP** yang mendukung **PHP 7.4/8.x** dan **MySQL/MariaDB**.

### 2. Clone Repository
Buka terminal dan *clone* repositori ini ke dalam *document root* web server Anda (misal di folder `C:\xampp\htdocs\`).
```bash
git clone https://github.com/USERNAME-ANDA/logbook-apps-msib.git
cd logbook-apps-msib
```
*(Ubah URL di atas sesuai dengan link repositori yang Anda miliki)*

### 3. Konfigurasi Database
1. Buka aplikasi **XAMPP**, jalankan modul **Apache** dan **MySQL**.
2. Akses `http://localhost/phpmyadmin` melalui *browser* Anda.
3. Buat sebuah database baru, beri nama: `db_logbook`.
4. Pilih tab **Import**, lalu unggah file `database.sql` yang sudah tersedia di folder aplikasi ini. Klik **Go** / Eksekusi.

### 4. Konfigurasi Koneksi (Opsional)
Secara *default*, aplikasi ini dirancang untuk berjalan mulus di XAMPP. Jika pengaturan *database* Anda menggunakan *password* tertentu, buka file `koneksi.php` menggunakan *Code Editor* Anda (VS Code/Sublime) dan sesuaikan baris berikut:
```php
$host = 'localhost';
$db   = 'db_logbook'; // Ubah jika Anda menggunakan nama database yang berbeda
$user = 'root';       // Username MySQL Anda
$pass = '';           // Password MySQL Anda
```

### 5. Jalankan Aplikasi 🎉
Buka browser dan ketikkan alamat berikut di bilah URL:
```text
http://localhost/logbook-apps-msib
```
*(Sesuaikan teks `logbook-apps-msib` dengan nama folder tempat Anda menginstal aplikasi ini)*

---

## 🤝 Berkontribusi

*Pull requests* selalu diterima dengan tangan terbuka! Jika Anda memiliki saran perbaikan kode, optimalisasi antarmuka, atau ide fitur baru yang menarik:
1. Lakukan *Fork* pada repositori ini.
2. Buat *branch* fitur Anda (`git checkout -b fitur-keren-saya`).
3. Lakukan *Commit* terhadap perubahan Anda (`git commit -m 'Menambahkan animasi keren'`).
4. *Push* kode Anda ke *branch* tersebut (`git push origin fitur-keren-saya`).
5. Buka *Pull Request*.

---

<div align="center">
  Dibuat dengan ❤️ untuk membantu kemudahan pemberkasan administrasi program <strong>Kampus Merdeka MSIB</strong>.
</div>
