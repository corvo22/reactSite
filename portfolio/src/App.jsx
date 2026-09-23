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
              <li>1122 – Pope Callixtus II and Holy Roman Emperor Henry V agree to the Concordat of Worms to put an end to the Investiture Controversy.</li>
              <li>1561 – King Philip II of Spain issues cedula, ordering a halt to colonizing efforts in Florida.</li>
              <li>1338 – The Battle of Arnemuiden, in which a French force defeats the English, is the first naval battle of the Hundred Years' War and the first naval battle in which gunpowder artillery is used.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1879 – The Macedo-Romanian Cultural Society is founded.</li>
              <li>1846 – Astronomers Urbain Le Verrier, John Couch Adams and Johann Gottfried Galle collaborate on the discovery of Neptune.</li>
              <li>1884 – On the night of 23–24 September, the steamship Arctique runs aground near Cape Virgenes leading to the discovery of nearby placer gold, beginning the Tierra del Fuego gold rush.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1947 – A magnitude 6.9 earthquake strikes South Khorasan in Iran, killing over 500 people.</li>
              <li>1961 – U.S. President John F. Kennedy nominates African American civil rights lawyer Thurgood Marshall to the Court of Appeals for the Second Circuit, although pro-segregation Southern senators manage to delay his confirmation until September 11, 1962.</li>
              <li>1999 – Qantas Flight 1 overruns a runway in Bangkok during a storm, causing minor injuries to some passengers.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1158 – Geoffrey II, Duke of Brittany (died 1186)</li>
              <li>63 BC – Augustus, Roman emperor (died 14 AD)</li>
              <li>1495 – Bagrat III of Imereti, King of Imereti (died 1565)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1865 – Pekka Halonen, Finnish painter (died 1933)</li>
              <li>1852   – William Stewart Halsted, American physician and surgeon (died 1922)</li>
              <li>1900 – Bill Stone, English soldier (died 2009)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1947   – Neal Smith, American drummer and songwriter</li>
              <li>1970   – Ani DiFranco, American singer-songwriter and guitarist</li>
              <li>1971   – Eric Montross, American basketball player and sportscaster (died 2023)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1390 – John I, Duke of Lorraine (born 1346)</li>
              <li>1535 – Catherine of Saxe-Lauenburg (born 1513)</li>
              <li>1461 – Charles, Prince of Viana, King of Navarre (born 1421)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1789 – John Rogers, American lawyer and politician (born 1723)</li>
              <li>1764 – Robert Dodsley, English poet and playwright (born 1703)</li>
              <li>1728 – Christian Thomasius, German jurist and philosopher (born 1655)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2018   – Jane Fortune, American author, journalist, and philanthropist (born 1942)</li>
              <li>2018 – Charles Kuen Kao, Hong Kong-American-British electrical engineer and physicist (born 1933)</li>
              <li>2012 – Henry Champ, Canadian journalist and academic (born 1937)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
