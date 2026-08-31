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
              <li>1422 – King Henry V of England dies of dysentery while in France and his son, Henry VI, becomes king at the age of nine months.</li>
              <li>1483 – Under the influence of the Ottoman government, patriarch Symeon I convenes a synod of the Eastern Orthodox Churches in Constantinople which defines the ritual for admitting Catholics to the Eastern Orthodox Churches and condemns the church union of Ferrara-Florence.</li>
              <li>1056 – After a sudden gastric illness, Byzantine Empress Theodora dies childless, thus ending the Macedonian dynasty.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1895 – German Count Ferdinand von Zeppelin patents his navigable balloon.</li>
              <li>1864 – American Civil War: The Battle of Jonesborough, the culmination of the Atlanta campaign, begins as Union forces under General William T. Sherman clash with Confederate troops under General William J. Hardee south of Atlanta.</li>
              <li>1888 – Mary Ann Nichols, the first of Jack the Ripper's confirmed victims, is murdered.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1943 – USS Harmon, the first U.S. Navy ship to be named after a black person, is commissioned.</li>
              <li>2005 – The 2005 Al-Aaimmah bridge stampede in Baghdad kills 953 people.</li>
              <li>2024 – A helicopter crashes in Kamchatka Krai in the Russian Far East, killing all 22 occupants.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>12 – Caligula, Roman emperor (died 41)</li>
              <li>161 – Commodus, Roman emperor (died 192)</li>
              <li>1168 – Zhang Zong, Chinese emperor (died 1208)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1885 – DuBose Heyward, American author and playwright (died 1940)</li>
              <li>1797 – Ramón Castilla, Peruvian military leader and politician, President of Peru (died 1867)</li>
              <li>1797   – Stephen Geary, English architect, inventor and entrepreneur (died 1854)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1981   – Dwayne Peel, Welsh rugby player</li>
              <li>1925 – Ted Blakey, American historian, activist, and businessman (died 2004)</li>
              <li>1969   – Jeff Russo, American musician</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1422 – Henry V of England (born 1386)</li>
              <li>1324 – Henry II of Jerusalem (born 1271)</li>
              <li>1502 – Thomas Wode, Lord Chief Justice of the Common Pleas</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1818 – Robert Calder, Scottish admiral (born 1745)</li>
              <li>1654 – Ole Worm, Danish physician and historian (born 1588)</li>
              <li>1799 – Nicolas-Henri Jardin, French architect and academic, designed the Bernstorff Palace and Marienlyst Castle (born 1720)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2002 – Lionel Hampton, American pianist, composer, and bandleader (born 1908)</li>
              <li>1948 – Andrei Zhdanov, Russian civil servant and politician (born 1896)</li>
              <li>2008   – Ike Pappas, American journalist (born 1933)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
