import CreateTables from './create-tables';
import SeedData from './seed';

(async () => {
  try {
    const tableResult = await CreateTables();

    const dataResult = await SeedData();

    console.log('done!!');
  } catch (err) {
    console.log('error setting up dynamo', err);
    process.exit();
  }
})();
