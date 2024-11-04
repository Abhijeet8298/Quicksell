import React from 'react';

const Column = ({ title, tasks }) => {
    return (
        <div className="column">
            <h2>{title}</h2>
            {tasks.map(task => (
                <div key={task.id} className="task">
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Column;
