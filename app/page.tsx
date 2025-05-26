// app/page.tsx
import MessageForm from './components/messageForm'
import MessageList from './components/messageList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center"> Libro de Visitas Digital</h1>

        {/* Formulario para agregar mensajes */}
        <MessageForm />

        {/* Lista de mensajes */}
        <MessageList />
      </div>
    </main>
  )
}
