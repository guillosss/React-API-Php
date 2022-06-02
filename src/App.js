import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast.configure();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      student_name: '',
      student_class: '',
      student_phone_number: '',
      student_email: '',
      student_id: '0',
      students: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }
  // métodos
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addStudent(e) {
    e.preventDefault();
        fetch(`http://localhost:8081/apirnacademic/InsertStudentData.php`, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          toast.success("Estudiante guardado correctamente ...", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000
          })
          this.setState({ student_name: '', student_class: '', student_phone_number: '', student_email: '' });
          this.refreshStudent();
        });
    
  }

    refreshStudent() {
    const apiUrl = 'http://localhost:8081/apirnacademic/showallstudentslist.php';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ students: data });
        console.log(this.state.students);
      })

  }
  componentDidMount() { // cuando carguen sus componentes
    this.refreshStudent();
  }
  // renderizar
  render() {
    return (
      <div className="container">
        <h3>Actualización de Estudiantes</h3>
        {/* Formulario*/}
        <form onSubmit={this.addStudent}>
          <div className="mb-3">
            Nombre
            <input type="text" name="student_name" className="form-control"
              onChange={this.handleChange} value={this.state.student_name}
              placeholder="Nombre" autoFocus
            />
          </div>
          <div className="mb-3">
            Asignatura
            <input type="text" name="student_class" className="form-control"
              onChange={this.handleChange} value={this.state.student_class}
              placeholder="Asignatura"
            />
          </div>
          <div className="mb-3">
            Teléfono
            <input type="text" name="student_phone_number" className="form-control"
              onChange={this.handleChange} value={this.state.student_phone_number}
              placeholder="Teléfono"
            />
          </div>
          <div className="mb-3">
            Correo Electrónico
            <input type="email" name="student_email" className="form-control"
              onChange={this.handleChange} value={this.state.student_email}
              placeholder="Correo Electrónico"></input>

          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
        {/* Fin formulario*/}

        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Asignatura</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.students.map(student => {
                return (
                  <tr key={student.student_id}>
                    <td>{student.student_id}</td>
                    <td>{student.student_name}</td>
                    <td>{student.student_class}</td>
                    <td>{student.student_phone_number}</td>
                    <td>{student.student_email}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <ToastContainer />
      </div>
    )
  }

}

export default App;
