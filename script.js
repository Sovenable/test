const authToken = '_0jhWzQmS3tRi33P2YIaMwmqwUDEpa0X'; // Ganti dengan token akses Anda
const gasPin = 'V0'; // Virtual pin untuk nilai gas
const valvePin = 'V1'; // Virtual pin untuk status katup

function fetchData() {
    // Mendapatkan nilai sensor gas
    fetch('http://blynk-cloud.com/${authToken}/get/${gasPin}')
        .then(response => response.json())
        .then(data => {
            const gasValue = data[0] || 0; // Ambil nilai gas
            document.getElementById('gasValue').innerText = gasValue;

            // Mendapatkan status katup
            return fetch('http://blynk-cloud.com/${authToken}/get/${valvePin}');
        })
        .then(response => response.json())
        .then(data => {
            const valveStatus = data[0] || "Tidak diketahui"; // Ambil status katup
            document.getElementById('valveStatus').innerText = valveStatus;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('gasValue').innerText = 'Gagal mengambil data';
            document.getElementById('valveStatus').innerText = 'Gagal mengambil data';
        });
}

// Ambil data setiap 5 detik
setInterval(fetchData, 5000);
// Ambil data pertama kali saat halaman dimuat
fetchData();