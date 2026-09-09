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
              <li>1588 – Thomas Cavendish in his ship Desire enters Plymouth and completes the first deliberately planned voyage of circumnavigation.</li>
              <li>1000 – Battle of Svolder during the Viking Age.</li>
              <li>1320 – In the Battle of Saint George, the Byzantines under Andronikos Asen ambush and defeat the forces of the Principality of Achaea, securing possession of Arcadia.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1845 – Possible start of the Great Famine of Ireland.</li>
              <li>1796 – Grenelle camp affair, a failed uprising by supporters of Gracchus Babeuf against the French Directory</li>
              <li>1892 – Amalthea becomes the last moon to be discovered without the use of photography.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1944 – World War II: The Fatherland Front takes power in Bulgaria through a military coup in the capital and armed rebellion in the country. A new pro-Soviet government is established.</li>
              <li>2015 – Elizabeth II becomes the longest reigning monarch of the United Kingdom.</li>
              <li>1947 – First case of a computer bug being found: A moth lodges in a relay of a Harvard Mark II computer at Harvard University.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1349 – Albert III, Duke of Austria (died 1395)</li>
              <li>1466 – Ashikaga Yoshitane, Japanese shōgun (died 1523)</li>
              <li>384 – Honorius, Roman emperor (died 423)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1899   – Bruno E. Jacob, American academic, founded the National Forensic League (died 1979)</li>
              <li>1754 – William Bligh, English admiral and politician, 4th Governor of New South Wales (died 1817)</li>
              <li>1894   – Humphrey Mitchell, Canadian trade union leader and politician, 14th Canadian Minister of Labour (died 1950)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1959 – Tom Foley, American baseball player and coach</li>
              <li>1903   – Phyllis A. Whitney, American author (died 2008)</li>
              <li>1990   – Jordan Tabor, English footballer (died 2014)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1596 – Anna Jagiellon, Polish queen (born 1523)</li>
              <li>1031 – Kang Kam-ch'an, Korean general (born 948)</li>
              <li>1513 – Notable Scottish casualties of the Battle of Flodden</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1841 – Augustin Pyramus de Candolle, Swiss botanist, mycologist, and academic (born 1778)</li>
              <li>1815 – John Singleton Copley, American-English colonial and painter (born 1738)</li>
              <li>1898 – Stéphane Mallarmé, French poet and critic (born 1842)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1950 – Victor Hémery, French racing driver (born 1876)</li>
              <li>1969 – Willy Mairesse, Belgian racing driver (born 1928)</li>
              <li>1986 – Magda Tagliaferro, Brazilian pianist and educator (born 1893)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
