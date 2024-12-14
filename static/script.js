let speechRecognition = null;
let transcript = '';
let selectedLanguage = '';
let selectedLocation = '';

function toggleSpeechInput() {
  const button = document.getElementById('speech-button');
  if (!speechRecognition) {
    startSpeechInput();
    button.textContent = 'Stop speaking';
  } else {
    stopSpeechInput();
    button.textContent = 'Tap to start speaking';
  }
}

function startSpeechInput() {
  const language = document.getElementById('language-select').value;
  selectedLanguage = language;
  speechRecognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
  speechRecognition.lang = language;
  speechRecognition.onresult = (event) => {
    transcript = event.results[0][0].transcript;
    updateTranscriptDisplay();
  };
  speechRecognition.start();
}

function stopSpeechInput() {
  speechRecognition.stop();
  speechRecognition = null;
}

function speechOutput() {
  const button = document.getElementById('speak-button');
  const language = document.getElementById('language-select').value;
  const outputText = document.querySelector('.item p').textContent;

  const utterance = new SpeechSynthesisUtterance(outputText);
  utterance.lang = language;

  speechSynthesis.speak(utterance);
}

function playAudioOutput(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}

function updateTranscriptDisplay() {
  const transcriptContainer = document.getElementById('transcript');
  const submitTranscriptContainer = document.getElementById('submit-transcript');
  transcriptContainer.textContent = transcript;
  submitTranscriptContainer.textContent = transcript;
}

function updateSelectedLanguage() {
  const languageSelect = document.getElementById('language-select');
  selectedLanguage = languageSelect.value;
  const selectedLanguageDisplay = document.getElementById('selected-language');
  selectedLanguageDisplay.textContent = getLanguageName(selectedLanguage);
}

function selectLocation(location) {
  selectedLocation = location;
  const selectedLocationDisplay = document.getElementById('selected-location');
  selectedLocationDisplay.textContent = getLocationName(location);
}

function getLanguageName(languageCode) {
  const languageNames = {
    'en': 'English',
    'hi': 'Hindi',
    'mr': 'Marathi',
    'gu': 'Gujarati'
  };
  return languageNames[languageCode] || 'Unknown';
}

function getLocationName(locationCode) {
  const locationNames = {
    'bank': 'Bank',
    'supermarket': 'Supermarket',
    'ticket_window': 'Train Ticket Window'
  };
  return locationNames[locationCode] || 'Unknown';
}

document.addEventListener('DOMContentLoaded', function() {
  const speakButton = document.getElementById('speak-button');
  speakButton.addEventListener('click', () => {
    const outputText = document.querySelector('.item p').textContent;
    speakOutput(selectedLanguage, outputText);
  });
});

const submitButton = document.querySelector('#submit-form button[type="submit"]');
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Update the form action with the selected language, transcript, and location
  const submitForm = document.getElementById('submit-form');
  submitForm.action = `/submit?language=${selectedLanguage}&transcript=${transcript}&location=${selectedLocation}`;

  // Submit the form
  submitForm.submit();

  // Handle the audio output
  // fetch(`/submit?language=${selectedLanguage}&transcript=${transcript}&location=${selectedLocation}`)
  //   .then(response => response.json())
  //   .then(data => {
  //     playAudioOutput(data.audioUrl);
  //   })
  //   .catch(error => {
  //     console.error('Error playing audio:', error);
  //   });
});

// Call the updateSelectedLanguage function when the language select value changes
document.getElementById('language-select').addEventListener('change', updateSelectedLanguage);