import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

function Dashboard({ user }) {
  const [profil, setProfil] = useState({ nama: '', universitas: '', prodi: '', divisi: '', minggu_cetak: 1 });
  const [logbooks, setLogbooks] = useState([]);
  const [formLogbook, setFormLogbook] = useState({ minggu_ke: 1, tanggal: '', deskripsi: '' });
  const [editLogbook, setEditLogbook] = useState({ id: null, tanggal: '', deskripsi: '' });

  // Fetch Profile & Logbooks
  const fetchData = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      let userProfile = { nama: '', universitas: '', prodi: '', divisi: '', minggu_cetak: 1 };
      
      if (userSnap.exists()) {
        userProfile = { ...userSnap.data(), minggu_cetak: userSnap.data().minggu_cetak || 1 };
        setProfil(userProfile);
        setFormLogbook(prev => ({ ...prev, minggu_ke: userProfile.minggu_cetak }));
      }

      // Fetch Logbooks
      const logbooksRef = collection(db, 'logbooks');
      const q = query(logbooksRef, where('user_id', '==', user.uid), where('minggu_ke', '==', userProfile.minggu_cetak));
      const querySnapshot = await getDocs(q);
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      // Sort by date asc
      logs.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
      setLogbooks(logs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Auto Logout setelah 15 menit tidak ada aktivitas
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // Set timeout selama 15 menit (15 * 60 * 1000 = 900.000 ms)
      timeoutId = setTimeout(() => {
        signOut(auth).then(() => {
          alert('Sesi Anda telah berakhir karena tidak ada aktivitas selama 15 menit. Silakan login kembali.');
        });
      }, 15 * 60 * 1000);
    };

    // Jalankan timer pertama kali
    resetTimer();

    // Dengarkan aktivitas di layar
    const events = ['mousemove', 'mousedown', 'keypress', 'touchmove', 'scroll'];
    events.forEach(event => document.addEventListener(event, resetTimer));

    // Bersihkan listener ketika komponen dihapus dari layar
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, []);

  const handleSimpanProfil = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        nama: profil.nama,
        universitas: profil.universitas,
        prodi: profil.prodi,
        divisi: profil.divisi,
        minggu_cetak: Number(profil.minggu_cetak)
      }, { merge: true });
      fetchData();
      alert('Pengaturan berhasil disimpan!');
    } catch (error) {
      alert('Gagal menyimpan profil: ' + error.message);
    }
  };

  const handleSimpanKegiatan = async (e) => {
    e.preventDefault();
    try {
      const logbooksRef = collection(db, 'logbooks');
      await addDoc(logbooksRef, {
        user_id: user.uid,
        minggu_ke: Number(formLogbook.minggu_ke),
        tanggal: formLogbook.tanggal,
        deskripsi_kegiatan: formLogbook.deskripsi
      });
      setFormLogbook({ ...formLogbook, tanggal: '', deskripsi: '' });
      fetchData();
    } catch (error) {
      alert('Gagal menyimpan kegiatan: ' + error.message);
    }
  };

  const handleUpdateKegiatan = async (e) => {
    e.preventDefault();
    try {
      const logbookRef = doc(db, 'logbooks', editLogbook.id);
      await updateDoc(logbookRef, {
        tanggal: editLogbook.tanggal,
        deskripsi_kegiatan: editLogbook.deskripsi
      });
      fetchData();
      
      // Close modal by triggering the close button (Bootstrap way in React without refs)
      const closeBtn = document.getElementById('closeModalBtn');
      if(closeBtn) closeBtn.click();
      
    } catch (error) {
      alert('Gagal mengupdate kegiatan: ' + error.message);
    }
  };

  const hapusKegiatan = async (id) => {
    if (window.confirm('Yakin ingin menghapus kegiatan ini?')) {
      await deleteDoc(doc(db, 'logbooks', id));
      fetchData();
    }
  };

  return (
    <>
      <header className="app-header mb-5 no-print">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="app-title"><i className="ph-fill ph-notebook"></i> Logbook Pro</h1>
          <div className="d-flex align-items-center gap-4">
            <div className="text-muted fw-medium d-none d-md-block">MSIB Batch 5</div>
            <button onClick={() => signOut(auth)} className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" style={{ borderRadius: '8px' }}>
              <i className="ph ph-sign-out"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mb-5">
        <div className="row g-4 no-print">
          <div className="col-lg-4 animate-up">
            <div className="card h-100">
              <div className="card-header">
                <h5><i className="ph-fill ph-user-circle-gear"></i> Pengaturan Profil</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSimpanProfil}>
                  <div className="mb-3">
                    <label className="form-label">Nama Lengkap</label>
                    <div className="input-group-custom">
                      <input type="text" className="form-control" value={profil.nama} onChange={(e) => setProfil({...profil, nama: e.target.value})} required />
                      <i className="ph ph-user"></i>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Universitas</label>
                    <div className="input-group-custom">
                      <input type="text" className="form-control" value={profil.universitas} onChange={(e) => setProfil({...profil, universitas: e.target.value})} required />
                      <i className="ph ph-buildings"></i>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Program Studi</label>
                    <div className="input-group-custom">
                      <input type="text" className="form-control" value={profil.prodi} onChange={(e) => setProfil({...profil, prodi: e.target.value})} required />
                      <i className="ph ph-student"></i>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Divisi MSIB</label>
                    <div className="input-group-custom">
                      <input type="text" className="form-control" value={profil.divisi} onChange={(e) => setProfil({...profil, divisi: e.target.value})} required />
                      <i className="ph ph-briefcase"></i>
                    </div>
                  </div>
                  <div className="highlight-box my-4">
                    <label className="form-label text-primary">Tampilkan Minggu Ke-</label>
                    <div className="input-group-custom">
                      <input type="number" className="form-control" style={{ borderColor: 'var(--primary-color)', borderWidth: '2px' }} value={profil.minggu_cetak} onChange={(e) => setProfil({...profil, minggu_cetak: e.target.value})} required />
                      <i className="ph ph-calendar-check text-primary"></i>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    <i className="ph ph-floppy-disk"></i> Simpan Pengaturan
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8 animate-up delay-1">
            <div className="card h-100">
              <div className="card-header">
                <h5><i className="ph-fill ph-note-pencil"></i> Input Kegiatan Harian</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSimpanKegiatan}>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label">Minggu Ke-</label>
                      <div className="input-group-custom">
                        <input type="number" className="form-control" value={formLogbook.minggu_ke} onChange={(e) => setFormLogbook({...formLogbook, minggu_ke: e.target.value})} required />
                        <i className="ph ph-hash"></i>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <label className="form-label">Hari/Tanggal</label>
                      <div className="input-group-custom">
                        <input type="date" className="form-control" value={formLogbook.tanggal} onChange={(e) => setFormLogbook({...formLogbook, tanggal: e.target.value})} required />
                        <i className="ph ph-calendar-blank"></i>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Deskripsi Kegiatan Lengkap</label>
                    <div className="input-group-custom">
                      <textarea className="form-control" rows="5" placeholder="Ceritakan apa saja yang Anda kerjakan hari ini..." value={formLogbook.deskripsi} onChange={(e) => setFormLogbook({...formLogbook, deskripsi: e.target.value})} required style={{ paddingLeft: '1rem' }}></textarea>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    <i className="ph ph-paper-plane-right"></i> Simpan Kegiatan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Logbook */}
        <div className="card mt-5 animate-up delay-2">
          <div className="card-body p-3 p-md-5">
            <div id="area-cetak">
              <div className="d-flex flex-column flex-md-row print-header justify-content-between align-items-start mb-4 gap-3 gap-md-5">
                <div className="pe-3">
                  <div className="judul-template">LOGBOOK MINGGUAN KEGIATAN MSIB BATCH 5</div>
                  <div className="subjudul-template">PT VINIX SEVEN AURUM</div>
                </div>
                <div className="logo-text flex-shrink-0 text-start text-md-end">VINIX<span>7</span></div>
              </div>

              <div className="mb-4 text-muted no-print" style={{ fontSize: '0.9rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                <strong className="text-dark d-flex align-items-center gap-2"><i className="ph ph-info"></i> Petunjuk Pengisian:</strong>
                <ul className="mb-0 mt-2 ps-3">
                  <li>Wajib diisi dengan kegiatan harian, contoh: briefing, apa yang dipelajari, mengerjakan tugas apa saja, dll.</li>
                  <li>Wajib dikumpulkan setiap minggu bersama dengan pengumpulan tugas.</li>
                </ul>
              </div>

              <table className="info-profil mb-4">
                <tbody>
                  <tr><td width="120">Nama</td><td>: {profil.nama || '-'}</td></tr>
                  <tr><td>Universitas</td><td>: {profil.universitas || '-'}</td></tr>
                  <tr><td>Prodi</td><td>: {profil.prodi || '-'}</td></tr>
                  <tr><td>Divisi</td><td>: {profil.divisi || '-'}</td></tr>
                  <tr><td>Minggu ke</td><td>: <span className="badge bg-dark rounded-pill px-3">{profil.minggu_cetak}</span></td></tr>
                </tbody>
              </table>

              <div className="table-responsive">
                <table id="tabel-logbook" className="table-modern" style={{ tableLayout: 'fixed', minWidth: '700px', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '10%', textAlign: 'center' }}>No</th>
                      <th style={{ width: '25%' }}>Hari / Tanggal</th>
                      <th style={{ width: '65%' }}>Deskripsi Kegiatan</th>
                      <th className="aksi-kolom no-print" style={{ width: '120px' }}>Aksi</th>
                    </tr>
                  </thead>
                <tbody>
                  {logbooks.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{index + 1}</td>
                      <td>{new Date(row.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                      <td style={{ whiteSpace: 'pre-wrap' }}>{row.deskripsi_kegiatan}</td>
                      <td className="aksi-kolom no-print">
                        <div className="action-buttons">
                          <button onClick={() => setEditLogbook({ id: row.id, tanggal: row.tanggal, deskripsi: row.deskripsi_kegiatan })} className="btn-icon" title="Edit Data" data-bs-toggle="modal" data-bs-target="#modalEdit">
                            <i className="ph ph-pencil-simple"></i>
                          </button>
                          <button onClick={() => hapusKegiatan(row.id)} className="btn-icon danger" title="Hapus Data">
                            <i className="ph ph-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {logbooks.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-0 border-0">
                        <div className="empty-state">
                          <i className="ph-duotone ph-folder-open"></i>
                          <h5>Belum Ada Catatan</h5>
                          <p>Anda belum memasukkan kegiatan apapun di Minggu ke-{profil.minggu_cetak}.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>

            </div>

            <div className="d-flex justify-content-end mt-4 no-print">
              <button onClick={() => window.print()} className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2" style={{ borderRadius: '12px', fontWeight: '600' }}>
                <i className="ph ph-printer fs-5"></i> Simpan PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit Kegiatan */}
      <div className="modal fade" id="modalEdit" tabIndex="-1" aria-labelledby="modalEditLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ border: 'none', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <form onSubmit={handleUpdateKegiatan}>
              <div className="modal-header bg-light border-0 px-4 py-3">
                <h5 className="modal-title fw-bold d-flex align-items-center gap-2" id="modalEditLabel">
                  <i className="ph-fill ph-pencil-simple-line text-primary"></i> Edit Kegiatan
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" id="closeModalBtn" aria-label="Close"></button>
              </div>
              <div className="modal-body px-4 py-4">
                <div className="mb-4">
                  <label className="form-label">Hari/Tanggal</label>
                  <div className="input-group-custom">
                    <input type="date" className="form-control" value={editLogbook.tanggal} onChange={(e) => setEditLogbook({...editLogbook, tanggal: e.target.value})} required />
                    <i className="ph ph-calendar-blank"></i>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Deskripsi Kegiatan</label>
                  <textarea className="form-control" rows="5" value={editLogbook.deskripsi} onChange={(e) => setEditLogbook({...editLogbook, deskripsi: e.target.value})} required style={{ borderRadius: '12px' }}></textarea>
                </div>
              </div>
              <div className="modal-footer border-0 px-4 pb-4 bg-light">
                <button type="button" className="btn btn-outline-action" data-bs-dismiss="modal">Batal</button>
                <button type="submit" className="btn btn-primary px-4"><i className="ph ph-check-circle"></i> Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
