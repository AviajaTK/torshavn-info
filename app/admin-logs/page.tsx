'use client';

import { useEffect, useState } from 'react';

const VISITOR_TYPES = ['All', 'Føroyingur', 'Ferðafólk'];
const QUERY_TYPES = [
  'All',
  'TK Buss',
  'Kommunalar Tænastur',
  'SSL',
  'Kunning í TK',
  'Kunning uttanfyri TK',
  'Mist & Funnið',
  'Annað',
  'Tiltøk',
  'Tax Free',
];

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [visitorType, setVisitorType] = useState('All');
  const [queryType, setQueryType] = useState('All');

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      const res = await fetch(`/api/logs?${params.toString()}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setLogs(data.logs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, []);

  // Filter logs client-side for visitorType and queryType
  const filteredLogs = logs.filter(log =>
    (visitorType === 'All' || log.visitorType === visitorType) &&
    (queryType === 'All' || log.queryType === queryType)
  );

  // Download as CSV
  const downloadCSV = () => {
    const header = 'Visitor Type,Query Type,Timestamp\n';
    const rows = filteredLogs.map(log =>
      [log.visitorType, log.queryType, new Date(log.timestamp).toLocaleString()].join(',')
    );
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visitor-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: 32 }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Admin: Visitor Logs</h1>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <div>
            <label>Start date:{' '}
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </label>
          </div>
          <div>
            <label>End date:{' '}
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </label>
          </div>
          <div>
            <label>Visitor type:{' '}
              <select value={visitorType} onChange={e => setVisitorType(e.target.value)}>
                {VISITOR_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
          </div>
          <div>
            <label>Query type:{' '}
              <select value={queryType} onChange={e => setQueryType(e.target.value)}>
                {QUERY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
          </div>
          <button onClick={fetchLogs} style={{ padding: '6px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 4, fontWeight: 500 }}>Fetch</button>
          <button onClick={downloadCSV} style={{ padding: '6px 16px', background: '#059669', color: 'white', border: 'none', borderRadius: 4, fontWeight: 500 }}>Download CSV</button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <div style={{ background: '#1e3a8a', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#1e40af' }}>
                <tr>
                  <th style={{ color: 'white', padding: 12, textAlign: 'left', fontWeight: 600 }}>Visitor Type</th>
                  <th style={{ color: 'white', padding: 12, textAlign: 'left', fontWeight: 600 }}>Query Type</th>
                  <th style={{ color: 'white', padding: 12, textAlign: 'left', fontWeight: 600 }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr><td colSpan={3} style={{ color: 'white', textAlign: 'center', padding: 24 }}>No logs found</td></tr>
                ) : filteredLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #1e40af' }}>
                    <td style={{ color: 'white', padding: 12 }}>{log.visitorType}</td>
                    <td style={{ color: 'white', padding: 12 }}>{log.queryType}</td>
                    <td style={{ color: 'white', padding: 12 }}>{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 