// ===== COURSE (Salsa) =====
// Data 9 course. Tiap course punya: nama, gambar, level, durasi, harga (+ kategori & deskripsi untuk filter/modal)
const courses = [
  { id: 1, nama: "Web Development Dasar", kategori: "Web Development", level: "Beginner",     durasi: "8 minggu",  harga: 299000, populer: true,  gambar: "https://picsum.photos/seed/skillup-web1/400/250", deskripsi: "Belajar HTML, CSS, dan JavaScript dari nol sampai bisa membuat website sendiri." },
  { id: 2, nama: "Frontend dengan Tailwind", kategori: "Web Development", level: "Intermediate", durasi: "6 minggu",  harga: 349000, populer: false, gambar: "https://picsum.photos/seed/skillup-web2/400/250", deskripsi: "Membuat tampilan modern dan responsif dengan Tailwind CSS." },
  { id: 3, nama: "Fullstack JavaScript",     kategori: "Web Development", level: "Advanced",     durasi: "12 minggu", harga: 599000, populer: false, gambar: "https://picsum.photos/seed/skillup-web3/400/250", deskripsi: "Membangun aplikasi web lengkap dari tampilan sampai server." },
  { id: 4, nama: "Dasar UI/UX Design",       kategori: "UI/UX",           level: "Beginner",     durasi: "6 minggu",  harga: 249000, populer: true,  gambar: "https://picsum.photos/seed/skillup-ux1/400/250",  deskripsi: "Prinsip desain antarmuka dan dasar-dasar Figma." },
  { id: 5, nama: "UX Research & Prototyping", kategori: "UI/UX",          level: "Intermediate", durasi: "8 minggu",  harga: 399000, populer: false, gambar: "https://picsum.photos/seed/skillup-ux2/400/250",  deskripsi: "Riset pengguna dan membuat prototype yang bisa diklik." },
  { id: 6, nama: "Python Dasar",             kategori: "Python",          level: "Beginner",     durasi: "6 minggu",  harga: 199000, populer: true,  gambar: "https://picsum.photos/seed/skillup-py1/400/250",  deskripsi: "Variabel, perulangan, fungsi, dan logika pemrograman dengan Python." },
  { id: 7, nama: "Python untuk Otomasi",     kategori: "Python",          level: "Intermediate", durasi: "6 minggu",  harga: 299000, populer: false, gambar: "https://picsum.photos/seed/skillup-py2/400/250",  deskripsi: "Mengotomatiskan pekerjaan sehari-hari dengan skrip Python." },
  { id: 8, nama: "Pengenalan AI & Machine Learning", kategori: "AI",      level: "Intermediate", durasi: "10 minggu", harga: 499000, populer: false, gambar: "https://picsum.photos/seed/skillup-ai1/400/250",  deskripsi: "Konsep dasar AI dan membuat model machine learning sederhana." },
  { id: 9, nama: "Data Science dengan Python", kategori: "Data Science",  level: "Advanced",     durasi: "12 minggu", harga: 649000, populer: false, gambar: "https://picsum.photos/seed/skillup-ds1/400/250",  deskripsi: "Analisis dan visualisasi data memakai pandas dan matplotlib." },
];

// Fungsi: mengubah angka menjadi format rupiah
function formatHarga(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Fungsi: membuat HTML satu kartu course
function buatKartu(c) {
  const badgePopuler = c.populer
    ? '<span class="absolute top-3 left-3 bg-tertiary text-white text-xs font-bold px-3 py-1 rounded-full">Populer</span>'
    : "";

  return `
    <article class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div class="relative">
        <img class="h-44 w-full object-cover" src="${c.gambar}" alt="Gambar course ${c.nama}" loading="lazy">
        ${badgePopuler}
      </div>
      <div class="p-5 flex flex-col gap-y-3 grow">
        <div class="flex justify-between items-center text-sm">
          <span class="bg-secondary-lighter text-quaternary font-semibold px-3 py-1 rounded-full">${c.kategori}</span>
          <span class="text-quaternary font-medium">${c.level}</span>
        </div>
        <h3 class="font-bold text-xl text-quaternary">${c.nama}</h3>
        <p class="text-sm text-quaternary/70">Durasi: ${c.durasi}</p>
        <div class="flex justify-between items-center mt-auto pt-3">
          <span class="font-bold text-tertiary text-lg">${formatHarga(c.harga)}</span>
          <button type="button" data-id="${c.id}" class="btn-detail cursor-pointer bg-tertiary text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-300 hover:opacity-90">
            Lihat Detail
          </button>
        </div>
      </div>
    </article>`;
}

// Fungsi utama: menampilkan daftar course (dipanggil juga oleh filter Nopal)
function renderCourses(daftar) {
  const list = document.getElementById("course-list");
  const kosong = document.getElementById("course-empty");
  const jumlah = document.getElementById("course-count");

  let html = "";
  for (const c of daftar) {          // perulangan
    html += buatKartu(c);
  }
  list.innerHTML = html;

  kosong.classList.toggle("hidden", daftar.length > 0);
  jumlah.textContent = "Menampilkan " + daftar.length + " dari " + courses.length + " course";
}

// Tampilkan semua course saat halaman dibuka
renderCourses(courses);
