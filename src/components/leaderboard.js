import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = process.env.REACT_APP_API_BASE_URL + '/leaderboard';
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin', 'http://localhost:3000');

// Assuming api variable holds the endpoint for fetching the leaderboard
fetch(api, {
  method: 'GET', // Use GET method for fetching leaderboard data
  headers: headers, // Pass the headers
})
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.error);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Leaderboard data:', data);
    // Handle the fetched leaderboard data here
  })
  .catch(error => {
    console.error('Error fetching leaderboard:', error);
    // Handle error
  });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h1 className="text-4xl font-bold mb-6">Quiz Leaderboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Rank</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{entry.name}</td>
                <td className="border border-gray-400 px-4 py-2">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
