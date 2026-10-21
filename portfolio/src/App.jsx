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
              <li>1600 – Tokugawa Ieyasu defeats the leaders of rival Japanese clans in the Battle of Sekigahara and becomes shōgun of Japan.</li>
              <li>1187 – Election of Gregory VIII following the death of Pope Urban III.</li>
              <li>1512 – Martin Luther joins the theological faculty of the University of Wittenberg.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1895 – The capitulation of Tainan completes the Japanese conquest of Taiwan.</li>
              <li>1861 – American Civil War: Union forces under Colonel Edward Baker are defeated by Confederate troops in the second major battle of the war.</li>
              <li>1824 – Portland cement is patented.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1944   – World War II: The Nemmersdorf massacre against German civilians takes place.</li>
              <li>1966 – A colliery spoil tip slips onto houses and a school in the village of Aberfan in Wales, killing 144 people, 116 of whom were schoolchildren.</li>
              <li>1981 – Andreas Papandreou becomes Prime Minister of Greece, ending an almost 50-year-long system of power dominated by conservative forces.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1409 – Alessandro Sforza, Italian condottiero (died 1473)</li>
              <li>1527 – Louis I, Cardinal of Guise (died 1578)</li>
              <li>1449 – George Plantagenet, 1st Duke of Clarence, Irish-English son of Cecily Neville, Duchess of York (died 1478)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1896 – Esther Shumiatcher-Hirschbein, Russian-Canadian poet and screenwriter (died 1985)</li>
              <li>1868 – Ernest Swinton, British Army officer (died 1951)</li>
              <li>1675 – Emperor Higashiyama of Japan (died 1710)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1924   – Julie Wilson, American actress and singer (died 2015)</li>
              <li>1931 – Shammi Kapoor, Indian actor and director (died 2011)</li>
              <li>1972   – Evhen Tsybulenko, Ukrainian scholar and academic</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1556 – Pietro Aretino, Italian author (born 1492)</li>
              <li>1266 – Birger Jarl, Swedish politician (born 1210)</li>
              <li>1500 – Emperor Go-Tsuchimikado of Japan (born 1442)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1777 – Samuel Foote, English actor and playwright (born 1720)</li>
              <li>1623 – William Wade, English politician and diplomat, Lieutenant of the Tower of London (born 1546)</li>
              <li>1861 – Edward Dickinson Baker, American congressman and colonel (born 1811)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1991 – Lorenc Antoni, Albanian composer, conductor, and musicologist (born 1909)</li>
              <li>2012   – Alf Kumalo, South African photographer and journalist (born 1930)</li>
              <li>1969 – Jack Kerouac, American novelist and poet (born 1922)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
