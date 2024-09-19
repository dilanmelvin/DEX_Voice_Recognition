const micButton = document.getElementById('mic-button');
const micIcon = document.getElementById('mic-icon');
const micOffUrl = micButton.getAttribute('data-mic-off');
const micOnUrl = micButton.getAttribute('data-mic-on');
const waveform = document.getElementById('waveform');
const transcriptionText = document.getElementById('transcription-text');
let isRecording = false;
let audioContext;
let analyser;
let dataArray;
let canvas, canvasContext;
let mediaRecorder, source, audioChunks = [];

// Initially hide the waveform
waveform.style.display = 'none';

micButton.addEventListener('click', () => {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
});

function startRecording() {
    isRecording = true;
    micButton.classList.add('active');  // Activate glow effect
    micIcon.src = micOnUrl; // Switch to mic on image
    transcriptionText.innerText = 'Listening...';

    // Show the waveform container
    waveform.style.display = 'block';

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        // Initialize audio context for visualizing frequency
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        dataArray = new Uint8Array(analyser.frequencyBinCount);

        // Initialize the media recorder for capturing audio
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        
        // Listen for data chunks
        mediaRecorder.ondataavailable = function(event) {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = function() {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.wav');

            fetch('/process_audio', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                  if (data.transcription) {
                      transcriptionText.innerText = `TEXT: ${data.transcription}`;
                  } else {
                      transcriptionText.innerText = 'Audio not recognised';
                  }
              }).catch(error => {
                  transcriptionText.innerText = `Error: ${error.message}`;
              });
        };

        // Visualize the waveform in real-time
        visualize();
    }).catch(error => {
        transcriptionText.innerText = `Error accessing microphone: ${error.message}`;
    });
}

function stopRecording() {
    isRecording = false;
    micButton.classList.remove('active'); // Deactivate glow effect
    micIcon.src = micOffUrl; // Switch to mic off image
    transcriptionText.innerText = 'Stopped listening.';

    // Hide the waveform container
    waveform.style.display = 'none';
    
    mediaRecorder.stop();
    audioContext.close();  // Close the audio context after stopping
    audioChunks = [];      // Clear audio chunks for the next recording
}

// Function to visualize audio frequency data
function visualize() {
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 100;
        waveform.appendChild(canvas);
        canvasContext = canvas.getContext('2d');
    }

    function draw() {
        if (!isRecording) {
            return; // Stop drawing if not recording
        }
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);
        canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing
        canvasContext.fillStyle = '#1b1b2f';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = '#bbe1fa';
        canvasContext.beginPath();

        let sliceWidth = canvas.width / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            let v = dataArray[i] / 128.0;
            let y = v * canvas.height / 2;

            if (i === 0) {
                canvasContext.moveTo(x, y);
            } else {
                canvasContext.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
    }

    draw();
}
