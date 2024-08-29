import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(
    "Mutlu olmak için bir neden yazısı burada görünecek."
  );
  const [loading, setLoading] = useState(false);

  // İstek yapma fonksiyonu
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/quote");
      setQuote(response.data.reason);
    } catch (error) {
      console.error("API isteği başarısız:", error);
      if (error.response && error.response.status === 429) {
        setQuote("Kota aşımına uğradık. Lütfen daha sonra tekrar deneyin.");
      } else {
        setQuote("Bir şeyler yanlış gitti. Lütfen tekrar deneyin.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // İlk istek
    fetchQuote();

    // Her 10 saniyede bir fetchQuote fonksiyonunu çağıran interval
    const intervalId = setInterval(fetchQuote, 10000); // 10000 ms = 10 saniye

    // Component unmount olduğunda interval'ı temizleyin
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mutlu Olmak İçin Bir Neden</h1>
        <p>{quote}</p>
        <button onClick={fetchQuote} disabled={loading}>
          {loading ? "Yükleniyor..." : "Yeni Bir Neden Üret"}
        </button>
      </header>
    </div>
  );
}

export default App;
