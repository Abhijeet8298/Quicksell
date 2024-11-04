import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from './Column';

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [groupBy, setGroupBy] = useState('user'); // or 'priority'

  useEffect(() => {
    axios.get('/data.json') // Updated to fetch data from data.json
      .then(response => setTasks(response.data.tickets)) // Accessing the tickets array
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const groupedTasks = groupTasks(tasks, groupBy);

  function groupTasks(tasks, groupBy) {
    return tasks.reduce((result, task) => {
      const key = task[groupBy];
      if (!result[key]) result[key] = [];
      result[key].push(task);
      return result;
    }, {});
  }

  return (
    <div>
      <select onChange={(e) => setGroupBy(e.target.value)}>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
      <div className="kanban-board">
        {Object.entries(groupedTasks).map(([key, tasks]) => (
          <Column key={key} title={key} tasks={tasks} />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
