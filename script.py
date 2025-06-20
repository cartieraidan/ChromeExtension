import sys
import json

def get_message():
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        return None
    message_length = int.from_bytes(raw_length, byteorder='little')
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

def send_message(message_content):
    encoded_content = json.dumps(message_content).encode('utf-8')
    sys.stdout.buffer.write(len(encoded_content).to_bytes(4, byteorder='little'))
    sys.stdout.buffer.write(encoded_content)
    sys.stdout.buffer.flush()

# Example usage
if __name__ == '__main__':
    message = get_message()
    print("Received:", message)
    send_message({"response": "Python received your message!"})