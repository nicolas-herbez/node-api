import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'celdelices_api',
    'celdelices_api',
    'mdp',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

export default sequelize
