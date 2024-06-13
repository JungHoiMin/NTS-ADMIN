import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = () => {
  return {
    type: 'postgres',
    host: '19.19.20.89',
    port: 5432,
    username: 'hanilndb',
    password: 'hanilndb^04',
    database: 'nts-admin-db',
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  } as TypeOrmModuleOptions;
};
