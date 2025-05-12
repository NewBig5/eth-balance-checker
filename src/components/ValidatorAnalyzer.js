import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Button,
  TextField,
  Grid
} from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import axios from 'axios';
import './ValidatorAnalyzer.css';

function ValidatorAnalyzer() {
  const [validatorIndex, setValidatorIndex] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState([]);

  const fetchValidatorHistory = async () => {
    if (!validatorIndex) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://beaconcha.in/api/v1/validator/${validatorIndex}/stats`
      );
      
      if (response.data.status === 'OK' && response.data.data) {
        const data = response.data.data;
        setHistory(data);
        
        // 处理图表数据
        const processedData = data.map(item => ({
          epoch: item.epoch,
          rewards: parseFloat(item.rewards),
          penalties: parseFloat(item.penalties),
          participation: parseFloat(item.participation_rate)
        }));
        setChartData(processedData);
      } else {
        throw new Error(response.data.message || '获取数据失败');
      }
    } catch (err) {
      setError('获取验证者历史数据失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!history.length) return;

    const headers = ['Epoch', '参与率', '奖励', '惩罚', '状态'];
    const csvContent = [
      headers.join(','),
      ...history.map(item => [
        item.epoch,
        item.participation_rate,
        item.rewards,
        item.penalties,
        item.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `validator_${validatorIndex}_history.csv`;
    link.click();
  };

  return (
    <Box className="validator-analyzer">
      <Typography variant="h4" component="h1" gutterBottom>
        以太坊验证者数据分析
      </Typography>

      <Grid container spacing={2} className="search-section">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="验证者索引"
            value={validatorIndex}
            onChange={(e) => setValidatorIndex(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={fetchValidatorHistory}
            disabled={loading || !validatorIndex}
            className="search-button"
          >
            {loading ? <CircularProgress size={24} /> : '查询数据'}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}

      {chartData.length > 0 && (
        <Paper className="chart-section">
          <Typography variant="h6" gutterBottom>
            验证者表现趋势
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="rewards"
                stroke="#4caf50"
                name="奖励 (ETH)"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="penalties"
                stroke="#f44336"
                name="惩罚 (ETH)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="participation"
                stroke="#2196f3"
                name="参与率 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {history.length > 0 && (
        <Paper className="table-section">
          <Box className="table-header">
            <Typography variant="h6">详细数据</Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={exportToCSV}
            >
              导出 CSV
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Epoch</TableCell>
                  <TableCell>参与率</TableCell>
                  <TableCell>奖励</TableCell>
                  <TableCell>惩罚</TableCell>
                  <TableCell>状态</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((epoch) => (
                  <TableRow key={epoch.epoch}>
                    <TableCell>{epoch.epoch}</TableCell>
                    <TableCell>{epoch.participation_rate}%</TableCell>
                    <TableCell className={epoch.rewards > 0 ? 'positive' : ''}>
                      {epoch.rewards} ETH
                    </TableCell>
                    <TableCell className={epoch.penalties > 0 ? 'negative' : ''}>
                      {epoch.penalties} ETH
                    </TableCell>
                    <TableCell>{epoch.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}

export default ValidatorAnalyzer; 