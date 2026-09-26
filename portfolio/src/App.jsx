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
              <li>1345 – Friso-Hollandic Wars: Frisians defeat Holland in the Battle of Warns.</li>
              <li>1087 – William II is crowned King of England, and reigns until 1100.</li>
              <li>715 – Ragenfrid defeats Theudoald at the Battle of Compiègne.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1688 – The city council of Amsterdam votes to support William of Orange's invasion of England, which became the Glorious Revolution.</li>
              <li>1777 – American Revolutionary War: British troops capture and begin the occupation of Philadelphia, which had been serving as the American capital city, during the Philadelphia campaign.</li>
              <li>1810 – A new Act of Succession is adopted by the Riksdag of the Estates, and Jean Baptiste Bernadotte becomes heir to the Swedish throne.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1907 – Four months after the 1907 Imperial Conference, New Zealand and Newfoundland are promoted from colonies to dominions within the British Empire.</li>
              <li>1980 – A terrorist bombing at the Oktoberfest in Munich, Germany, kills 13 people and injures 213 others.</li>
              <li>2022 – A mass shooting occurs at a school in Izhevsk, Udmurtia, Russia, resulting in the deaths of 18 people, including 11 children.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1406 – Thomas de Ros, 8th Baron de Ros, English soldier and politician (died 1430)</li>
              <li>1329 – Anne of Bavaria, German queen consort (died 1353)</li>
              <li>1462 – Engelbert, Count of Nevers, younger son of John I, Duke of Cleves (died 1506)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1870 – Christian X of Denmark (died 1947)</li>
              <li>1792 – William Hobson, Irish-New Zealand explorer and politician, 1st Governor of New Zealand (died 1842)</li>
              <li>1698 – William Cavendish, 3rd Duke of Devonshire (died 1755)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1993 – Rosicleide Andrade, Brazilian Paralympic judoka</li>
              <li>1922 – Takis Miliadis, Greek actor (died 1985)</li>
              <li>1935   – Joe Sherlock, Irish politician (died 2007)</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1241 – Fujiwara no Teika, Japanese poet</li>
              <li>1328 – Ibn Taymiya, Islamic scholar and philosopher of Harran (born 1263)</li>
              <li>1588 – Amias Paulet, Governor of Jersey (born 1532)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1716 – Antoine Parent, French mathematician and theorist (born 1666)</li>
              <li>1802 – Jurij Vega, Slovene mathematician and physicist (born 1754)</li>
              <li>1868 – August Ferdinand Möbius, German mathematician and astronomer (born 1790)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1953 – Xu Beihong, Chinese painter and educator (born 1895)</li>
              <li>2013 – Azizan Abdul Razak, Malaysian politician, 10th Menteri Besar of Kedah (born 1944)</li>
              <li>2002 – Nils Bohlin, Swedish engineer, invented three-point safety belt (born 1920)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
