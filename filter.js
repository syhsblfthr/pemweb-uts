// ===== FILTER COURSE (Nopal) =====
// Bergantung pada courses.js (Salsa): variabel `courses` dan fungsi `renderCourses(daftar)`.
// Pastikan <script src="courses.js"> dimuat SEBELUM <script src="filter.js">.

(function () {
  const inputCari = document.getElementById("search-input");
  const pilihKategori = document.getElementById("filter-kategori");
  const pilihLevel = document.getElementById("filter-level");
  const tombolReset = document.getElementById("filter-reset");

  // Kalau elemen filter belum ada di halaman, hentikan tanpa error
  if (!inputCari || !pilihKategori || !pilihLevel) return;

  // Isi opsi dropdown otomatis dari data course (tanpa duplikat)
  function isiOpsi(select, nilaiList) {
    for (const nilai of nilaiList) {
      const opt = document.createElement("option");
      opt.value = nilai;
      opt.textContent = nilai;
      select.appendChild(opt);
    }
  }
  isiOpsi(pilihKategori, [...new Set(courses.map((c) => c.kategori))]);
  const urutanLevel = ["Beginner", "Intermediate", "Advanced"];
  const levelAda = new Set(courses.map((c) => c.level));
  isiOpsi(pilihLevel, urutanLevel.filter((l) => levelAda.has(l)));

  // Fungsi utama: saring course sesuai kategori + level + kata kunci, lalu tampilkan
  function terapkanFilter() {
    const kategori = pilihKategori.value;
    const level = pilihLevel.value;
    const kataKunci = inputCari.value.trim().toLowerCase();

    const hasil = courses.filter((c) => {
      const cocokKategori = kategori === "" || c.kategori === kategori;
      const cocokLevel = level === "" || c.level === level;
      const cocokCari =
        kataKunci === "" ||
        c.nama.toLowerCase().includes(kataKunci) ||
        c.kategori.toLowerCase().includes(kataKunci) ||
        c.deskripsi.toLowerCase().includes(kataKunci);
      return cocokKategori && cocokLevel && cocokCari;
    });

    renderCourses(hasil);
  }

  function resetFilter() {
    inputCari.value = "";
    pilihKategori.value = "";
    pilihLevel.value = "";
    terapkanFilter();
  }

  // Event listener
  inputCari.addEventListener("input", terapkanFilter);
  pilihKategori.addEventListener("change", terapkanFilter);
  pilihLevel.addEventListener("change", terapkanFilter);
  if (tombolReset) tombolReset.addEventListener("click", resetFilter);

  // ===== DESKRIPSI COURSE (Nopal) =====
  // buatKartu() di courses.js belum menampilkan c.deskripsi, jadi disisipkan di sini
  // setelah setiap kali daftar dirender (tanpa mengubah courses.js).
  const daftarKartu = document.getElementById("course-list");

  function tambahDeskripsi() {
    for (const tombol of daftarKartu.querySelectorAll(".btn-detail")) {
      const kartu = tombol.closest("article");
      if (!kartu || kartu.querySelector(".course-desc")) continue;
      const c = courses.find((x) => x.id === Number(tombol.dataset.id));
      const judul = kartu.querySelector("h3");
      if (!c || !c.deskripsi || !judul) continue;
      const p = document.createElement("p");
      p.className = "course-desc";
      p.textContent = c.deskripsi;
      judul.after(p);
    }
  }

  if (daftarKartu) {
    // Jalan setiap kali #course-list diisi ulang (render awal, filter, reset)
    new MutationObserver(tambahDeskripsi).observe(daftarKartu, { childList: true });
    tambahDeskripsi();
  }
})();