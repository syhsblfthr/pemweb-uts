/* ============================================================
   instructor.js
   Semua data ada di array `instructors` di bawah ini.
   Edit data di sana saja — HTML tidak perlu disentuh.
============================================================ */

(function () {
"use strict";

const instructors = [
  { id: 1,  name: "Theresa Webb",       photo: "assets/Theresa-Webb.jpeg",       expertise: "Professional Web Developer",    students: 345, courses: 34, rating: 4.8, category: "Web Development", dateCreated: "2026-01-15", description: "Experienced web developer and instructor.", whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 2,  name: "Ronald Richards",    photo: "assets/Ronald-Richards.jpeg",    expertise: "Professional UI/UX Designer",   students: 512, courses: 21, rating: 4.9, category: "Design",          dateCreated: "2026-02-03", description: "Designs interfaces people enjoy using.",    whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 3,  name: "Savannah Nguyen",    photo: "assets/Savannah-Nguyen.jpeg",    expertise: "Professional Web Developer",    students: 289, courses: 18, rating: 4.7, category: "Web Development", dateCreated: "2026-02-20", description: "Front-end specialist.",                      whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 4,  name: "Kristin Watson",     photo: "assets/Kristin-Watson.jpeg",     expertise: "Digital Marketing Expert",      students: 640, courses: 27, rating: 4.6, category: "Marketing",       dateCreated: "2026-03-08", description: "Growth and SEO strategist.",                 whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 5,  name: "Cameron Williamson", photo: "assets/Cameron-Williamson.jpeg", expertise: "Professional Web Developer",    students: 410, courses: 30, rating: 4.8, category: "Web Development", dateCreated: "2026-03-22", description: "Full-stack developer.",                      whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 6,  name: "Darrell Steward",    photo: "assets/Darrell-Steward.jpeg",    expertise: "Data Science Specialist",       students: 735, courses: 25, rating: 4.9, category: "Data Science",    dateCreated: "2026-04-05", description: "Turns data into decisions.",                 whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 7,  name: "Jenny Wilson",       photo: "assets/Jenny Wilson.jpeg",       expertise: "Professional Graphic Designer", students: 368, courses: 22, rating: 4.5, category: "Design",          dateCreated: "2026-04-18", description: "Brand and graphic design.",                  whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 8,  name: "Esther Howard",      photo: "assets/Esther Howard.jpeg",      expertise: "Mobile App Developer",          students: 502, courses: 19, rating: 4.7, category: "Mobile",          dateCreated: "2026-05-02", description: "Builds Android and iOS apps.",               whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 9,  name: "Guy Hawkins",        photo: "assets/Guy Hawkins.jpeg",        expertise: "Business Strategy Coach",       students: 298, courses: 15, rating: 4.4, category: "Business",        dateCreated: "2026-05-27", description: "Startup and strategy mentor.",               whatsapp: "-", instagram: "namainstagram", linkedin: "" },
  { id: 10, name: "Jane Cooper",        photo: "assets/Jane Cooper.jpeg",        expertise: "Professional Web Developer",    students: 455, courses: 33, rating: 4.9, category: "Web Development", dateCreated: "2026-06-11", description: "Teaches modern JavaScript.",                 whatsapp: "-", instagram: "namainstagram", linkedin: "" }
];

/* ---------- State ---------- */
const state = { cari: "", kategori: "semua", urut: "tanggal" };

/* ---------- Elemen ---------- */
const ambil = (id) => document.getElementById(id);
const el = {
  daftar: ambil("daftar-kartu"),
  kosong: ambil("tampilan-kosong"),
  cari: ambil("kolom-cari"),
  kategori: ambil("pilih-kategori"),
  reset: ambil("tombol-reset"),
  kiri: ambil("geser-kiri"),
  kanan: ambil("geser-kanan")
};

/* ---------- Util ---------- */
const amankan = (teks) =>
  String(teks).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Gambar pengganti kalau foto gagal dimuat
function gambarCadangan(nama) {
  const inisial = nama.split(" ").map((k) => k[0]).slice(0, 2).join("").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#ddfae9"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" font-family="sans-serif" font-size="120" font-weight="600" fill="#0b1844">${inisial}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- Ikon ---------- */
const ikonSiswa = `<svg class="ikon-kecil" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.4c1.8.8 3 2.6 3 5.6"/></svg>`;
const ikonKursus = `<svg class="ikon-kecil" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/></svg>`;
const ikonBintang = `<svg class="bintang" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.2l-5.7 3.1 1.1-6.3-4.6-4.5 6.4-.9z"/></svg>`;

const ikonWa = `<svg class="ikon-kontak" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 9.2c.3 2.3 2.4 4.4 4.7 4.7l1.3-1.3-1.9-1-.8.7a4 4 0 0 1-1.9-1.9l.7-.8-1-1.9z"/></svg>`;
const ikonIg = `<svg class="ikon-kontak" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>`;
const ikonLinkedin = `<svg class="ikon-kontak" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10.5V17"/></svg>`;

/* ---------- Filter + urutkan ---------- */
function ambilData() {
  const kata = state.cari.trim().toLowerCase();

  const hasil = instructors.filter((i) => {
    const cocokCari = !kata || i.name.toLowerCase().includes(kata) || i.expertise.toLowerCase().includes(kata);
    const cocokKategori = state.kategori === "semua" || i.category === state.kategori;
    return cocokCari && cocokKategori;
  });

  hasil.sort((a, b) => {
    if (state.urut === "nama") return a.name.localeCompare(b.name);
    if (state.urut === "rating") return b.rating - a.rating || a.name.localeCompare(b.name);
    return new Date(b.dateCreated) - new Date(a.dateCreated); // terbaru dulu
  });

  return hasil;
}

/* ---------- Tombol kontak (WhatsApp & sosmed) ---------- */
// Nilai boleh berupa username saja atau alamat lengkap (https://...)
function buatTautan(nilai, dasar) {
  const teks = String(nilai).trim();
  return /^https?:\/\//i.test(teks) ? teks : dasar + teks.replace(/^@/, "");
}

function buatKontak(i) {
  const tombol = [];

  if (i.whatsapp) {
    const nomor = String(i.whatsapp).replace(/\D/g, ""); // hanya angka, awali kode negara (62...)
    const pesan = encodeURIComponent(`Halo ${i.name}, saya tertarik dengan kelas Anda.`);
    tombol.push(`<a class="tombol-wa" href="https://wa.me/${nomor}?text=${pesan}" target="_blank" rel="noopener noreferrer">${ikonWa}<span>WhatsApp</span></a>`);
  }
  if (i.instagram) {
    tombol.push(`<a class="tombol-sosmed" href="${amankan(buatTautan(i.instagram, "https://instagram.com/"))}" target="_blank" rel="noopener noreferrer" aria-label="Instagram ${amankan(i.name)}">${ikonIg}</a>`);
  }
  if (i.linkedin) {
    tombol.push(`<a class="tombol-sosmed" href="${amankan(buatTautan(i.linkedin, "https://www.linkedin.com/in/"))}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn ${amankan(i.name)}">${ikonLinkedin}</a>`);
  }

  return tombol.length ? `<div class="kontak">${tombol.join("")}</div>` : "";
}

/* ---------- Kartu ---------- */
function buatKartu(i) {
  return `
    <article class="kartu" data-id="${i.id}">
      <img class="foto" src="${amankan(i.photo)}" alt="${amankan(i.name)}" loading="lazy">
      <div class="info-angka">
        <span>${ikonSiswa}${i.students} Students</span>
        <span>${ikonKursus}${i.courses} Course</span>
      </div>
      <h3 class="nama">${amankan(i.name)}</h3>
      <p class="keahlian">${amankan(i.expertise)}</p>
      <div class="baris-rating">
        <p class="rating">${i.rating.toFixed(1)} ${ikonBintang}</p>
        <a class="tombol-ikuti" href="${amankan(i.courseLink || "#courses")}">Ikuti Kursus</a>
      </div>
      ${buatKontak(i)}
    </article>`;
}

/* ---------- Tampilkan semuanya ---------- */
function tampilkan() {
  const data = ambilData();

  el.daftar.innerHTML = data.map(buatKartu).join("");
  el.daftar.scrollTo({ left: 0, behavior: "instant" }); // kembali ke kartu pertama

  el.daftar.classList.toggle("sembunyi", data.length === 0);
  el.kosong.classList.toggle("sembunyi", data.length > 0);
}

/* ---------- Geser kiri / kanan ---------- */
function geser(arah) {
  const kartu = el.daftar.querySelector(".kartu");
  if (!kartu) return;
  const jarak = parseFloat(getComputedStyle(el.daftar).columnGap) || 0;
  el.daftar.scrollBy({ left: arah * (kartu.offsetWidth + jarak), behavior: "smooth" });
}

/* ---------- Mulai ---------- */
function isiKategori() {
  [...new Set(instructors.map((i) => i.category))].sort().forEach((k) => {
    const opsi = document.createElement("option");
    opsi.value = k;
    opsi.textContent = k;
    el.kategori.appendChild(opsi);
  });
}

function mulai() {
  if (!el.daftar) return;
  isiKategori();

  // Foto gagal dimuat -> pakai gambar cadangan
  el.daftar.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG" || img.dataset.cadangan) return;
    img.dataset.cadangan = "1";
    img.src = gambarCadangan(img.alt || "?");
  }, true);

  el.cari.addEventListener("input", (e) => { state.cari = e.target.value; tampilkan(); });
  el.kategori.addEventListener("change", (e) => { state.kategori = e.target.value; tampilkan(); });

  el.reset.addEventListener("click", () => {
    Object.assign(state, { cari: "", kategori: "semua", urut: "tanggal" });
    el.cari.value = "";
    el.kategori.value = "semua";
    tampilkan();
  });

  el.kiri.addEventListener("click", () => geser(-1));
  el.kanan.addEventListener("click", () => geser(1));


  tampilkan();
}

document.addEventListener("DOMContentLoaded", mulai);
})();