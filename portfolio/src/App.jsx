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
              <li>1466 – The Thirteen Years' War between Poland and the Teutonic Order ends with the Second Treaty of Thorn.</li>
              <li>1469 – Ferdinand II of Aragon marries Isabella I of Castile, a marriage that paves the way to the unification of Aragon and Castile into a single country, Spain.</li>
              <li>615 – Consecration of Pope Adeodatus I following the imperial approval of his election.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1864   – American Civil War: Confederate agents based in Canada rob three banks in Saint Albans, Vermont.</li>
              <li>1649 – New Ross town in Ireland surrenders to Oliver Cromwell.</li>
              <li>1812 – The French invasion of Russia fails when Napoleon begins his retreat from Moscow.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1936 – New York World-Telegram reporter Herbert Ekins won a race against two other New York newspaper journalists to travel around the world on commercial airline flights. He accomplished the feat in 18 ½ days. His opponents were New York Evening Journal reporter Dorothy Kilgallen, who finished in second place, and New York Times reporter Leo Kieran.</li>
              <li>1950   – Korean War: The Battle of Pyongyang ends in a United Nations victory. Hours later, the Chinese Army begins crossing the border into Korea.</li>
              <li>1986 – The president of Mozambique and a prominent leader of FRELIMO, along with 33 others, die when their aircraft crashes into the Lebombo Mountains.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>879 – Yingtian, empress of the Khitan Liao Dynasty (died 953)</li>
              <li>1276 – Prince Hisaaki of Japan (died 1328)</li>
              <li>1507 – Viglius, Dutch politician (died 1577)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1850 – Annie Smith Peck, American mountaineer and academic (died 1935)</li>
              <li>1789 – Theophilos Kairis, Greek priest and philosopher (died 1853)</li>
              <li>1900 – Erna Berger, German soprano and actress (died 1990)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1980   – Benjamin Salisbury, American actor</li>
              <li>1995 – Sammis Reyes, Chilean-American football and basketball player</li>
              <li>1981 – Leon Bott, Australian rugby league player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1375 – Cansignorio della Scala, Lord of Verona (born 1340)</li>
              <li>1401 – John Charleton, 4th Baron Cherleton (born 1362)</li>
              <li>1216 – John, King of England (born 1166)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1619 – Fujiwara Seika, Japanese philosopher and educator (born 1561)</li>
              <li>1851 – Marie Thérèse of France (born 1778)</li>
              <li>1772 – Andrea Belli, Maltese architect and businessman (born 1703)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2015   – Ali Treki, Libyan politician and diplomat, Libyan Minister of Foreign Affairs (born 1938)</li>
              <li>1965 – Edward Willis Redfield, American painter and educator (born 1869)</li>
              <li>1916 – Ioannis Frangoudis, Greek general and target shooter (born 1863)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
