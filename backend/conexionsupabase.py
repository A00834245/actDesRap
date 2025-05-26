from supabase import create_client, Client

url = "https://ewwluwxffknnwussbqud.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3d2x1d3hmZmtubnd1c3NicXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODA0MTAsImV4cCI6MjA2Mzg1NjQxMH0.wYI3TCQvBliUIxnl48vjQY5KYe4_hjQ5qXjE73yHW1c"

supabase: Client = create_client(url, key)

# Fetch data from a table named 'messages'
response = supabase.table('mensajes').select('*').execute()

print(response.data)