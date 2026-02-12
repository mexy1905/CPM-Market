let ilanlar = JSON.parse(localStorage.getItem("ilanlar")) || [];

function kaydet() {
  localStorage.setItem("ilanlar", JSON.stringify(ilanlar));
}

function ilanEkle() {
  const baslik = document.getElementById("baslik").value;
  const kategori = document.getElementById("kategori").value;
  const fiyat = document.getElementById("fiyat").value;

  if (!baslik || !fiyat) {
    alert("Boş bırakma");
    return;
  }

  const yeniIlan = {
    id: Date.now(),
    baslik,
    kategori,
    fiyat
  };

  ilanlar.push(yeniIlan);
  kaydet();
  goster(ilanlar);

  document.getElementById("baslik").value = "";
  document.getElementById("fiyat").value = "";
}

function sil(id) {
  ilanlar = ilanlar.filter(i => i.id !== id);
  kaydet();
  goster(ilanlar);
}

function detayGoster(id) {
  const ilan = ilanlar.find(i => i.id === id);

  document.getElementById("popupBaslik").innerText = ilan.baslik;
  document.getElementById("popupKategori").innerText = "Kategori: " + ilan.kategori;
  document.getElementById("popupFiyat").innerText = ilan.fiyat;

  document.getElementById("popup").style.display = "flex";
}

function kapat() {
  document.getElementById("popup").style.display = "none";
}

function goster(veri) {
  const container = document.getElementById("ilanlar");
  container.innerHTML = "";

  veri.forEach(ilan => {
    container.innerHTML += `
      <div class="ilan" onclick="detayGoster(${ilan.id})">
        <h3>${ilan.baslik}</h3>
        <p>Kategori: ${ilan.kategori}</p>
        <p class="fiyat">${ilan.fiyat}</p>
      </div>
    `;
  });
}

function filtrele(kategori) {
  if (kategori === "Hepsi") {
    goster(ilanlar);
  } else {
    const filtreli = ilanlar.filter(i => i.kategori === kategori);
    goster(filtreli);
  }
}

goster(ilanlar);
