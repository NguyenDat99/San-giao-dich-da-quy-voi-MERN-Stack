import http from 'http';
import { PORT } from './config/general.config';
import { AppExpress } from './boots/app-express.boot';
import { MongoDBConnect } from './boots/database.boot';

const runApp = async () => {
  try {
    await MongoDBConnect();
    const app = AppExpress();
    const server = http.createServer(app);

    server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runApp();
