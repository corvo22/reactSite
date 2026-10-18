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
              <li>1081 – The Normans defeat the Byzantine Empire in the Battle of Dyrrhachium.</li>
              <li>1166 – Michael the Syrian, one of the most important Syriac historians, is consecrated as Syriac Orthodox Patriarch at the Mor Bar Sauma Monastery.</li>
              <li>1599 – Michael the Brave, Prince of Wallachia, defeats the Army of Andrew Báthory in the Battle of Șelimbăr, leading to the first recorded unification of the Romanian people.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1887 – Johannes Brahms conducts the premiere of his Double Concerto, composed for violinist Joseph Joachim and cellist Robert Hausmann.</li>
              <li>1748 – Signing of the Treaty of Aix-la-Chapelle ends the War of the Austrian Succession.</li>
              <li>1775 – African-American poet Phillis Wheatley is freed from slavery.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1977 – German Autumn: A set of events revolving around the kidnapping of Hanns Martin Schleyer and the hijacking of a Lufthansa flight by the Red Army Faction (RAF) comes to an end when Schleyer is murdered and various RAF members allegedly commit suicide.</li>
              <li>1914 – The Schoenstatt Apostolic Movement is founded in Germany.</li>
              <li>1945   – A group of the Venezuelan Armed Forces, led by Mario Vargas, Marcos Pérez Jiménez and Carlos Delgado Chalbaud, stages a coup d'état against president Isaías Medina Angarita, who is overthrown by the end of the day.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1547 – Justus Lipsius, Belgian philologist and scholar (died 1606)</li>
              <li>1127 – Emperor Go-Shirakawa of Japan (died 1192)</li>
              <li>1482 – Philipp III, Count of Hanau-Lichtenberg (died 1538)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1770 – Thomas Phillips, English artist (died 1845)</li>
              <li>1878 – James Truslow Adams, American historian and author (died 1949)</li>
              <li>1894   – Tibor Déry, Hungarian author and translator (died 1977)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1981   – Greg Warren, American football player</li>
              <li>1955   – Rita Verdonk, Dutch journalist and politician, Dutch Minister of Justice</li>
              <li>1994 – Enhō Akira, Japanese sumo wrestler</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>325 – Emperor Ming of Jin (born 299)</li>
              <li>815 – Abu'l-Saraya, Zaydi rebel leader</li>
              <li>1081 – Nikephoros Palaiologos, Byzantine general</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1893 – Charles Gounod, French composer and educator (born 1818)</li>
              <li>1744 – Sarah Churchill, Duchess of Marlborough (born 1660)</li>
              <li>1667 – Fasilides, Ethiopian emperor (born 1603)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>2022 – Harvey Wollman, American politician, 26th Governor of South Dakota (born 1935)</li>
              <li>2012 – Brain Damage, American wrestler (born 1977)</li>
              <li>1973 – Margaret Caroline Anderson, American publisher, founded The Little Review (born 1886)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
