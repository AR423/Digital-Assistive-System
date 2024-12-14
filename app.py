from flask import Flask, render_template, request, redirect, url_for, session, flash , jsonify
from main import generate_output, get_audio_url

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    language = request.args.get('language', 'en')
    transcript = request.args.get('transcript', '')
    location = request.args.get('location', '')
    output_message = generate_output(language, transcript, location)
    audio_url = get_audio_url(language, output_message)
    return render_template('output.html', output=output_message, audio_url=audio_url, language=language, transcript=transcript, location=location)

@app.route('/index.html', methods=['GET'])
def home():
    return redirect("/")

if __name__ == '__main__':
    app.run(debug=True)
