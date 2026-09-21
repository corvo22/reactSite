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
              <li>454 – Western Roman Emperor Valentinian III murders his general Flavius Aetius on instigation of eunuch Heraclius and senator Petronius Maximus.</li>
              <li>1435 – The Treaty of Arras is promulgated, causing Burgundy to switch sides in the Hundred Years' War.</li>
              <li>455 – Emperor Avitus enters Italy with a Gallic army and consolidates his power.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1896 – Anglo-Egyptian conquest of Sudan: British forces under the command of Horatio Kitchener take Dongola.</li>
              <li>1780 – American Revolutionary War: Benedict Arnold gives the British the plans to West Point.</li>
              <li>1860 – Second Opium War: An Anglo-French force defeats Chinese troops at the Battle of Palikao.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1938 – The Great Hurricane of 1938 makes landfall on Long Island in New York. The death toll is estimated at 500–700 people.</li>
              <li>1977 – Malév Flight 203 crashes near Urziceni, killing 29 people.</li>
              <li>1972 – Philippine president Ferdinand Marcos begins authoritarian rule by declaring martial law.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1411 – Richard of York, 3rd Duke of York, English politician, Lord Protector of England (died 1460)</li>
              <li>1559 – Cigoli, Italian painter and architect (died 1613)</li>
              <li>580 – Pope Vitalian (died 672)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1866   – H. G. Wells, English novelist, historian, and critic (died 1946)</li>
              <li>1893 – Erna Scheffler, German lawyer and justice of the Federal Constitutional Court (died 1983)</li>
              <li>1878 – Peter McWilliam, Scottish-English footballer and manager (died 1951)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1902 – Luis Cernuda, Spanish poet and critic (died 1963)</li>
              <li>1947   – Rupert Hine, English musician, songwriter, and record producer (died 2020)</li>
              <li>1972   – Liam Gallagher, English singer-songwriter</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1397 – Richard FitzAlan, 11th Earl of Arundel, English admiral (born 1346)</li>
              <li>1026 – Otto-William, Count of Burgundy</li>
              <li>1586 – Antoine Perrenot de Granvelle, French cardinal and diplomat (born 1517)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1812 – Emanuel Schikaneder, German actor and playwright (born 1751)</li>
              <li>1748 – John Balguy, English philosopher and author (born 1686)</li>
              <li>1643 – Emperor Hong Taiji of China (born 1592)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1982 – Ivan Bagramyan, Russian general (born 1897)</li>
              <li>1983   – Xavier Zubiri, Basque philosopher (born 1898)</li>
              <li>2006 – Tasos Athanasiadis, Greek author (born 1913)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
