import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import { ProductModule } from './products/product.module';
import { Product } from './products/product.entity';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [Product],
    synchronize: true
  }), ProductModule, UsersModule],
  providers: [{
    provide: 'FIREBASE_APP',
    useFactory: () => {
      return admin.initializeApp({
        credential: admin.credential.cert(require('../../firebase.json')),
        databaseURL: 'https://nest-c0fb1.firebaseio.com', // for Realtime DB
      });
    },
  }],
  exports: ['FIREBASE_APP']
})
export class AppModule { }
