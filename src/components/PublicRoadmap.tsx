import React, { useEffect, useState } from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
}

const PUBLIC_ROADMAP_ENDPOINT =
  "https://board-414-play-563-abroad-64-hat.hook.membrane.io";

const PublicRoadmap: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(PUBLIC_ROADMAP_ENDPOINT);
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <ul className="list">
        {tasks.map(({ id, name, description, status }) => {
          return (
            <li key={id} className="row">
              <p className="badge" data-status={status}>
                {status}
              </p>
              <p className="title">{name}</p>
              <pre className="description">{description}</pre>
            </li>
          );
        })}
      </ul>
      <style>
        {`
          .list {
            padding: 0;
            margin-top: 16px;
          }

          .list li {
            list-style: none;
          }

          .row {
            position: relative;
            padding: 16px;
            padding-right: 124px;
            border: 1px solid #eaeaea;
            margin-bottom: 16px;
            animation: fadeIn 0.5s ease-in;
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .badge {
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 4px 8px;
            border: 1px solid #115aec;
            background-color: #dfe8fb;
            color: #374151;
            font-family: var(--__sl-mono-font);
            font-size: 0.75rem;
          }

          .badge[data-status="in-progress"] {
            border-color: #f0ad4e;
            background-color: #fcf8e3;
          }

          .row > .title {
            text-wrap: balance;
            font-weight: bold;
            margin-top: 0;
          }

          .list > .row > .description {
            border: none;
            padding: 0;
            white-space: pre-wrap;
            margin-bottom: 0;
          }
        `}
      </style>
    </>
  );
};

export default PublicRoadmap;
