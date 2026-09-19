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
              <li>634 – Siege of Damascus: The Rashidun Arabs under Khalid ibn al-Walid capture Damascus from the Byzantine Empire.</li>
              <li>1356 – Battle of Poitiers: An English army under the command of Edward the Black Prince defeats a French army and captures King John II.</li>
              <li>1410 – End of the Siege of Marienburg: The State of the Teutonic Order repulses the joint Polish—Lithuanian forces.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1893 – In New Zealand, the Electoral Act of 1893 is consented to by the governor, giving all women in New Zealand the right to vote.</li>
              <li>1870 – Franco-Prussian War: The siege of Paris begins. The city held out for over four months before surrendering.</li>
              <li>1863 – American Civil War: The first day of the Battle of Chickamauga, in northwestern Georgia, the bloodiest two-day battle of the conflict, and the only significant Confederate victory in the war's Western Theater.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1950 – Korean War: An attack by North Korean forces was repelled at the Battle of Nam River.</li>
              <li>1970 – Michael Eavis hosts the first Glastonbury Festival.</li>
              <li>1976   – Two Imperial Iranian Air Force F-4 Phantom II jets fly out to investigate an unidentified flying object.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1377 – Albert IV, Duke of Austria (died 1404)[citation needed]</li>
              <li>931 – Mu Zong, emperor of the Liao Dynasty (died 969)</li>
              <li>1477 – Ferrante d'Este, Ferrarese nobleman and condottiero (died 1540)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1867 – Arthur Rackham, English illustrator (died 1939)</li>
              <li>1882 – Christopher Stone, English radio host (died 1965)</li>
              <li>1898 – Giuseppe Saragat, Italian lawyer and politician, 5th President of Italy (died 1988)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1949   – Barry Scheck, American lawyer, co-founded the Innocence Project</li>
              <li>1936 – Martin Fay, Irish fiddler (died 2012)</li>
              <li>1996   – Chris Silva, Gabonese basketball player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1589 – Jean-Antoine de Baïf, French poet (born 1532)</li>
              <li>643 – Goeric of Metz, Frankish bishop and saint</li>
              <li>1339 – Emperor Go-Daigo of Japan (born 1288)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1843 – Gaspard-Gustave de Coriolis, French mathematician,  physicist, and engineer (born 1792)</li>
              <li>1692 – Giles Corey, American farmer and accused wizard (born c. 1612)</li>
              <li>1881 – James A. Garfield, American general, lawyer, and politician, and the 20th President of the United States (born 1831)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2017 – Leonid Kharitonov, Russian bass-baritone (born 1933)</li>
              <li>2009 – Milton Meltzer, American historian and author (born 1915)</li>
              <li>1975 – Pamela Brown, English actress (born 1917)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
