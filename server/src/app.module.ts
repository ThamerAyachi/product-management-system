import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bxejbwcgxbl1qa01wxdr-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'upqjbuttbizmzd6m',
      password: 'naYcBcrTETGMV6krHjYO',
      database: 'bxejbwcgxbl1qa01wxdr',
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
