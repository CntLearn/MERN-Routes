
import { Container, Table, Button, Badge } from 'react-bootstrap';

const Tasks = () => {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
        return <Badge bg="success">Completed</Badge>;
      case 'In Progress':
        return <Badge bg="primary">In Progress</Badge>;
      default:
        return <Badge bg="warning">Pending</Badge>;
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High':
        return <Badge bg="danger">High</Badge>;
      case 'Medium':
        return <Badge bg="warning">Medium</Badge>;
      default:
        return <Badge bg="success">Low</Badge>;
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tasks</h1>
        <Button variant="primary">New Task</Button>
      </div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, name: 'Complete project proposal', status: 'In Progress', dueDate: '2023-05-20', priority: 'High' },
            { id: 2, name: 'Meeting with team', status: 'Pending', dueDate: '2023-05-18', priority: 'Medium' },
            { id: 3, name: 'Review client feedback', status: 'Completed', dueDate: '2023-05-15', priority: 'Low' },
            { id: 4, name: 'Update documentation', status: 'In Progress', dueDate: '2023-05-25', priority: 'Medium' },
            { id: 5, name: 'Deploy application to production', status: 'Pending', dueDate: '2023-05-30', priority: 'High' },
          ].map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{getStatusBadge(task.status)}</td>
              <td>{task.dueDate}</td>
              <td>{getPriorityBadge(task.priority)}</td>
              <td>
                <Button variant="outline-primary" size="sm">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Tasks;
