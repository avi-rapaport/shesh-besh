import http from 'http';

export const httpServer = http.createServer();

httpServer.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
