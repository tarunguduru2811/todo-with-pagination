import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    description: "",
    completed: false
  });
  const [deleteData, setDeleteData] = useState({
    id: ""
  })
  const [deleteConfirm, setDeleteConfirm] = useState(false);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const data = {
        name: formData.name,
        description: formData.description
      }
      const apiUrl = "http://localhost:5000"
      const res = await axios.post(`${apiUrl}/api/todo`, data);
      setLoading(false);
      fetchTodos();
    } catch (err) {
      console.log("Error while creating the Todo")
    } finally {
      setLoading(false)
    }
  }

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/todo", {
        params: { search, page }
      });
      setTodos(res.data.todos);
      setTotalPages(res.data.totalPages)
      setLoading(false);
    } catch (err) {
      console.log("Error in Fetching Todos", err);
    }
  }

  const handleEdit = async (id, name, description, completed) => {
    setShowEdit(true)
    setEditData({
      id,
      name,
      description,
      completed
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: name === "completed" ? value === "True" : value }))
  }

  const confirmEdit = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todo/${editData.id}`, editData);
      setShowEdit(false);
      fetchTodos()
    } catch (err) {
      console.log("Error in updating", err);
    }
  }

  const deleteModal = (id) => {
    setDeleteConfirm(true);
    setDeleteData({ id });

  }
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/todo/${id}`);
      fetchTodos();
      setDeleteConfirm(false)
    } catch (err) {
      console.log("Error in Deleting", err);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTodos();
    }, 3000)

    return () => clearTimeout(timeout)
  }, [search, page]);

  return (
    <div className="App">
      <form onSubmit={submitHandler} className='todo-form'>
        <h3>Add Todo</h3>

        <div className='add-labels'>
          <label htmlFor="name">Name :</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className='add-labels'>
          <label htmlFor="name">Description :</label>
          <input name="description" value={formData.description} onChange={handleChange} />
        </div>

        <button type='submit' className='edit-btn'>
          Submit
        </button>
      </form>

      <div className='search-container'>
        <label>
          <h3>Search</h3>
        </label>
        <input value={search} placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
      </div>

      {
        todos.length > 0 ?
          (
            <div className='table-wrapper'>
              <table className='table-container'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Actions</th>
                  </tr>
                </thead>


                <tbody>
                  {
                    todos.map((t) => (
                      <tr key={t._id}>
                        <td>{t.name}</td>
                        <td>{t.description} </td>
                        <td>{t.completed ? "True" : "False"}</td>
                        <td >
                          <div className='actions-btns'>
                            <button onClick={() => handleEdit(t._id, t.name, t.description, t.completed)}>Edit</button>
                            <button onClick={() => deleteModal(t._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
          :
          (
            <p>No Todos</p>
          )
      }

      {
        showEdit && (
          <div className='modal-overlay'>
            <div className='edit-form '>
              <h3>Edit Form</h3>
              <p className='cross-btn' onClick={() => setShowEdit(false)}>X</p>

              <div className='edit-labels'>
                <label>
                  Name
                </label>
                <input name="name" value={editData.name} onChange={handleEditChange} />
              </div>

              <br />

              <div className='edit-labels'>
                <label>Description</label>
                <input name='description' value={editData.description} onChange={handleEditChange} />
              </div>
              <br />

              <div className='edit-labels'>
                <label>
                  Completed
                </label>
                <select name='completed' value={editData.completed ? "True" : "False"} onChange={handleEditChange}>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              </div>

              <button onClick={confirmEdit} className='edit-btn'>Edit</button>
            </div>
          </div>
        )
      }

      {
        deleteConfirm && (

          <div className='modal-overlay'>
            <div className='delete-modal'>
              <h2>Are you sure to delete the task?</h2>
              <div className='actions-btns'>
                <button onClick={() => handleDelete(deleteData.id)}>Confirm</button>
                <button onClick={() => setDeleteConfirm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )
      }
      <div className='page-btns'>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        {page} of {totalPages}
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </div>
  );
}

export default App;
