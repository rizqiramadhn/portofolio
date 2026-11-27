# Portfolio Website — GitHub Pages + Google Sheets

Website portofolio statis yang terinspirasi dari desain referensi: putih, aksen oranye, tipografi tegas, dan responsif untuk HP maupun desktop.

## 1. Jalankan secara lokal
Buka `index.html` di browser. Konten contoh sudah tersedia sehingga website langsung terlihat.

## 2. Siapkan Google Sheets sebagai CMS
Buat Google Spreadsheet dengan satu tab bernama `Portfolio`. Baris pertama wajib berisi header berikut (huruf kecil):

| section | order | title | subtitle | description | image | link | meta | icon |
|---|---:|---|---|---|---|---|---|---|
| hero | 1 | Nama Kamu | Profesi / Role | Deskripsi singkat | URL foto hero | URL CV PDF | | |
| about | 1 | | | Cerita tentang kamu | URL foto about | | | |
| skill | 1 | JavaScript | | | | | | JS |
| project | 1 | Nama Proyek | | Deskripsi proyek | URL gambar | URL demo/repo | React · Node.js | ↗ |
| experience | 1 | Web Developer | Nama Perusahaan | Deskripsi pekerjaan | | | 2024 – sekarang | ▣ |
| process | 1 | Discover | | Memahami masalah | | | 01 | ⌕ |
| contact | 1 | Email | hello@domain.com | | | mailto:hello@domain.com | | ✉ |
| social | 1 | GitHub | | | | https://github.com/username | | GH |

### Jenis section yang dikenali
- `hero`: satu baris untuk nama, profesi, deskripsi, URL gambar, dan URL CV.
- `about`: satu baris untuk deskripsi dan foto bagian About.
- `skill`: satu baris per skill. `title` = nama skill, `icon` = teks/simbol singkat.
- `project`: satu baris per proyek. `image` = URL gambar publik, `link` = URL demo atau repository, `meta` = daftar teknologi.
- `experience`: satu baris per pengalaman. `title` = jabatan, `subtitle` = perusahaan, `meta` = periode.
- `process`: satu baris per langkah proses.
- `contact`: satu baris per detail kontak. Isi `subtitle` dengan email/nomor/lokasi dan `link` jika bisa diklik.
- `social`: satu baris per media sosial. `link` = URL profil.

Kolom `order` mengatur urutan item dalam section. Isi angka 1, 2, 3, dan seterusnya.

## 3. Publikasikan sheet sebagai CSV
1. Di Google Sheets pilih **File → Share → Publish to web**.
2. Pilih tab `Portfolio`, lalu pilih format **Comma-separated values (.csv)**.
3. Klik **Publish**, salin URL CSV yang diberikan.
4. Buka `script.js`, lalu isi konstanta `SHEET_CSV_URL` di baris paling atas dengan URL tersebut.
5. Pastikan spreadsheet tidak berisi data pribadi yang tidak ingin dipublikasikan. Publish to web membuat konten tab dapat diakses publik.

### Simpan foto di Google Drive
1. Buat folder khusus, misalnya `Portfolio Images`, di Google Drive.
2. Upload foto profil/ilustrasi dan gambar tiap proyek ke folder tersebut.
3. Untuk setiap file gambar, klik kanan → **Share / Bagikan** → ubah akses umum menjadi **Anyone with the link / Siapa saja yang memiliki link** dengan izin **Viewer / Pelihat**.
4. Salin link berbagi file, lalu tempel ke kolom `image` di Google Sheets. Contoh format link: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`.
5. Script akan mengenali link berbagi Drive dan mengubahnya menjadi URL thumbnail untuk ditampilkan di website.

**Penting:** gunakan link file gambar, bukan link folder. Pastikan izin file benar-benar publik; jika masih Restricted, pengunjung website tidak akan bisa melihat gambarnya. Hindari menyimpan dokumen pribadi di folder/file yang dipublikasikan. URL thumbnail Drive praktis untuk portofolio, tetapi Google Drive bukan layanan image CDN dan kuota/batas akses Google tetap berlaku. Jika suatu saat gambar tidak tampil atau trafik meningkat, pertimbangkan layanan image hosting/CDN.

## 4. Deploy ke GitHub Pages
1. Buat repository baru di GitHub, misalnya `portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke root repository.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
6. Tunggu proses selesai. Website akan tersedia di `https://USERNAME.github.io/portfolio/`.

Jika ingin URL `https://USERNAME.github.io/`, nama repository harus `USERNAME.github.io`.

## Catatan
- Website akan mencoba mengambil konten dari Google Sheets saat halaman dibuka. Jika URL sheet kosong atau gagal diakses, konten contoh tetap ditampilkan.
- Perubahan di Google Sheets akan muncul saat website dimuat ulang. Tidak perlu build/deploy ulang untuk perubahan konten.
- GitHub Pages hanya meng-host frontend statis. Jangan menaruh API key rahasia di JavaScript.
- Desain ini tidak memakai framework atau proses build, jadi mudah dipelihara.
