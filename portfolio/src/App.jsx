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
              <li>1519 – Ferdinand Magellan sets sail from Sanlúcar de Barrameda with about 270 men on his expedition which ultimately culminates in the first circumnavigation of the globe.</li>
              <li>1066 – At the Battle of Fulford, Harald Hardrada defeats earls Morcar and Edwin.</li>
              <li>1586 – A number of conspirators in the Babington Plot are hanged, drawn and quartered.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1870 – The Bersaglieri corps enter Rome through the Porta Pia, and complete the unification of Italy.</li>
              <li>1860 – The future King Edward VII of the United Kingdom begins the first visit to North America by a Prince of Wales.</li>
              <li>1863 – American Civil War: The Battle of Chickamauga, in northwestern Georgia, ends in a Confederate victory.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2000 – The United Kingdom's MI6 Secret Intelligence Service building is attacked by individuals using a Russian-built RPG-22 anti-tank missile.</li>
              <li>1954 – The Moomin comics, created by Tove Jansson and Lars Jansson, is published internationally in the London newspaper The Evening News.</li>
              <li>2011 – The United States military ends its "don't ask, don't tell" policy, allowing gay men and women to serve openly for the first time.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1504 – Philip III, Count of Nassau-Weilburg (died 1559)</li>
              <li>1449 – Philipp I, Count of Hanau-Münzenberg (died 1500)</li>
              <li>1593 – Gottfried Scheidt, German organist and composer (died 1661)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1895 – Walter Dubislav, German logician and philosopher of science (died 1937)</li>
              <li>1819 – Frederick Ellsworth Sickels, American inventor (died 1895)</li>
              <li>1851 – Henry Arthur Jones, English playwright and critic (died 1929)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1928 – Alberto de Lacerda, Mozambican-Portuguese poet and radio host (died 2007)</li>
              <li>1973   – Jo Pavey, English runner</li>
              <li>1983   – Ángel Sánchez, Puerto Rican baseball player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1533 – Veit Stoss, German sculptor (born c. 1447)</li>
              <li>1440 – Frederick I, Elector of Brandenburg (born 1371)</li>
              <li>1460 – Gilles Binchois, Flemish composer (born 1400)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1815 – Nicolas Desmarest, French geologist and scholar (born 1725)</li>
              <li>1639 – Johannes Meursius, Dutch historian and scholar (born 1579)</li>
              <li>1839 – Sir Thomas Hardy, 1st Baronet, English admiral (born 1769)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1971 – Giorgos Seferis, Greek poet and diplomat, Nobel Prize laureate (born 1900)</li>
              <li>1979 – Ludvík Svoboda, Czech general and politician, 8th President of Czechoslovakia (born 1895)</li>
              <li>1999 – Robert Lebel, Canadian businessman (born 1905)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
