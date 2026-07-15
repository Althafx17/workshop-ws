import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class SafeMIMERequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve from the directory where this script is located
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    # Force override MIME type mappings (fixes Windows registry issues)
    def end_headers(self):
        # Enable CORS just in case
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

# Explicitly register content types to bypass registry lookup
SafeMIMERequestHandler.extensions_map.update({
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
})

print(f"Starting server in: {DIRECTORY}")
with socketserver.TCPServer(("", PORT), SafeMIMERequestHandler) as httpd:
    print(f"Local server running at: http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()
