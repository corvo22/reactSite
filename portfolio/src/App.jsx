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
              <li>1541 – Spanish conquistador Hernando de Soto and his forces enter Tula territory in present-day western Arkansas, encountering fierce resistance.</li>
              <li>737 – The Türgesh drive back an Umayyad invasion of Khuttal, follow them south of the Oxus, and capture their baggage train.</li>
              <li>489 – The Ostrogoths under Theoderic the Great defeat the forces of Odoacer for the second time.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1888 – Jack the Ripper kills his third and fourth victims, Elizabeth Stride and Catherine Eddowes.</li>
              <li>1687 – The Venetians under Girolamo Corner take the city of Herceg Novi from the Ottoman Empire.</li>
              <li>1736 – The Lebanese Council of 1736 begins, a major turning point in the reform of the Maronite Church. In the following three days, the assembled Maronite and Latin clergy presided by Yusuf ibn Siman as-Simani discuss various reforms and elaborate rules and canons.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1949 – The Berlin Airlift ends.</li>
              <li>1966 – Bechuanaland declares its independence, and becomes the Republic of Botswana.</li>
              <li>1968 – The Boeing 747 is rolled out and shown to the public for the first time.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1207 – Rumi, Persian mystic and poet (died 1273)</li>
              <li>1550 – Michael Maestlin, German astronomer and mathematician (died 1631)</li>
              <li>1530 – Girolamo Mercuriale, Italian philologist and physician (died 1606)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1870 – Thomas W. Lamont, American banker and philanthropist (died 1948)</li>
              <li>1852 – Charles Villiers Stanford, Irish composer, conductor, and educator (died 1924)</li>
              <li>1882 – Hans Geiger, German physicist and academic (died 1945)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1919   – Elizabeth Gilels, Ukrainian-Russian violinist and educator (died 2008)</li>
              <li>1953 – Matt Abts, American drummer</li>
              <li>1974   – Daniel Wu, American–born Hong Kong actor, director, and producer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1581 – Hubert Languet, French diplomat and reformer (born 1518)</li>
              <li>1572 – Francis Borgia, 4th Duke of Gandía, Spanish priest and saint, 3rd Superior General of the Society of Jesus (born 1510)</li>
              <li>653 – Honorius of Canterbury, Italian archbishop and saint</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1628 – Fulke Greville, 1st Baron Brooke, English poet and politician, Chancellor of the Exchequer (born 1554)</li>
              <li>1865 – Samuel David Luzzatto, Italian poet and scholar (born 1800)</li>
              <li>1866 – Per Gustaf Svinhufvud af Qvalstad, treasurer of Tavastia province, manor host, and paternal grandfather of President of Finland P. E. Svinhufvud (born 1804)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2019 – Victoria Braithwaite, British research scientist who proved fish feel pain (born 1967)</li>
              <li>2012   – Clara Stanton Jones, American librarian (born 1913)</li>
              <li>1987 – Alfred Bester, American author and screenwriter (born 1913)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
