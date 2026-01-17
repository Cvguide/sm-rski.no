import React, { useState, useEffect } from 'react';

export default function App() {
  const [location, setLocation] = useState({ lat: 59.91, lon: 10.75, name: 'Oslo' });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    fetchWeather(location.lat, location.lon);
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
        {
          headers: {
            'User-Agent': 'SkiWaxApp/1.0'
          }
        }
      );
      const data = await response.json();
      const current = data.properties.timeseries[0];
      setWeather({
        temperature: Math.round(current.data.instant.details.air_temperature),
        precipitation: current.data.next_1_hours?.details?.precipitation_amount || 0,
        windSpeed: Math.round(current.data.instant.details.wind_speed),
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getWaxRecommendation = () => {
    if (!weather) return null;
    const temp = weather.temperature;

    if (temp > 0) {
      return {
        condition: 'Våte forhold / Smelting',
        products: ['CH7X (Rød)', 'CH8X (Gul)', 'FC8X (Gul fluor)'],
        tip: 'Bruk varmt voks. Smelteforhold krever spesielle løsninger.',
        color: '#eab308'
      };
    } else if (temp >= -5) {
      return {
        condition: 'Fuktig snø',
        products: ['VR55 (Lilla)', 'VR45 (Blå)'],
        tip: 'Gode forhold for langrenn. Perfekt for klassisk stil.',
        color: '#a855f7'
      };
    } else if (temp >= -12) {
      return {
        condition: 'Tørr snø',
        products: ['VR40 (Blå)', 'VR35 (Turkis)'],
        tip: 'Utmerkede forhold! Typisk norsk vintervær.',
        color: '#3b82f6'
      };
    } else {
      return {
        condition: 'Veldig kaldt',
        products: ['VR30 (Grønn)', 'VR25 (Lys grønn)', 'FC78S (Polar fluor)'],
        tip: 'Ekstremt kalde forhold. Bruk spesialvoks.',
        color: '#22c55e'
      };
    }
  };

  const recommendation = getWaxRecommendation();

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #94a3b8, #64748b, #475569)',
      position: 'relative',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(to right, #475569, #334155)',
      color: 'white',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 50
    },
    headerInner: {
      maxWidth: '1024px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      margin: 0
    },
    subtitle: {
      fontSize: '14px',
      color: '#cbd5e1',
      margin: 0
    },
    content: {
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '24px',
      paddingBottom: '96px',
      position: 'relative',
      zIndex: 10
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      border: '2px solid #e2e8f0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '16px'
    },
    locationHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    locationName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1f2937'
    },
    weatherGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    weatherBox: {
      background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid #93c5fd'
    },
    weatherLabel: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#1e3a8a',
      marginBottom: '8px'
    },
    weatherValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1e3a8a'
    },
    weatherSub: {
      fontSize: '12px',
      color: '#1e40af',
      marginTop: '4px'
    },
    recTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#1f2937'
    },
    recBox: {
      padding: '16px',
      borderRadius: '12px',
      marginBottom: '16px',
      color: 'white'
    },
    recCondition: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    recTip: {
      fontSize: '14px',
      opacity: 0.9
    },
    productList: {
      marginTop: '16px'
    },
    productTitle: {
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px'
    },
    product: {
      background: '#f8fafc',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    },
    infoBox: {
      marginTop: '16px',
      padding: '16px',
      background: '#dbeafe',
      borderRadius: '8px',
      border: '1px solid #93c5fd'
    },
    infoText: {
      fontSize: '14px',
      color: '#1e3a8a',
      margin: 0
    },
    loading: {
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      border: '2px solid #e2e8f0',
      textAlign: 'center'
    },
    spinner: {
      display: 'inline-block',
      width: '32px',
      height: '32px',
      border: '3px solid #e2e8f0',
      borderTopColor: '#2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    footer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(to right, #475569, #334155)',
      borderTop: '2px solid #64748b',
      boxShadow: '0 -4px 6px rgba(0,0,0,0.1)',
      zIndex: 20
    },
    footerInner: {
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '12px 16px',
      display: 'flex',
      gap: '8px'
    },
    button: {
      flex: 1,
      background: currentPage === 'home' ? 'white' : 'rgba(255,255,255,0.2)',
      color: currentPage === 'home' ? '#334155' : 'white',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.header}>
          <div style={styles.headerInner}>
            <div>
              <h1 style={styles.title}>⛷️ Smøreguide</h1>
              <p style={styles.subtitle}>Din skismøringsassistent</p>
            </div>
          </div>
        </div>
        <div style={styles.content}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p style={{ marginTop: '16px', fontSize: '18px', color: '#4b5563' }}>Henter værdata...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <h1 style={styles.title}>⛷️ Smøreguide</h1>
            <p style={styles.subtitle}>Din skismøringsassistent</p>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.card}>
          <div style={styles.locationHeader}>
            <div>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>📍</span>
              <span style={styles.locationName}> {location.name}</span>
            </div>
          </div>

          <div style={styles.weatherGrid}>
            <div style={styles.weatherBox}>
              <div style={styles.weatherLabel}>🌡️ Temperatur</div>
              <div style={styles.weatherValue}>{weather.temperature}°C</div>
              <div style={styles.weatherSub}>Nedbør: {weather.precipitation} mm</div>
            </div>

            <div style={styles.weatherBox}>
              <div style={styles.weatherLabel}>💨 Vind</div>
              <div style={styles.weatherValue}>{weather.windSpeed} m/s</div>
            </div>
          </div>
        </div>

        {recommendation && (
          <div style={styles.card}>
            <h2 style={styles.recTitle}>Smøringsanbefaling</h2>
            
            <div style={{ ...styles.recBox, background: recommendation.color }}>
              <div style={styles.recCondition}>{recommendation.condition}</div>
              <div style={styles.recTip}>{recommendation.tip}</div>
            </div>

            <div style={styles.productList}>
              <h3 style={styles.productTitle}>Anbefalte produkter (Swix):</h3>
              {recommendation.products.map((product, index) => (
                <div key={index} style={styles.product}>
                  {product}
                </div>
              ))}
            </div>

            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>💡 Tips:</strong> Test alltid smøringen på en liten del av skiene først. 
                Værforholdene kan variere lokalt.
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <div style={styles.footerInner}>
          <button style={styles.button}>
            🎿 Smøring
          </button>
          <button style={{ ...styles.button, background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            🏔️ Løyper
          </button>
        </div>
      </div>
    </div>
  );
}
