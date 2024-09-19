from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from pydub import AudioSegment
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_audio', methods=['POST'])
def process_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file uploaded'}), 400

    audio_file = request.files['audio']
    
    # Convert audio to WAV format using pydub
    try:
        audio = AudioSegment.from_file(audio_file)  # pydub handles format detection
        wav_io = io.BytesIO()
        audio.export(wav_io, format='wav')
        wav_io.seek(0)
    except Exception as e:
        return jsonify({'error': f'Audio conversion error: {str(e)}'}), 500

    # Initialize the recognizer
    recognizer = sr.Recognizer()

    try:
        # Use the converted WAV audio file with the recognizer
        with sr.AudioFile(wav_io) as source:
            audio_data = recognizer.record(source)
            # Recognize speech using Google's web speech API
            text = recognizer.recognize_google(audio_data)
            return jsonify({'transcription': text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
