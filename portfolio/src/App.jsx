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
              <li>1565 – St. Augustine, Florida is founded by Spanish admiral and Florida's first governor, Pedro Menéndez de Avilés.</li>
              <li>1100 – Election of Antipope Theodoric.</li>
              <li>1253 – Pope Innocent IV canonises Stanislaus of Szczepanów, who was killed by King Bolesław II.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1860 – The steamship PS Lady Elgin sinks on Lake Michigan, with the loss of around 300 lives.</li>
              <li>1808 – The Treaty of Paris is signed ending the French military occupation of Prussia.</li>
              <li>1831   – November uprising: The Battle of Warsaw effectively ends the Polish insurrection.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1944 – World War II: London is hit by a V-2 rocket for the first time.</li>
              <li>1989 – Partnair Flight 394 dives into the North Sea, killing 55 people. The investigation showed that the tail of the plane vibrated loose in flight due to sub-standard connecting bolts that had been fraudulently sold as aircraft-grade.</li>
              <li>1923 – Honda Point disaster: Nine US Navy destroyers run aground off the California coast. Seven are lost, and twenty-three sailors killed.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1413 – Catherine of Bologna, Italian nun and saint (died 1463)</li>
              <li>1588 – Marin Mersenne, French mathematician, philosopher, and theologian (died 1648)</li>
              <li>801 – Ansgar, German archbishop and saint (died 865)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1852 – Gojong of Korea, 26th Emperor of the Joseon Kingdom and first emperor of Korea (died 1919)</li>
              <li>1830 – Frédéric Mistral, French poet and lexicographer, Nobel Prize laureate (died 1914)</li>
              <li>1841 – Antonín Dvořák, Czech composer and academic (died 1904)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1989 – Gylfi Sigurðsson, Icelandic footballer</li>
              <li>1938   – Kenichi Horie, Japanese sailor</li>
              <li>1994   – Paula Nicart, Spanish former footballer</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>780 – Leo IV the Khazar, Byzantine emperor (born 750)</li>
              <li>1555 – Saint Thomas of Villanueva, Spanish bishop and saint (born 1488)</li>
              <li>1425 – Charles III of Navarre (born 1361)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1853 – Frédéric Ozanam, French scholar, co-founded the Society of Saint Vincent de Paul (born 1813)</li>
              <li>1784 – Ann Lee, English-American religious leader (born 1736)</li>
              <li>1811 – Peter Simon Pallas, German zoologist and botanist (born 1741)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1984 – Johnnie Parsons, American race car driver (born 1918)</li>
              <li>1949 – Richard Strauss, German composer and manager (born 1864)</li>
              <li>1916 – Friedrich Baumfelder, German pianist, composer, and conductor (born 1836)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
