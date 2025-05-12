import { useState, useEffect } from 'react';
import './ValidatorHistory.css';

function ValidatorHistory({ validatorIndex }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchValidatorHistory = async () => {
      setLoading(true);
      setError('');
      try {
        // 使用 Beaconcha.in API
        const response = await fetch(
          `https://beaconcha.in/api/v1/validator/${validatorIndex}/stats`
        );
        const data = await response.json();
        
        if (data.status === 'OK' && data.data) {
          setHistory(data.data);
        } else {
          throw new Error(data.message || '获取数据失败');
        }
      } catch (err) {
        setError('获取验证者历史数据失败: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (validatorIndex) {
      fetchValidatorHistory();
    }
  }, [validatorIndex]);

  if (loading) {
    return <div className="validator-history loading">加载中...</div>;
  }

  if (error) {
    return <div className="validator-history error">{error}</div>;
  }

  return (
    <div className="validator-history">
      <h2>验证者历史数据</h2>
      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Epoch</th>
              <th>参与率</th>
              <th>奖励</th>
              <th>惩罚</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {history.map((epoch) => (
              <tr key={epoch.epoch}>
                <td>{epoch.epoch}</td>
                <td>{epoch.participation_rate}%</td>
                <td className={epoch.rewards > 0 ? 'positive' : ''}>
                  {epoch.rewards} ETH
                </td>
                <td className={epoch.penalties > 0 ? 'negative' : ''}>
                  {epoch.penalties} ETH
                </td>
                <td>{epoch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ValidatorHistory; 