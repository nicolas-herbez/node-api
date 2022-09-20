import createServer from './utils/server';

const port: number = 5000;
const app = createServer();

app.listen(port, () => console.log(`api listen on http://localhost:${port}`));
