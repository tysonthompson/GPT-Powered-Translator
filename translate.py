import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api_key = "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"
# Add a dictionary of language codes
language_codes = {
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Portuguese": "pt",
    "Italian": "it",
    "Dutch": "nl",
    "Russian": "ru",
    "Arabic": "ar",
    "Chinese": "zh",
}

def translate(text, target_language):
    try:
        target_code = language_codes.get(target_language)
        if not target_code:
            return "Invalid target language."

        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Translate the following text to {target_code}: '{text}'",
            max_tokens=60,
            api_key=api_key,
        )

        translated_text = response.choices[0].text.strip()

        return translated_text
    except Exception as e:
        return str(e)

@app.route('/translate', methods=['POST'])
def translate_route():
    data = request.get_json()
    text = data.get('text', '')
    
    # Check if the text is empty
    if not text:
        return jsonify({"translation": "Text is empty."})

    target_language = data.get('target_language', 'English')
    translation = translate(text, target_language)
    return jsonify({"translation": translation})

if __name__ == '__main__':
    app.run(debug=True)
