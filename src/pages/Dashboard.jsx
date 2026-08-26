import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

function Dashboard({ user }) {
  const [profil, setProfil] = useState({ nama: '', universitas: '', prodi: '', divisi: '', minggu_cetak: 1 });
  const [logbooks, setLogbooks] = useState([]);
  const [formLogbook, setFormLogbook] = useState({ minggu_ke: 1, tanggal: '', deskripsi: '' });

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
        <div id="area-cetak" className="card mt-5 animate-up delay-2">
          <div className="card-body p-5">
            <div className="d-flex justify-content-between align-items-start mb-4 gap-5">
              <div className="pe-3">
                <div className="judul-template">LOGBOOK MINGGUAN KEGIATAN MSIB BATCH 5</div>
                <div className="subjudul-template">
                  <div className="d-flex gap-2">
                    <span style={{ width: '120px' }}>Nama Mahasiswa</span>
                    <span>: <strong>{profil.nama || '-'}</strong></span>
                  </div>
                  <div className="d-flex gap-2">
                    <span style={{ width: '120px' }}>Program Studi</span>
                    <span>: {profil.prodi || '-'}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <span style={{ width: '120px' }}>Perguruan Tinggi</span>
                    <span>: {profil.universitas || '-'}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <span style={{ width: '120px' }}>Divisi</span>
                    <span>: {profil.divisi || '-'}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-end">
                <h1 className="fw-black m-0" style={{ color: 'var(--primary-color)', fontSize: '2.5rem', letterSpacing: '-1px' }}>
                  VINIX<span className="text-dark">7</span>
                </h1>
                <div className="text-muted fw-bold" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>TECH COMPANY</div>
              </div>
            </div>

            <h5 className="fw-bold mb-4 pb-2 border-bottom">Minggu Ke- {profil.minggu_cetak}</h5>

            <div className="table-responsive">
              <table className="table table-modern align-middle" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>NO.</th>
                    <th style={{ width: '25%' }}>HARI / TANGGAL</th>
                    <th style={{ width: '65%' }}>DESKRIPSI KEGIATAN</th>
                    <th className="aksi-kolom no-print" style={{ width: '120px' }}>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {logbooks.map((row, index) => (
                    <tr key={row.id}>
                      <td className="text-center fw-bold" style={{ color: 'var(--primary-color)' }}>{index + 1}.</td>
                      <td style={{ fontWeight: '600' }}>
                        {new Date(row.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </td>
                      <td style={{ lineHeight: '1.6', color: '#334155', whiteSpace: 'pre-wrap' }}>
                        {row.deskripsi_kegiatan}
                      </td>
                      <td className="aksi-kolom no-print">
                        <button onClick={() => hapusKegiatan(row.id)} className="btn btn-sm btn-danger d-flex align-items-center gap-1 w-100 justify-content-center">
                          <i className="ph ph-trash"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                  {logbooks.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-5">
                        <i className="ph ph-files text-secondary mb-2" style={{ fontSize: '3rem' }}></i>
                        <br/>Belum ada logbook di minggu ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end mt-4 no-print">
              <button onClick={() => window.print()} className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2" style={{ borderRadius: '12px', fontWeight: '600' }}>
                <i className="ph ph-printer fs-5"></i> Simpan PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
