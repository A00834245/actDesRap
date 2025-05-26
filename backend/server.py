from flask import Flask, jsonify, request
from supabase import create_client

# Configura tu Supabase
url = 'https://ewwluwxffknnwussbqud.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2x1d3hmZmtubnd1c3NicXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODA0MTAsImV4cCI6MjA2Mzg1NjQxMH0.wYI3TCQvBliUIxnl48vjQY5KYe4_hjQ5qXjE73yHW1c'
supabase = create_client(url, key)

app = Flask(__name__)

@app.route('/messages', methods=['GET'])
def get_messages():
    response = supabase.table('mensajes').select('*').execute()
    return jsonify(response.data)  # Solo .data, no todo el response

@app.route('/post-message', methods=['POST'])
def post_message():
    data = request.get_json()

    name = data.get('usuario')
    message = data.get('mensaje')
    date = data.get('fecha')  # puedes generar date automáticamente si quieres

    if not message or not name or not date:
        return jsonify({'error': 'Name, message and date are required'}), 400

    response = supabase.table('mensajes').insert({
        'usuario': name,
        'mensaje': message,
        'fecha': date
    }).execute()

    return jsonify({'success': True, 'data': response.data}), 201

if __name__ == '__main__':
    app.run(debug=True)