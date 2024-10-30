export const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";

  const date = new Date(dateString);
  if (isNaN(date)) return "Tanggal tidak valid";

  const now = new Date();
  const diff = now - date;

  // Jika kurang dari 24 jam, tampilkan waktu relatif
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    if (hours === 0) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} menit yang lalu`;
    }
    return `${hours} jam yang lalu`;
  }

  // Array nama hari dalam Bahasa Indonesia
  const hariIndonesia = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu'
  ];

  // Array nama bulan dalam Bahasa Indonesia
  const bulanIndonesia = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  const hari = hariIndonesia[date.getDay()];
  const tanggal = date.getDate();
  const bulan = bulanIndonesia[date.getMonth()];
  const tahun = date.getFullYear() !== now.getFullYear() ? `, ${date.getFullYear()}` : '';
  const jam = date.getHours().toString().padStart(2, '0');
  const menit = date.getMinutes().toString().padStart(2, '0');

  return `${hari}, ${tanggal} ${bulan}${tahun} ${jam}:${menit}`;
}; 