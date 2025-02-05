const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get('http://localhost:5000/api/tasks', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTasks(res.data);
        } catch (err) {
          alert('Failed to fetch tasks');
        }
      };
      fetchTasks();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/tasks', { title, description }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        window.location.reload();
      } catch (err) {
        alert('Failed to create task');
      }
    };
  
    return (
      <div>
        <h1>Tasks</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default  