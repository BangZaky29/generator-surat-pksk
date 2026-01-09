import React, { useState, useRef } from 'react';
import { FileText, User, Mail, FileEdit, Download, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';

// Component: Accordion untuk form sections
const Accordion = ({ title, icon: Icon, children, isOpen, onToggle }) => {
  return (
    <div className="mb-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="p-4 pt-0 border-t border-gray-100">{children}</div>}
    </div>
  );
};

// Component: Input Field
const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
      />
    </div>
  );
};

// Component: Textarea Field
const TextareaField = ({ label, name, value, onChange, placeholder, rows = 3 }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
      />
    </div>
  );
};

// Component: Image Upload
const ImageUpload = ({ label, onChange, preview, onRemove }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="max-h-32 mx-auto rounded" />
            <button
              onClick={onRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Klik untuk upload gambar
            </button>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG hingga 2MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

// Component: Preview Surat
const PreviewSurat = ({ data, logoHeader, stempelPihak1, stempelPihak2 }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="
        bg-white 
        p-4 sm:p-6 lg:p-8
        rounded-lg shadow-sm 
        border border-gray-200 
        print:border-0 print:shadow-none print:rounded-none
        min-h-[800px]
        overflow-x-auto
      ">
      <div className="
          max-w-4xl mx-auto
          origin-top
          scale-[0.85]
          sm:scale-100
        ">
        {/* Header dengan Logo */}
        {/* Header dengan Logo */}
          <div className="mb-6 pb-4 border-b-2 border-gray-800">
            <div className="flex items-start gap-4 sm:gap-6">
              
              {/* Logo - Kiri */}
              <div className="w-16 sm:w-20 lg:w-24 flex-shrink-0">
                {logoHeader ? (
                  <img
                    src={logoHeader}
                    alt="Logo Header"
                    className="h-20 w-full object-contain"
                  />
                ) : (
                  <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Logo</span>
                  </div>
                )}
              </div>

              {/* Teks Header - Tengah */}
              <div className="
                flex-1 text-center
                text-[11px] sm:text-sm
                leading-tight
                -ml-10 sm:-ml-16 lg:-ml-20
              ">
                <p className="font-semibold">
                  {data.namaGedung || 'THE KENSINGTON OFFICE TOWER Lt.2 Ruang B2'}
                </p>
                <p>{data.alamatGedung || 'Jl. Boulevard Raya No.1, RT.4/RW.17'}</p>
                <p>{data.alamatGedung2 || 'Kel. Kelapa Gading Timur, Kec. Kelapa Gading'}</p>
                <p>{data.alamatGedung3 || 'Jakarta Utara, DKI Jakarta, 14240'}</p>
                <p>
                  Telepon/Fax : {data.telpon || '(021) 45840071'}/
                  {data.fax || '22450823'}
                </p>
              </div>

            </div>
          </div>


        {/* Judul Surat */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-2">SURAT PERJANJIAN KONTRAK SEWA KANTOR</h1>
          <p className="text-sm">Nomor: {data.nomorSurat || '0224/LT.02/R.B2/PT.SBB/2025'}</p>
        </div>

        {/* Isi Surat */}
        <div className="
          text-justify
          leading-relaxed
          text-[12px] sm:text-sm
          space-y-3 sm:space-y-4
        ">
          <p>Yang bertanda tangan di bawah ini :</p>

          {/* Pihak Pertama */}
          <div className="ml-4 overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1 w-4">1.</td>
                  <td className="py-1 w-32">Nama</td>
                  <td className="py-1 w-4">:</td>
                  <td className="py-1 font-semibold uppercase">{data.namaPihak1 || 'IDRUS HADDAD'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1">No. KTP</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{data.ktpPihak1 || '3175.1029.0398.0002'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1">Jabatan</td>
                  <td className="py-1">:</td>
                  <td className="py-1 uppercase">{data.jabatanPihak1 || 'KEPALA CABANG'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1 align-top">Alamat</td>
                  <td className="py-1 align-top">:</td>
                  <td className="py-1 uppercase">{data.alamatPihak1 || 'JL. PIJAR NO.57 RT.005 RW.004, DUKUH, KRAMAT JATI, JAKARTA TIMUR, DKI JAKARTA'}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 ml-10">Selanjutnya disebut <strong>Pihak Pertama / Pemilik Ruang Kantor</strong></p>
          </div>

          {/* Pihak Kedua */}
          <div className="ml-4 overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-1 w-4">2.</td>
                  <td className="py-1 w-32">Nama</td>
                  <td className="py-1 w-4">:</td>
                  <td className="py-1 font-semibold uppercase break-words">{data.namaPihak2 || 'IWAN MALIK AL RASYID SIREGAR'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1">No. KTP</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{data.ktpPihak2 || '3172.0228.0197.0008'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1 align-top">Alamat</td>
                  <td className="py-1 align-top">:</td>
                  <td className="py-1 uppercase break-words">{data.alamatPihak2 || 'JL. SAMUDRA OXFORD II NO. 24, RT/RW 004/006, RAWA BADAK SELATAN, KOJA, JAKARTA UTARA, DKI JAKARTA'}</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1 align-top">Penanggung Jawab</td>
                  <td className="py-1 align-top">:</td>
                  <td className="py-1 font-semibold uppercase break-words">{data.perusahaanPihak2 || 'PT. GALANGGANG SAMUDERA MANDIRI'}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 ml-10">Selanjutnya disebut <strong>Pihak Kedua / Penyewa</strong></p>
          </div>

          <p>
            Dalam Surat Perjanjian Kontrak Sewa Kantor ini, kedua belah pihak telah sepakat untuk mengadakan 
            perjanjian sewa dengan syarat-syarat sebagai berikut :
          </p>

          {/* Pasal 1 */}
          <div>
            <p className="font-bold">Pasal 1</p>
            <p>
              Pihak Pertama (Pemilik) bersedia Menyewakan Kantor Virtual Office Kepada Pihak Kedua yang beralamat 
              di {data.alamatObjekSewa || 'THE KENSINGTON OFFICE TOWER Lt.2 Ruang B2, Jl. Boulevard Raya No.1, RT.4/RW.17, Kel.Kelapa Gading Timur, Kec.Kelapa Gading, Kota Jakarta Utara, Daerah Khusus Ibukota Jakarta 14240'}
            </p>
          </div>

          {/* Pasal 2 */}
          <div>
            <p className="font-bold">Pasal 2</p>
            <p>
              Bahwa status Sewa Pihak Kedua kepada Pihak Pertama adalah Sewa Kantor dan hanya sebatas sewa 
              alamat Domisili kegiatan, bukan penjamin usaha perusahaan tersebut.
            </p>
          </div>

          {/* Pasal 3 */}
          <div>
            <p className="font-bold">Pasal 3</p>
            <p>
              Masa sewa ini berlaku selama {data.masaSewa || '1 (Satu) Tahun'} terhitung mulai tanggal {data.tanggalMulai ? formatDate(data.tanggalMulai) : '15-07-2025'} sampai dengan {data.tanggalSelesai ? formatDate(data.tanggalSelesai) : '14-07-2026'} dan apabila Pihak Kedua akan memperpanjang masa sewa, maka Pihak Kedua wajib lapor 
              kepada Pihak Pertama minimal 1 bulan sebelum masa sewa ini habis. Dan jika tenggat waktu berakhir, 
              secara otomatis Kontrak Terputus serta tidak lagi berlaku dan mengikat kedua belah Pihak.
            </p>
          </div>

          {/* Pasal 4 */}
          <div>
            <p className="font-bold">Pasal 4</p>
            <p>
              Fasilitas yang di dapat adalah: {data.fasilitas || 'Alamat kantor berikut nomor telepon, fax, staf resepsionis bersama, Free ruang meeting 10 jam/bulan (konfirmasi terlebih dahulu sehari sebelum meeting). Selebihnya dari 10 jam dikenakan biaya tambahan 100 ribu/jam dengan minimal pemakaian 2 (Dua) jam dalam satu kali pertemuan.'}
            </p>
          </div>

          {/* Pasal 5 */}
          <div>
            <p className="font-bold">Pasal 5</p>
            <p>
              Biaya sewa sebesar Rp {data.biayaSewa || '3.000.000'},-  ({data.biayaSewaTerbilang || 'Tiga Juta Rupiah'}) untuk masa sewa {data.masaSewa || '1 (Satu) Tahun'} dan biaya tersebut 
              bisa dibayarkan tunai atau melalui transfer ke no. rek {data.bank || 'BCA'} {data.noRekening || '539.0561.565'} an. {data.atasNama || 'PT. SENTRAL BISNIS BERSAMA'} Pihak Kedua kepada Pihak Pertama pada saat Surat Perjanjian Kontrak Sewa Kantor bersama 
              ini ditandatangani
            </p>
          </div>

          {/* Pasal 6 */}
          <div>
            <p className="font-bold">Pasal 6</p>
            <p>
              Transaksi sewa menyewa yang telah disepakati dan dibayarkan oleh Pihak kedua adalah mengikat, 
              sehingga tidak dapat dibatalkan atau dikembalikan dengan alasan apapun.
            </p>
          </div>

          {/* Pasal 7 */}
          <div>
            <p className="font-bold mb-2">Pasal 7</p>
            <ol className="list-none space-y-2">
              <li>
                a) Bahwa kegiatan usaha yang dilakukan Pihak Kedua Tidak Melanggar/Bertentangan dengan 
                Hukum dan Undang Undang serta Norma yang berlaku Indonesia.
              </li>
              <li>
                b) Pihak Pertama selaku pemilik obyek sewaan tidak dilibatkan dan tidak ikut bertanggung 
                jawab atas transaksi apapun antara Pihak Kedua (Penyewa) kepada Pihak Ketiga atau 
                Pihak Lainnya. Dan membebaskan Pihak Pertama Atas Segala Tuntutan Hukum yang timbul 
                dikemudian hari akibat transaksi dan kegiatan usaha Pihak Kedua.
              </li>
              <li>
                c) Surat kontrak sewa ini berlaku untuk satu badan usaha, bila digunakan/di pinjamkan ke badan 
                usaha lain kami anggap melanggar hukum & kami akan proses secara hukum.
              </li>
            </ol>
          </div>

          {/* Pasal 8 */}
          <div>
            <p className="font-bold">Pasal 8</p>
            <p>
              Apabila terjadi penyimpangan dari ketentuan tersebut diatas, maka kedua belah pihak sepakat untuk 
              menyelesaikan secara musyawarah. Apabila tidak dapat diselesaikan secara musyawarah, maka kedua belah 
              pihak sepakat menyelesaikan secara hukum yang berlaku dengan memilih Pengadilan Negeri {data.pengadilan || 'Jakarta Utara'}.
            </p>
          </div>

          <p>
            Demikian Surat Perjanjian Kontrak Sewa Kantor Bersama ini dibuat dalam 2 (Dua) rangkap dan bermaterai cukup.
          </p>
        </div>

        {/* Tanda Tangan */}
        <div className="mt-12">
          <p className="text-sm mb-8">{data.tempatTandaTangan || 'Jakarta'}, {data.tanggalSurat ? formatDate(data.tanggalSurat) : '15 Juli 2025'}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Pihak Pertama */}
            <div className="text-center">
              <p className="font-semibold mb-2">Pihak Pertama</p>
              
              {/* Area TTD dengan Stempel Absolute */}
              <div className="relative h-32 mb-2 flex items-center justify-center">
                {stempelPihak1 && (
                  <img 
                    src={stempelPihak1} 
                    alt="Stempel Pihak 1" 
                    className="absolute inset-0 h-24 w-24 mx-auto my-auto opacity-70 object-contain" 
                  />
                )}
              </div>
              
              <p className="font-bold uppercase">({data.namaPihak1 || 'IDRUS HADDAD'})</p>
            </div>

            {/* Pihak Kedua */}
            <div className="text-center">
              <p className="font-semibold mb-2">Pihak Kedua</p>
              
              {/* Area TTD dengan Stempel Absolute */}
              <div className="relative h-32 mb-2 flex items-center justify-center">
                {stempelPihak2 && (
                  <img 
                    src={stempelPihak2} 
                    alt="Stempel Pihak 2" 
                    className="absolute inset-0 h-24 w-24 mx-auto my-auto opacity-70 object-contain" 
                  />
                )}
              </div>
              
              <p className="font-bold uppercase">({data.namaPihak2 || 'IWAN MALIK AL RASYID SIREGAR'})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [viewMode, setViewMode] = useState('form'); 
  const [openSections, setOpenSections] = useState({
    header: true,
    pihak1: false,
    pihak2: false,
    isi: false,
    upload: false
  });

  const [formData, setFormData] = useState({
    // Header
    namaGedung: 'THE KENSINGTON OFFICE TOWER Lt.2 Ruang B2',
    alamatGedung: 'Jl. Boulevard Raya No.1, RT.4/RW.17',
    alamatGedung2: 'Kel. Kelapa Gading Timur, Kec. Kelapa Gading',
    alamatGedung3: 'Jakarta Utara, DKI Jakarta, 14240',
    telpon: '(021) 45840071',
    fax: '22450823',
    nomorSurat: '0224/LT.02/R.B2/PT.SBB/2025',
    
    // Pihak Pertama
    namaPihak1: 'IDRUS HADDAD',
    ktpPihak1: '3175.1029.0398.0002',
    jabatanPihak1: 'KEPALA CABANG',
    alamatPihak1: 'JL. PIJAR NO.57 RT.005 RW.004, DUKUH, KRAMAT JATI, JAKARTA TIMUR, DKI JAKARTA',
    
    // Pihak Kedua
    namaPihak2: 'IWAN MALIK AL RASYID SIREGAR',
    ktpPihak2: '3172.0228.0197.0008',
    alamatPihak2: 'JL. SAMUDRA OXFORD II NO. 24, RT/RW 004/006, RAWA BADAK SELATAN, KOJA, JAKARTA UTARA, DKI JAKARTA',
    perusahaanPihak2: 'PT. GALANGGANG SAMUDERA MANDIRI',
    
    // Isi Surat
    alamatObjekSewa: 'THE KENSINGTON OFFICE TOWER Lt.2 Ruang B2, Jl. Boulevard Raya No.1, RT.4/RW.17, Kel.Kelapa Gading Timur, Kec.Kelapa Gading, Kota Jakarta Utara, Daerah Khusus Ibukota Jakarta 14240',
    masaSewa: '1 (Satu) Tahun',
    tanggalMulai: '2025-07-15',
    tanggalSelesai: '2026-07-14',
    fasilitas: 'Alamat kantor berikut nomor telepon, fax, staf resepsionis bersama, Free ruang meeting 10 jam/bulan (konfirmasi terlebih dahulu sehari sebelum meeting). Selebihnya dari 10 jam dikenakan biaya tambahan 100 ribu/jam dengan minimal pemakaian 2 (Dua) jam dalam satu kali pertemuan.',
    biayaSewa: '3.000.000',
    biayaSewaTerbilang: 'Tiga Juta Rupiah',
    bank: 'BCA',
    noRekening: '539.0561.565',
    atasNama: 'PT. SENTRAL BISNIS BERSAMA',
    pengadilan: 'Jakarta Utara',
    tempatTandaTangan: 'Jakarta',
    tanggalSurat: '2025-07-15'
  });

  const [logoHeader, setLogoHeader] = useState(null);
  const [stempelPihak1, setStempelPihak1] = useState(null);
  const [stempelPihak2, setStempelPihak2] = useState(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoHeader(reader.result);
        } else if (type === 'stempel1') {
          setStempelPihak1(reader.result);
        } else if (type === 'stempel2') {
          setStempelPihak2(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type) => {
    if (type === 'logo') {
      setLogoHeader(null);
    } else if (type === 'stempel1') {
      setStempelPihak1(null);
    } else if (type === 'stempel2') {
      setStempelPihak2(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Generator Surat Kontrak Sewa Kantor</h1>
              <p className="text-sm text-gray-600">Buat surat kontrak sewa dengan mudah dan profesional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Form */}
          <div
              className={`
                lg:col-span-2 print:hidden
                ${viewMode === 'preview' ? 'hidden' : 'block'}
                lg:block
              `}
            >
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <div className="flex items-start gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Tips:</p>
                  <p className="text-sm text-blue-800">
                    Pastikan semua data terisi dengan benar sebelum mencetak surat. 
                    Upload logo dan stempel untuk hasil yang lebih profesional.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 inline-flex items-center justify-center text-sm mr-2">1</span>
                Isi Data Surat
              </h2>

              {/* Header Surat */}
              <Accordion
                title="Informasi Header"
                icon={FileText}
                isOpen={openSections.header}
                onToggle={() => toggleSection('header')}
              >
                <InputField
                  label="Nama Gedung/Kantor"
                  name="namaGedung"
                  value={formData.namaGedung}
                  onChange={handleInputChange}
                  placeholder="THE KENSINGTON OFFICE TOWER Lt.2 Ruang B2"
                />
                <InputField
                  label="Alamat Baris 1"
                  name="alamatGedung"
                  value={formData.alamatGedung}
                  onChange={handleInputChange}
                  placeholder="Jl. Boulevard Raya No.1, RT.4/RW.17"
                />
                <InputField
                  label="Alamat Baris 2"
                  name="alamatGedung2"
                  value={formData.alamatGedung2}
                  onChange={handleInputChange}
                  placeholder="Kel. Kelapa Gading Timur, Kec. Kelapa Gading"
                />
                <InputField
                  label="Alamat Baris 3"
                  name="alamatGedung3"
                  value={formData.alamatGedung3}
                  onChange={handleInputChange}
                  placeholder="Jakarta Utara, DKI Jakarta, 14240"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Telepon"
                    name="telpon"
                    value={formData.telpon}
                    onChange={handleInputChange}
                    placeholder="(021) 45840071"
                  />
                  <InputField
                    label="Fax"
                    name="fax"
                    value={formData.fax}
                    onChange={handleInputChange}
                    placeholder="22450823"
                  />
                </div>
                <InputField
                  label="Nomor Surat"
                  name="nomorSurat"
                  value={formData.nomorSurat}
                  onChange={handleInputChange}
                  placeholder="0224/LT.02/R.B2/PT.SBB/2025"
                />
              </Accordion>

              {/* Pihak Pertama */}
              <Accordion
                title="Data Pihak Pertama"
                icon={User}
                isOpen={openSections.pihak1}
                onToggle={() => toggleSection('pihak1')}
              >
                <InputField
                  label="Nama Lengkap"
                  name="namaPihak1"
                  value={formData.namaPihak1}
                  onChange={handleInputChange}
                  placeholder="IDRUS HADDAD"
                />
                <InputField
                  label="No. KTP"
                  name="ktpPihak1"
                  value={formData.ktpPihak1}
                  onChange={handleInputChange}
                  placeholder="3175.1029.0398.0002"
                />
                <InputField
                  label="Jabatan"
                  name="jabatanPihak1"
                  value={formData.jabatanPihak1}
                  onChange={handleInputChange}
                  placeholder="KEPALA CABANG"
                />
                <TextareaField
                  label="Alamat Lengkap"
                  name="alamatPihak1"
                  value={formData.alamatPihak1}
                  onChange={handleInputChange}
                  placeholder="JL. PIJAR NO.57 RT.005 RW.004, DUKUH..."
                  rows={3}
                />
              </Accordion>

              {/* Pihak Kedua */}
              <Accordion
                title="Data Pihak Kedua"
                icon={Mail}
                isOpen={openSections.pihak2}
                onToggle={() => toggleSection('pihak2')}
              >
                <InputField
                  label="Nama Lengkap"
                  name="namaPihak2"
                  value={formData.namaPihak2}
                  onChange={handleInputChange}
                  placeholder="IWAN MALIK AL RASYID SIREGAR"
                />
                <InputField
                  label="No. KTP"
                  name="ktpPihak2"
                  value={formData.ktpPihak2}
                  onChange={handleInputChange}
                  placeholder="3172.0228.0197.0008"
                />
                <TextareaField
                  label="Alamat Lengkap"
                  name="alamatPihak2"
                  value={formData.alamatPihak2}
                  onChange={handleInputChange}
                  placeholder="JL. SAMUDRA OXFORD II NO. 24..."
                  rows={3}
                />
                <InputField
                  label="Nama Perusahaan/Penanggung Jawab"
                  name="perusahaanPihak2"
                  value={formData.perusahaanPihak2}
                  onChange={handleInputChange}
                  placeholder="PT. GALANGGANG SAMUDERA MANDIRI"
                />
              </Accordion>

              {/* Isi Surat */}
              <Accordion
                title="Detail Kontrak"
                icon={FileEdit}
                isOpen={openSections.isi}
                onToggle={() => toggleSection('isi')}
              >
                <TextareaField
                  label="Alamat Objek Sewa"
                  name="alamatObjekSewa"
                  value={formData.alamatObjekSewa}
                  onChange={handleInputChange}
                  placeholder="THE KENSINGTON OFFICE TOWER..."
                  rows={3}
                />
                <InputField
                  label="Masa Sewa"
                  name="masaSewa"
                  value={formData.masaSewa}
                  onChange={handleInputChange}
                  placeholder="1 (Satu) Tahun"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Tanggal Mulai"
                    name="tanggalMulai"
                    value={formData.tanggalMulai}
                    onChange={handleInputChange}
                    type="date"
                  />
                  <InputField
                    label="Tanggal Selesai"
                    name="tanggalSelesai"
                    value={formData.tanggalSelesai}
                    onChange={handleInputChange}
                    type="date"
                  />
                </div>
                <TextareaField
                  label="Fasilitas yang Didapat"
                  name="fasilitas"
                  value={formData.fasilitas}
                  onChange={handleInputChange}
                  placeholder="Alamat kantor berikut nomor telepon, fax..."
                  rows={4}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Biaya Sewa (Angka)"
                    name="biayaSewa"
                    value={formData.biayaSewa}
                    onChange={handleInputChange}
                    placeholder="3.000.000"
                  />
                  <InputField
                    label="Biaya Sewa (Terbilang)"
                    name="biayaSewaTerbilang"
                    value={formData.biayaSewaTerbilang}
                    onChange={handleInputChange}
                    placeholder="Tiga Juta Rupiah"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Bank"
                    name="bank"
                    value={formData.bank}
                    onChange={handleInputChange}
                    placeholder="BCA"
                  />
                  <InputField
                    label="No. Rekening"
                    name="noRekening"
                    value={formData.noRekening}
                    onChange={handleInputChange}
                    placeholder="539.0561.565"
                  />
                  <InputField
                    label="Atas Nama"
                    name="atasNama"
                    value={formData.atasNama}
                    onChange={handleInputChange}
                    placeholder="PT. SENTRAL..."
                  />
                </div>
                <InputField
                  label="Pengadilan"
                  name="pengadilan"
                  value={formData.pengadilan}
                  onChange={handleInputChange}
                  placeholder="Jakarta Utara"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Tempat Tanda Tangan"
                    name="tempatTandaTangan"
                    value={formData.tempatTandaTangan}
                    onChange={handleInputChange}
                    placeholder="Jakarta"
                  />
                  <InputField
                    label="Tanggal Surat"
                    name="tanggalSurat"
                    value={formData.tanggalSurat}
                    onChange={handleInputChange}
                    type="date"
                  />
                </div>
              </Accordion>

              {/* Upload Logo & Stempel */}
              <Accordion
                title="Upload Logo & Stempel"
                icon={Upload}
                isOpen={openSections.upload}
                onToggle={() => toggleSection('upload')}
              >
                <ImageUpload
                  label="Logo Header Surat"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  preview={logoHeader}
                  onRemove={() => handleRemoveImage('logo')}
                />
                <ImageUpload
                  label="Stempel Pihak Pertama"
                  onChange={(e) => handleImageUpload(e, 'stempel1')}
                  preview={stempelPihak1}
                  onRemove={() => handleRemoveImage('stempel1')}
                />
                <ImageUpload
                  label="Stempel Pihak Kedua"
                  onChange={(e) => handleImageUpload(e, 'stempel2')}
                  preview={stempelPihak2}
                  onRemove={() => handleRemoveImage('stempel2')}
                />
              </Accordion>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div
              className={`
                lg:col-span-3
                ${viewMode === 'form' ? 'hidden' : 'block'}
                lg:block
              `}
            >
            <div className="print:hidden mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 inline-flex items-center justify-center text-sm mr-2">2</span>
                  Pratinjau Hasil
                </h2>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Cetak PDF
                </button>
              </div>
            </div>

            <PreviewSurat 
              data={formData} 
              logoHeader={logoHeader}
              stempelPihak1={stempelPihak1}
              stempelPihak2={stempelPihak2}
            />
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          @page {
            size: A4;
            margin: 2cm 2cm 2cm 2cm;
          }
          
          /* Page break untuk pasal-pasal */
          .space-y-4 > div {
            page-break-inside: avoid;
            margin-bottom: 1rem;
          }
          
          /* Margin tambahan untuk awal halaman baru */
          .page-break-before {
            page-break-before: always;
            margin-top: 2cm;
          }
          
          /* Hindari page break di tengah tanda tangan */
          .mt-12 {
            page-break-inside: avoid;
          }
        }
      `}</style>
      {/* Floating Toggle Button (Mobile Only) */}
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <button
            onClick={() =>
              setViewMode(viewMode === 'form' ? 'preview' : 'form')
            }
            className="
              w-14 h-14
              rounded-full
              bg-blue-600 hover:bg-blue-700
              text-white
              flex items-center justify-center
              shadow-lg
              transition-all
              active:scale-95
            "
            aria-label="Toggle View"
          >
            {/* Icon */}
            {viewMode === 'form' ? (
              <FileText className="w-6 h-6" />
            ) : (
              <FileEdit className="w-6 h-6" />
            )}

            {/* Aksesibilitas label */}
            <span className="sr-only">
              {viewMode === 'form' ? 'Lihat Preview' : 'Edit Form'}
            </span>
          </button>

        </div>

    </div>
  );
}