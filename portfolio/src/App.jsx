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
              <li>AD 23 – Rebels sack the Chinese capital Chang'an during a peasant rebellion.</li>
              <li>1363 – Battle of Lake Poyang: In one of the largest naval battles in history, Zhu Yuanzhang's rebels defeat rival Chen Youliang.</li>
              <li>1209 – Otto IV is crowned Emperor of the Holy Roman Empire by Pope Innocent III.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1862 – American Civil War: The two-day Second Battle of Corinth ends in a Union victory, with General William Rosecrans protecting the critical rail junction of Corinth, Mississippi from Confederate forces under General Earl Van Dorn.</li>
              <li>1853 – The Crimean War begins when the Ottoman Empire declares war on the Russian Empire.</li>
              <li>1830 – The Belgian Revolution takes legal form when the provisional government secedes from the Netherlands.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1920 – The Mannerheim League for Child Welfare, a Finnish non-governmental organization, is founded on the initiative of Sophie Mannerheim.</li>
              <li>1993 – Battle of Mogadishu occurs killing 18 U.S. Special Forces, two UN Peacekeepers and at least 600 Somalian militia men and civilians.</li>
              <li>1963 – Hurricane Flora kills 6,000 in Cuba and Haiti.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1160 – Alys, Countess of the Vexin, daughter of Louis VII of France (died c. 1220)</li>
              <li>1507 – Francis Bigod, English noble (died 1537)</li>
              <li>1522 – Gabriele Paleotti, Catholic cardinal (died 1597)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1879 – Robert Edwards, American artist, musician, and writer (died 1948)</li>
              <li>1876 – Florence Eliza Allen, American mathematician and suffrage activist (died 1960)</li>
              <li>1841 – Prudente de Morais, Brazilian lawyer and politician, 3rd President of Brazil (died 1912)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1948 – Iain Hewitson, New Zealand-Australian chef, restaurateur, author, and television personality</li>
              <li>1961   – Jon Secada, Cuban-American singer-songwriter</li>
              <li>1980 – Sarah Fisher, American race car driver</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1227 – Caliph al-Adil of Morocco</li>
              <li>1305 – Emperor Kameyama of Japan (born 1249)</li>
              <li>1160 – Constance of Castile, Queen of France (born 1141)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1680 – Pierre-Paul Riquet, French engineer, designed the Canal du Midi (born 1609)</li>
              <li>1749 – Baron Franz von der Trenck, Austrian soldier (born 1711)</li>
              <li>1827 – Grigorios Zalykis, Greek-French lexicographer and scholar (born 1785)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2015   – Neal Walk, American basketball player (born 1948)</li>
              <li>1980 – Pyotr Masherov, First Secretary of the Communist Party of Byelorussia (born 1918)</li>
              <li>2009 – Gerhard Kaufhold, German footballer (born 1928)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
