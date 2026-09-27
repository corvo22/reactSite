import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import './App.css'

function SpotifyContent() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const response = await fetch('/api/recent-tracks');
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setTracks(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recent tracks:', err);
      }
    };

    fetchRecentTracks();
    // refresh every 5 minutes
    const intervalId = setInterval(fetchRecentTracks, 5 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return(
    <ul>
      {tracks.map((track, index) => (
        <li  key={index}> {track.name} <br/> {track.artist}</li>
      ))}
    </ul>
  )

}

function SectionContent({contentType, sectionId, onContentChange }) {
  const [markdownContent, setMarkdownContent] = useState('');
  var endpoint;

  if(contentType == "section") {
    endpoint = `/api/sections/${sectionId}`
  }
  else {
    endpoint = `/api/projects/${sectionId}`
  }


  // defaults to a GET
  useEffect(() => {
    fetch(endpoint)
      .then(response => response.text())
      .then(markdown => setMarkdownContent(markdown))
      .catch(error => console.error(error))
  }, [endpoint]);

  return (
    <ReactMarkdown
      components={{
        // For react-markdown v6+, this is how you handle code blocks
        code({children}) {
          // Log the entire props to see what's available
          
          // The code content is in the children prop
          const codeContent = String(children).trim();
          
          if(codeContent.startsWith('button')) {
            const [, contentType, content, text] = codeContent.split(':')
          
            return (
              <button className='button round-button' onClick={() => onContentChange({ contentType: contentType, content: content}) }>{text}</button>
            )

          }
        }
      }}
    >
      {markdownContent}
    </ReactMarkdown>
  );
}

function App() {
  const [contentState, setContent] = useState({contentType: "section", content: "about"});
  return (
    <div className="layout-container">
      <div className="left-col">
        <div className="icon">
          <img src="/dnd_char.png" alt="My Current DnD character, an elf paladin"></img>
        </div>
        <div className="spotify">
          <p>Most Recent Spotify Songs:</p>
          <SpotifyContent />
        </div>
      </div>
      <div className="right-col">
        <nav>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "about"}) }>About</button>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "resume"}) }>Resume</button>
          <button className="button" onClick={() => setContent({ contentType: "section", content: "projects"}) }>Projects</button>
          <button className="button" onClick={() => console.log('Go to contact')}>Writing</button>
          <button className="button" onClick={() => location.href='https://github.com/corvo22?tab=repositories'}>Git</button>
        </nav>
        <div className="content-area">
            <div className="display-screen"> 
              <SectionContent contentType={contentState.contentType} sectionId={contentState.content} onContentChange={setContent}/>
            </div>
          <div className="today-info">
            <h2>Events:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1540 – The Society of Jesus (Jesuits) receives its charter from Pope Paul III.</li>
              <li>1422 – After the brief Gollub War, the Teutonic Knights sign the Treaty of Melno with Poland and Lithuania.</li>
              <li>1529 – The Siege of Vienna begins when Suleiman I attacks the city.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1791 – The National Assembly of France votes to award full citizenship to Jews.</li>
              <li>1777 – American Revolution: Lancaster, Pennsylvania becomes the capital of the United States for one day after Congress evacuates Philadelphia.</li>
              <li>1669 – The Venetians surrender the fortress of Candia to the Ottomans, thus ending the 21-year-long Siege of Candia. Crete would remain under Ottoman occupation until 1913.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1908 – Production of the Model T automobile begins at the Ford Piquette Avenue Plant in Detroit.</li>
              <li>1916 – Iyasu V is proclaimed deposed as ruler of Ethiopia in a palace coup in favor of his aunt Zewditu.</li>
              <li>2008 – CNSA astronaut Zhai Zhigang becomes the first Chinese person to perform a spacewalk.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1442 – John de la Pole, 2nd Duke of Suffolk (died 1491)</li>
              <li>1598 – Robert Blake, English admiral (died 1657)</li>
              <li>1544 – Takenaka Shigeharu, Japanese samurai (died 1579)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1818 – Hermann Kolbe, German chemist and academic (died 1884)</li>
              <li>1657 – Sofia Alekseyevna of Russia (died 1704)</li>
              <li>1627 – Jacques-Bénigne Bossuet, French bishop and theologian (died 1704)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1907   – Bhagat Singh, Indian socialist revolutionary (disputed with 28 September) (died 1931)</li>
              <li>1904 – Edvard Kocbek, Slovenian poet and politician (died 1981)</li>
              <li>1966 – Debbie Wasserman Schultz, American politician</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1194 – Renaud de Courtenay, Anglo-Norman nobleman (born 1125)</li>
              <li>1637 – Lorenzo Ruiz, Filipino saint (born c.1600)</li>
              <li>1111 – Vekenega, Croatian Benedictine abbess</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1876 – Braxton Bragg, American general (born 1817)</li>
              <li>1623 – John VII, Count of Nassau-Siegen (born 1561)</li>
              <li>1735 – Peter Artedi, Swedish ichthyologist and zoologist (born 1705)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1991 – Joe Hulme, English footballer and cricketer (born 1904)</li>
              <li>2015   – Kallen Pokkudan, Indian activist and author (born 1937)</li>
              <li>2004 – John E. Mack, American psychiatrist and author (born 1929)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
