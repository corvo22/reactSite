import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, jsonify
from flask_cors import CORS
from pathlib import Path

app = Flask(__name__)
cors = CORS(app, origins='*')

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id='0cf2d781c6ef4c3998906dfef3ee9f8f',
    client_secret='d7f7108b792e45a689a22101acd2ae9e',
    redirect_uri='http://localhost:5000/callback',
    scope='user-read-recently-played'
))

@app.route('/api/recent-tracks')
def get_recent_tracks():
    try:
        # Fetch the 5 most recently played tracks
        recent_tracks = sp.current_user_recently_played(limit=5)
        
        # Format the tracks for the frontend
        formatted_tracks = []
        for item in recent_tracks['items']:
            track = item['track']
            formatted_tracks.append({
                'name': track['name'],
                'artist': track['artists'][0]['name'],
            })
        
        return jsonify(formatted_tracks)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/api/sections/<section>", methods=['GET'])
def sections(section):
    file_path = Path(__file__).parent / f'../portfolio/src/sections/{section}.md'
    file_path = file_path.resolve()
    f = open(file_path)
    return f.read()

@app.route("/api/projects/<project>", methods=['GET'])
def projects(project):
    file_path = Path(__file__).parent / f'../portfolio/src/projects/{project}.md'
    file_path = file_path.resolve()
    f = open(file_path)
    return f.read()

if __name__=="__main__":
    app.run(debug=True, port=8080)