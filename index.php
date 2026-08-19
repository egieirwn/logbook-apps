<?php
require_once 'functions.php';

// Cek apakah user sudah login
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Logbook MSIB</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <!-- Custom Premium CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- Header Navbar -->
<header class="app-header mb-5 no-print">
    <div class="container d-flex justify-content-between align-items-center">
        <h1 class="app-title"><i class="ph-fill ph-notebook"></i> Logbook Pro</h1>
        <div class="d-flex align-items-center gap-4">
            <div class="text-muted fw-medium d-none d-md-block">MSIB Batch 5</div>
            <a href="logout.php" class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" style="border-radius: 8px;">
                <i class="ph ph-sign-out"></i> Logout
            </a>
        </div>
    </div>
</header>

<div class="container mb-5">
    <div class="row g-4 no-print">
        <!-- FORM PENGATURAN PROFIL & MINGGU CETAK -->
        <div class="col-lg-4 animate-up">
            <div class="card h-100">
                <div class="card-header">
                    <h5><i class="ph-fill ph-user-circle-gear"></i> Pengaturan Profil</h5>
                </div>
                <div class="card-body">
                    <form action="functions.php" method="POST">
                        <div class="mb-3">
                            <label class="form-label">Nama Lengkap</label>
                            <div class="input-group-custom">
                                <input type="text" name="nama" class="form-control" value="<?= htmlspecialchars($profil['nama']) ?>" required>
                                <i class="ph ph-user"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Universitas</label>
                            <div class="input-group-custom">
                                <input type="text" name="universitas" class="form-control" value="<?= htmlspecialchars($profil['universitas']) ?>" required>
                                <i class="ph ph-buildings"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Program Studi</label>
                            <div class="input-group-custom">
                                <input type="text" name="prodi" class="form-control" value="<?= htmlspecialchars($profil['prodi']) ?>" required>
                                <i class="ph ph-student"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Divisi MSIB</label>
                            <div class="input-group-custom">
                                <input type="text" name="divisi" class="form-control" value="<?= htmlspecialchars($profil['divisi']) ?>" required>
                                <i class="ph ph-briefcase"></i>
                            </div>
                        </div>
                        
                        <div class="highlight-box my-4">
                            <label class="form-label text-primary">Tampilkan Minggu Ke-</label>
                            <div class="input-group-custom">
                                <input type="number" name="minggu_cetak" class="form-control" style="border-color: var(--primary-color); border-width: 2px;" value="<?= htmlspecialchars($minggu_cetak) ?>" required>
                                <i class="ph ph-calendar-check text-primary"></i>
                            </div>
                        </div>
                        <button type="submit" name="simpan_profil" class="btn btn-dark w-100">
                            <i class="ph ph-floppy-disk"></i> Simpan Pengaturan
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- FORM INPUT KEGIATAN HARIAN -->
        <div class="col-lg-8 animate-up delay-1">
            <div class="card h-100">
                <div class="card-header">
                    <h5><i class="ph-fill ph-note-pencil"></i> Input Kegiatan Harian</h5>
                </div>
                <div class="card-body">
                    <form action="functions.php" method="POST">
                        <div class="row g-3 mb-4">
                            <div class="col-md-4">
                                <label class="form-label">Minggu Ke-</label>
                                <div class="input-group-custom">
                                    <input type="number" name="minggu_ke" class="form-control" value="<?= htmlspecialchars($minggu_cetak) ?>" required>
                                    <i class="ph ph-hash"></i>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <label class="form-label">Hari/Tanggal</label>
                                <div class="input-group-custom">
                                    <input type="date" name="tanggal" class="form-control" required>
                                    <i class="ph ph-calendar-blank"></i>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="form-label">Deskripsi Kegiatan Lengkap</label>
                            <div class="input-group-custom">
                                <textarea name="deskripsi" class="form-control" rows="5" placeholder="Ceritakan apa saja yang Anda kerjakan hari ini..." required style="padding-left: 1rem;"></textarea>
                            </div>
                        </div>
                        <button type="submit" name="simpan_kegiatan" class="btn btn-primary w-100">
                            <i class="ph ph-paper-plane-right"></i> Simpan Kegiatan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- AREA CETAK WRAPPER -->
    <div class="animate-up delay-2 mt-5">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 no-print gap-3">
            <div>
                <h4 class="fw-bold m-0 text-dark"><i class="ph-fill ph-printer text-primary"></i> Pratinjau & Unduh Laporan</h4>
                <p class="text-muted small m-0 mt-1">Selesai mengisi? Unduh logbook minggu ini ke format Word atau Gambar (JPEG).</p>
            </div>
            <div class="d-flex gap-2">
                <button onclick="exportToWord()" class="btn btn-primary btn-sm px-3 py-2 d-flex align-items-center shadow-sm" title="Download Laporan ke Microsoft Word">
                    <img src="https://img.icons8.com/color/48/000000/word.png" alt="Word" width="24" height="24" class="me-2"> Download Word
                </button>
                <button onclick="exportToJPEG()" class="btn btn-dark btn-sm px-3 py-2 d-flex align-items-center shadow-sm" title="Download Laporan sebagai Gambar JPEG">
                    <img src="https://img.icons8.com/color/48/000000/image.png" alt="JPEG" width="24" height="24" class="me-2"> Download JPEG
                </button>
            </div>
        </div>

        <div id="area-cetak">
            <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <div class="judul-template">LOGBOOK MINGGUAN KEGIATAN MSIB BATCH 5</div>
                    <div class="subjudul-template">PT VINIX SEVEN AURUM</div>
                </div>
                <div class="logo-text">VINIX<span>7</span></div>
            </div>

            <div class="mb-4 text-muted no-print" style="font-size: 0.9rem; background: #f8fafc; padding: 1rem; border-radius: 12px; border: 1px dashed var(--border-color);">
                <strong class="text-dark d-flex align-items-center gap-2"><i class="ph ph-info"></i> Petunjuk Pengisian:</strong>
                <ul class="mb-0 mt-2 ps-3">
                    <li>Wajib diisi dengan kegiatan harian, contoh: briefing, apa yang dipelajari, mengerjakan tugas apa saja, dll.</li>
                    <li>Wajib dikumpulkan setiap minggu bersama dengan pengumpulan tugas.</li>
                </ul>
            </div>

            <table class="info-profil mb-4">
                <tr><td width="120">Nama</td><td>: <?= htmlspecialchars($profil['nama']) ?></td></tr>
                <tr><td>Universitas</td><td>: <?= htmlspecialchars($profil['universitas']) ?></td></tr>
                <tr><td>Prodi</td><td>: <?= htmlspecialchars($profil['prodi']) ?></td></tr>
                <tr><td>Divisi</td><td>: <?= htmlspecialchars($profil['divisi']) ?></td></tr>
                <tr><td>Minggu ke</td><td>: <span class="badge bg-dark rounded-pill px-3"><?= htmlspecialchars($minggu_cetak) ?></span></td></tr>
            </table>

            <!-- TABEL LOGBOOK -->
            <table id="tabel-logbook" class="table-modern">
                <thead>
                    <tr>
                        <th style="width: 5%; text-align: center;">No</th>
                        <th style="width: 22%;">Hari/Tanggal</th>
                        <th>Deskripsi Kegiatan</th>
                        <th class="aksi-kolom no-print" style="width: 12%; text-align: center;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (count($logbooks) > 0): ?>
                        <?php $no = 1; foreach ($logbooks as $row): ?>
                            <tr>
                                <td style="text-align: center; font-weight: 600; color: var(--text-muted);"><?= $no++ ?>.</td>
                                <td style="font-weight: 600;">
                                    <?= date('j F Y', strtotime($row['tanggal'])) ?>
                                </td>
                                <td style="line-height: 1.6; color: #334155;">
                                    <?= nl2br(htmlspecialchars($row['deskripsi_kegiatan'])) ?>
                                </td>
                                <!-- Kolom Aksi -->
                                <td class="aksi-kolom no-print">
                                    <div class="action-buttons">
                                        <button type="button" class="btn-icon" title="Edit Data"
                                            onclick="bukaModalEdit(<?= $row['id'] ?>, '<?= $row['tanggal'] ?>', '<?= htmlspecialchars(addslashes($row['deskripsi_kegiatan'])) ?>')">
                                            <i class="ph ph-pencil-simple"></i>
                                        </button>
                                        <a href="functions.php?hapus=<?= $row['id'] ?>" class="btn-icon danger" title="Hapus Data"
                                            onclick="return confirm('Yakin ingin menghapus kegiatan ini?')">
                                            <i class="ph ph-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="4" class="p-0 border-0">
                                <div class="empty-state">
                                    <i class="ph-duotone ph-folder-open"></i>
                                    <h5>Belum Ada Catatan</h5>
                                    <p>Anda belum memasukkan kegiatan apapun di Minggu ke-<?= htmlspecialchars($minggu_cetak) ?>.</p>
                                </div>
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- ========================================== -->
<!-- MODAL EDIT DATA -->
<!-- ========================================== -->
<div class="modal fade" id="modalEdit" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" style="border: none; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
      <form action="functions.php" method="POST">
        <div class="modal-header bg-light border-0 px-4 py-3">
          <h5 class="modal-title fw-bold d-flex align-items-center gap-2">
            <i class="ph-fill ph-pencil-simple-line text-primary"></i> Edit Kegiatan
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body px-4 py-4">
          <input type="hidden" name="id_logbook" id="edit_id">
          
          <div class="mb-4">
            <label class="form-label">Hari/Tanggal</label>
            <div class="input-group-custom">
                <input type="date" name="tanggal" id="edit_tanggal" class="form-control" required>
                <i class="ph ph-calendar-blank"></i>
            </div>
          </div>
          <div class="mb-2">
            <label class="form-label">Deskripsi Kegiatan</label>
            <textarea name="deskripsi" id="edit_deskripsi" class="form-control" rows="5" required style="border-radius: 12px;"></textarea>
          </div>
        </div>
        <div class="modal-footer border-0 px-4 pb-4 bg-light">
          <button type="button" class="btn btn-outline-action" data-bs-dismiss="modal">Batal</button>
          <button type="submit" name="update_kegiatan" class="btn btn-primary px-4"><i class="ph ph-check-circle"></i> Simpan Perubahan</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Bootstrap Bundle JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- Script Ekspor -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

<script>
    function bukaModalEdit(id, tanggal, deskripsi) {
        document.getElementById('edit_id').value = id;
        document.getElementById('edit_tanggal').value = tanggal;
        document.getElementById('edit_deskripsi').value = deskripsi;
        var modal = new bootstrap.Modal(document.getElementById('modalEdit'));
        modal.show();
    }

    function sembunyikanAksi() {
        document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');
    }
    function tampilkanAksi() {
        document.querySelectorAll('.no-print').forEach(el => el.style.display = '');
    }

    function exportToJPEG() {
        sembunyikanAksi(); 
        const areaCetak = document.getElementById('area-cetak');
        areaCetak.style.margin = '0';
        areaCetak.style.boxShadow = 'none';
        areaCetak.style.borderRadius = '0';
        
        html2canvas(areaCetak, { scale: 2 }).then(canvas => {
            let link = document.createElement('a');
            link.download = 'Logbook_Minggu_<?= htmlspecialchars($minggu_cetak) ?>.jpeg';
            link.href = canvas.toDataURL('image/jpeg');
            link.click();
            tampilkanAksi();
            areaCetak.style.margin = '';
            areaCetak.style.boxShadow = '';
            areaCetak.style.borderRadius = '';
        });
    }

    function exportToWord() {
        sembunyikanAksi();
        let printArea = document.getElementById('area-cetak').innerHTML;
        let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Logbook MSIB</title><style>body { font-family: sans-serif; } table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }</style></head><body>";
        let footer = "</body></html>";
        let sourceHTML = header + printArea + footer;
        let blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = 'Logbook_Minggu_<?= htmlspecialchars($minggu_cetak) ?>.doc';
        link.click();
        tampilkanAksi();
    }
</script>

</body>
</html>