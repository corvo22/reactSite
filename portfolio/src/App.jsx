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
              <li>1448 – The second Battle of Kosovo begins between Hungarian forces under John Hunyadi and Ottoman forces under Murad II.</li>
              <li>690 – Empress Wu Zetian establishes the Zhou Dynasty of China.</li>
              <li>1091 – London tornado of 1091: A tornado thought to be of strength T8/F4 strikes the heart of London.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1861 – Aboriginal Australians kill nineteen Europeans in the Cullin-la-ringo massacre.</li>
              <li>1806 – Former leader of the Haitian Revolution, Emperor Jacques I, is assassinated after an oppressive rule.</li>
              <li>1800 – War of the Second Coalition: Britain takes control of the Dutch colony of Curaçao.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1989   – The East German Politburo votes to remove Erich Honecker from his role as General Secretary.</li>
              <li>1912 – Bulgaria, Greece and Serbia declare war on the Ottoman Empire, joining Montenegro in the First Balkan War.</li>
              <li>1966 – The 23rd Street Fire in New York City kills 12 firefighters.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>503 – Lý Nam Đế, first emperor of Vietnam (died 548)</li>
              <li>1538 – Irene di Spilimbergo, Italian Renaissance poet and painter (died 1559)</li>
              <li>1500 – Alonso de Orozco Mena, Spanish Roman Catholic priest (died 1591)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1828 – Aureliano Maestre de San Juan, Spanish scientist (died 1890)</li>
              <li>1817 – Syed Ahmad Khan, Indian philosopher and scholar (died 1898)</li>
              <li>1867 – Josep Puig i Cadafalch, Catalan architect who designed the Casa Martí (died 1956)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1984   – Giovanni Marchese, Italian footballer</li>
              <li>1961 – David Means, American short story writer</li>
              <li>1970   – J. C. MacKenzie, Canadian actor</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1485 – John Scott of Scott's Hall, Warden of the Cinque Ports</li>
              <li>532 – Pope Boniface II</li>
              <li>1575 – Gaspar Cervantes de Gaeta, Spanish cardinal (born 1511)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1616 – John Pitts, English priest and scholar (born 1560)</li>
              <li>1868 – Laura Secord, Canadian war heroine (born 1775)</li>
              <li>1780 – William Cookworthy, English pharmacist and minister (born 1705)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2014 – Edwards Barham, American farmer and politician (born 1937)</li>
              <li>1979 – S. J. Perelman, American humorist and screenwriter (born 1904)</li>
              <li>1997 – Larry Jennings, American magician and author (born 1933)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
