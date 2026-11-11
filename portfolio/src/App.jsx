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
              <li>1500 – Treaty of Granada: Louis XII of France and Ferdinand II of Aragon agree to divide the Kingdom of Naples between them.</li>
              <li>308 – At Carnuntum, Emperor emeritus Diocletian confers with Galerius, Augustus of the East, and Maximianus, the recently returned former Augustus of the West, in an attempt to end the civil wars of the Tetrarchy.</li>
              <li>1100 – Henry I of England marries Matilda of Scotland, the daughter of Malcolm III of Scotland and a direct descendant of the Saxon king Edmund Ironside; Matilda is crowned on the same day.</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1805 – Napoleonic Wars: Battle of Dürenstein: Eight thousand French troops attempt to slow the retreat of a vastly superior Russian and Austrian force.</li>
              <li>1673 – Second Battle of Khotyn in Ukraine: Polish–Lithuanian Commonwealth forces under the command of Jan Sobieski defeat the Ottoman army. In this battle, rockets made by Kazimierz Siemienowicz are successfully used.</li>
              <li>1778 – Cherry Valley massacre: Loyalists and Seneca Indian forces attack a fort and village in eastern New York during the American Revolutionary War, killing more than forty civilians and soldiers.</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1968 – Vietnam War: Operation Commando Hunt initiated. The goal is to interdict men and supplies on the Ho Chi Minh trail, through Laos into South Vietnam.</li>
              <li>2004 – New Zealand Tomb of the Unknown Warrior is dedicated at the National War Memorial, Wellington.</li>
              <li>2000 – Kaprun disaster: One hundred fifty-five skiers and snowboarders die when a cable car catches fire in an alpine tunnel in Kaprun, Austria.</li>
            </ul>
            <hr></hr>
            <h2>Births:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>1569 – Martin Ruland the Younger, German physician and chemist (died 1611)</li>
              <li>1512 – Marcin Kromer, Prince-Bishop of Warmia (died 1589)</li>
              <li>1491 – Martin Bucer, German Protestant reformer (died 1551)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1875 – Anscar Vonier, German Benedictine abbot in England (died 1938)</li>
              <li>1864 – Alfred Hermann Fried, Austrian journalist and activist, Nobel Prize laureate (died 1921)</li>
              <li>1836 – Thomas Bailey Aldrich, American poet and author (died 1907)</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1969 – Carson Kressley, American fashion designer, television personality, and actor</li>
              <li>1974   – Wajahatullah Wasti, Pakistani cricketer</li>
              <li>1986   – François Trinh-Duc, French rugby player</li>
            </ul>
            <hr></hr>
            <h2>Deaths:</h2>
            <hr></hr>
            <h3>Pre-1600</h3>
            <ul>
              <li>875 – Teutberga, queen of Lotharingia</li>
              <li>1189 – King William II of Sicily ("the Good") (born 1153)</li>
              <li>1028 – Constantine VIII, Byzantine emperor (born 960)</li>
            </ul>
            <h3>Early Modern</h3>
            <ul>
              <li>1855 – Søren Kierkegaard, Danish philosopher, author, and poet (born 1813)</li>
              <li>1861 – Pedro V of Portugal (born 1837)</li>
              <li>1887 – Haymarket affair defendants:</li>
            </ul>
            <h3>Modern</h3>
            <ul>
              <li>1988   – William Ifor Jones, Welsh conductor and organist (born 1900)</li>
              <li>2008   – Mustafa Şekip Birgöl, Turkish colonel (born 1903)</li>
              <li>2021 – F. W. de Klerk, South African lawyer and politician, former State President of South Africa, Nobel Prize laureate (born 1936)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
