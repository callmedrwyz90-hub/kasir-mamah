const itemName = document.getElementById('itemName');
const itemPrice = document.getElementById('itemPrice');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('listContainer');
const totalPriceEl = document.getElementById('totalPrice');
const resetBtn = document.getElementById('resetBtn');

// Load data dari Memori HP (LocalStorage)
let dataBelanja = JSON.parse(localStorage.getItem('catatan_mamah')) || [];

// Fungsi Update Tampilan
function updateUI() {
    listContainer.innerHTML = '';
    let grandTotal = 0;

    dataBelanja.forEach((item, index) => {
        grandTotal += item.harga;
        
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <div class="item-info">
                <b>${item.nama}</b>
                <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
            </div>
            <button class="delete-btn" onclick="hapusItem(${index})">Hapus</button>
        `;
        listContainer.appendChild(div);
    });

    totalPriceEl.innerText = `Rp ${grandTotal.toLocaleString('id-ID')}`;
    localStorage.setItem('catatan_mamah', JSON.stringify(dataBelanja));
}

// Event Tambah Data
addBtn.addEventListener('click', () => {
    const nama = itemName.value;
    const harga = parseInt(itemPrice.value);

    if (nama.trim() !== "" && !isNaN(harga)) {
        dataBelanja.push({ nama, harga });
        itemName.value = '';
        itemPrice.value = '';
        itemName.focus();
        updateUI();
    } else {
        alert('Mah, isi dulu nama barang sama harganya ya!');
    }
});

// Fungsi Hapus Satu Item (Global scope agar bisa dipanggil di HTML)
window.hapusItem = function(index) {
    dataBelanja.splice(index, 1);
    updateUI();
};

// Event Reset Semua
resetBtn.addEventListener('click', () => {
    if (confirm('Yakin mau hapus semua daftar belanjaan ini?')) {
        dataBelanja = [];
        updateUI();
    }
});

// Jalankan saat startup
updateUI();