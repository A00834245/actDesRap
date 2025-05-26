from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/messages', methods=['GET'])
def get_messages():
    messages = supabase.table('mensajes').select('*').execute()
    return jsonify(messages)


@app.route('/post-message', methods=['POST'])
def post_message():
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({'error': 'Message is required'}), 400

    # messages.append(message) send to DB
    return jsonify({'success': True, 'message': message}), 201

if __name__ == '__main__':
    app.run(debug=True)