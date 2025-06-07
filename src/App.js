import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Bertanya');
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    waktu: 'Pagi',
    title: 'Pak',
    namaDosen: '',
    keperluan: ''
  });
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Membuat pesan secara realtime setiap kali formData berubah
  useEffect(() => {
    generateMessage();
  }, [formData, activeTab]);

  // Effect untuk menghilangkan notifikasi setelah beberapa detik
  useEffect(() => {
    if (showNotification) {
      const hideTimer = setTimeout(() => {
        setIsHiding(true);
      }, 2500);
      
      const removeTimer = setTimeout(() => {
        setShowNotification(false);
        setIsHiding(false);
      }, 3000);
      
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [showNotification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateMessage = () => {
    const { nama, kelas, waktu, title, namaDosen, keperluan } = formData;
    const dosenName = namaDosen ? ` ${namaDosen}` : '';

    let generatedMessage = '';

    if (activeTab === 'Bertanya') {
      generatedMessage = `Assalamu'alaikum Wr. Wb.

Selamat ${waktu}, ${title}${dosenName}.

Perkenalkan, saya ${nama || '[nama]'} dari kelas ${kelas || '[kelas]'}. Mohon maaf mengganggu waktu Bapak/Ibu. Saya ingin bertanya mengenai ${keperluan || '[keperluan]'}

Terima kasih atas perhatian dan waktunya.

Wassalamu'alaikum Wr. Wb.`;
    } else if (activeTab === 'Memberitahu') {
      generatedMessage = `Assalamu'alaikum Wr. Wb.

Selamat ${waktu}, ${title}${dosenName}.

Perkenalkan, saya ${nama || '[nama]'} dari kelas ${kelas || '[kelas]'}. Melalui pesan ini, saya ingin menyampaikan informasi bahwa ${keperluan || '[keperluan]'}.

Terima kasih atas perhatian Bapak/Ibu.

Wassalamu'alaikum Wr. Wb.`;
    } else if (activeTab === 'Bertemu') {
      generatedMessage = `Assalamu'alaikum Wr. Wb.

Selamat ${waktu}, ${title}${dosenName}.

Perkenalkan, saya ${nama || '[nama]'} dari kelas ${kelas || '[kelas]'}. Saya bermaksud untuk mengajukan permohonan bertemu dengan Bapak/Ibu terkait ${keperluan || '[keperluan]'}. Kapankah Bapak/Ibu memiliki waktu luang untuk melakukan pertemuan ini?

Terima kasih atas perhatian dan waktunya.

Wassalamu'alaikum Wr. Wb.`;
    }

    setMessage(generatedMessage);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      kelas: '',
      waktu: 'Pagi',
      title: 'Pak',
      namaDosen: '',
      keperluan: ''
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setShowNotification(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app-wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="mode-toggle">
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <main className="app-container">
        <div className="app-header">
          <h1>ChatDosen</h1>
          <p className="subtitle">Generator chat simple untuk dosen</p>
        </div>

        <div className="tabs">
          {['Bertanya', 'Memberitahu', 'Bertemu'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="app-content">
          <section className="form-section">
            <div className="form-group">
              <label>Nama</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div className="form-group">
              <label>Kelas</label>
              <input
                type="text"
                name="kelas"
                value={formData.kelas}
                onChange={handleInputChange}
                placeholder="Contoh: TI22A Semester 4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Waktu</label>
                <select
                  name="waktu"
                  value={formData.waktu}
                  onChange={handleInputChange}
                >
                  <option value="Pagi">Pagi</option>
                  <option value="Siang">Siang</option>
                  <option value="Malam">Malam</option>
                </select>
              </div>

              <div className="form-group">
                <label>Panggilan</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                >
                  <option value="Pak">Pak</option>
                  <option value="Bu">Bu</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label>Nama Dosen</label>
              <input
                type="text"
                name="namaDosen"
                value={formData.namaDosen}
                onChange={handleInputChange}
                placeholder="Contoh: Agus"
              />
            </div>

            <div className="form-group">
              <label>Keperluan</label>
              <textarea
                name="keperluan"
                value={formData.keperluan}
                onChange={handleInputChange}
                placeholder="Jelaskan keperluan Anda dengan dosen"
              ></textarea>
            </div>

            <div className="form-actions">
              <button className="reset-btn" onClick={resetForm}>Reset</button>
            </div>
          </section>

          <section className="preview-section">
            <div className="preview-heading">
              <h2>Preview Pesan</h2>
              <button
                className="copy-btn"
                onClick={copyToClipboard}
                disabled={!message.trim()}
              >
                Salin
              </button>
            </div>
            <div className="message-preview">
              <p>{message}</p>
            </div>
          </section>
        </div>
      </main>

      {showNotification && (
        <div className={`notification ${isHiding ? 'hide' : ''}`}>
          <div className="notification-content">
            Pesan berhasil disalin
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
