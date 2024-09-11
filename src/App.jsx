import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './slices/todoSlice'

function App() {
  const dispatch = useDispatch()

  const todos = useSelector((state) => state)

  console.log(todos)

  if(todos.todo.isLoading){
    return (
    <div>
      <button onClick={() => dispatch(fetchTodos())} className='bg-red-500 p-4 rounded-md '>Fetch Todos</button>
      <p>Loading...</p>
    </div>)
  }else{
    return (
      <div className='min-h-screen '>
        <button onClick={() => dispatch(fetchTodos())} className='bg-red-500 p-4 rounded-md '>Fetch Todos</button>
        <div className="p-5">
        <h1 className="text-3xl font-bold text-center mb-5">Todo List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.todo.data && todos.todo.data.map((todo) => (
            <div
              key={todo.id}
              className="card bg-base-100 shadow-xl p-4 border border-gray-200 rounded-lg hover:shadow-2xl transition duration-200"
            >
              <h2 className="card-title text-lg font-semibold mb-2">
                {todo.title}
              </h2>
              <p
                className={`badge ${
                  todo.completed
                    ? 'badge-success text-green-800'
                    : 'badge-warning text-yellow-800'
                }`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </p>
            </div>
          ))}
        </div>
      </div>
      </div>
    )
  }
}

export default App
