import re
import os
import pyttsx3
from flask import url_for

def generate_output(language, transcript, location):
    # Define the keywords to search for in the transcript
    keywords = ['account', 'deposit', 'withdraw']

    # Check if any of the keywords are present in the transcript
    for keyword in keywords:
        if re.search(keyword, transcript, re.IGNORECASE):
            if location.lower() == "bank" and keyword.lower() == "withdraw":
                output_text = "You are trying to withdraw from your bank account."
            else:
                messages = {
                    'en': f"The transcript contains the keyword {keyword} and the selected location is {location}.",
                    'hi': f"प्रतिलिपि में '{keyword}' कीवर्ड मौजूद है और चुनी गई स्थान {location} है.",
                    'mr': f"ट्रान्स्क्रिप्ट में '{keyword}' कीवर्ड आहे आणि निवडलेली स्थान {location} आहे.",
                    'gu': f"ટ્રાન્સક્રિપ્ટમાં '{keyword}' કીવર્ડ છે અને પસંદ કરેલી સ્થળ {location} છે."
                }
                output_text = messages.get(language, 'Language not supported')
            speak_output(language, output_text)
            return output_text

    # If no keywords are found, display the original message
    messages = {
        'en': f"The selected language is English, the transcript is: {transcript}, and the selected location is {location}.",
        'hi': f"चुना गया भाषा Hindi है, प्रतिलिपि है: {transcript}, और चुनी गई स्थान {location} है.",
        'mr': f"निवडलेली भाषा Marathi आहे, ट्रान्स्क्रिप्ट आहे: {transcript}, आणि निवडलेली स्थान {location} आहे.",
        'gu': f"પસંદ કરેલી ભાષા Gujrati છે, ટ્રાન્સક્રિપ્ટ છે: {transcript}, અને પસંદ કરેલી સ્થળ {location} છે."
    }
    output_text = messages.get(language, 'Language not supported')
    speak_output(language, output_text)
    return output_text

def speak_output(language, text):
    engine = pyttsx3.init()
    if language == 'hi':
        engine.setProperty('voice', 'hindi')
    elif language == 'mr':
        engine.setProperty('voice', 'marathi')
    elif language == 'gu':
        engine.setProperty('voice', 'gujarati')
    else:
        engine.setProperty('voice', engine.getProperty('voices')[0].id)
    engine.say(text)
    engine.runAndWait()

def get_audio_url(language, text):
    audio_filename = f"{language}_{text.replace(' ', '_')}.mp3"
    audio_path = os.path.join('static', 'audio', audio_filename)
    
    # Generate the audio file using pyttsx3
    # speak_output(language, text)
    
    # Return the audio URL
    return url_for('static', filename=f'audio/{audio_filename}')