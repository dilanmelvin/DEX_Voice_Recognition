# 🎤 **Speech Recognition Web App**

A simple yet powerful web application that leverages modern web technologies and Google's Speech Recognition API to convert your spoken words into text. With real-time audio visualization and an intuitive interface, this app is designed for seamless voice-to-text conversion.

## 🌟 **Features**
- **🔊 Real-time Audio Recording**: Capture audio directly from your browser with a simple click.
- **🗣️ Accurate Speech-to-Text**: Uses Google's Speech Recognition API for reliable voice transcription.
- **📊 Dynamic Waveform Visualization**: Visualize audio input in real-time while recording.
- **🎨 User-Friendly UI**: Interactive elements with a sleek design.

## 🛠️ **Technologies Used**
- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Audio Processing**: `speech_recognition`, `pydub`
- **API**: Google Speech Recognition API

## 📂 **Folder Structure**

     project-root/
    static/
        images/
            mic_on.png
            mic_off.png
        css/
            styles.css
        js/
            app.js
    templates/
        index.html
    app.py


## 📥 **Installation Guide**

1. **Clone the Repository**
    ```bash
    git clone https://github.com/dilanmelvin/DEX_Voice_Recognition.git
    ```

2. **Navigate to the Project Directory**
    ```bash
    cd DEX_Voice_Recognition
    ```

3. **Set Up the Environment**
    Ensure Python 3.x is installed and set up a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

4. **Install Dependencies**
    Install the necessary Python packages:
    ```bash
    pip install Flask SpeechRecognition pydub
    ```
    > **Note:** You might need to install `ffmpeg` or `libav` for audio processing with `pydub`.

5. **Run the Application**
    ```bash
    python app.py
    ```
    - Open your browser and visit `http://127.0.0.1:5000/`.

## 🎨 **How to Use**
1. **Start Recording**: Click the microphone button to start recording your voice.
2. **Stop Recording**: Click the button again to stop recoring. The app will process the audio and display the transcribed text.
3. **View Transcription**: The recognized text appears on the screen in real-time.

## 📝 **Code Highlights**
- **Flask Backend**: Handles routing (`app.py`) and processes audio files using the `speech_recognition` library.
- **JavaScript (app.js)**: Manages audio capture, recording controls, and visualizes the waveform in real-time.
- **CSS Styling**: Creates an engaging and intuitive UI with visual feedback during recording.

## 🤝 **Contributing**
We welcome contributions to enhance this project! If you have suggestions, feel free to fork the repository, create a branch, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## 🐞 **Troubleshooting**
- **Microphone Access**: Ensure your browser has permission to access the microphone.
- **Dependencies**: Check that all required Python packages are installed. Use `pip install -r requirements.txt` if a `requirements.txt` is provided.

## 📜 **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 📬 **Contact**
For questions, issues, or feedback, please reach out through LINKEDIN: "https://www.linkedin.com/in/t-dilan-melvin/".

---

Feel free to modify any part of this content to better suit your project's details. You can now create a `README.md` file and paste this content directly into it. This will make your GitHub repository look professional and informative!
