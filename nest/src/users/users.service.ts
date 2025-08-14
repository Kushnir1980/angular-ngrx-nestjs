import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as admin from 'firebase-admin';
import { Inject } from '@nestjs/common';


@Injectable()
export class UsersService {

  private firestore: admin.firestore.Firestore;


  constructor(@InjectRepository(User) private repo: Repository<User>, @Inject('FIREBASE_APP') private readonly app: admin.app.App) {
    this.firestore = app.firestore();
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    // Save to Firestore
    this.firestore.collection('users').add({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async find(email: string) {
    // Get user from Firestore
    const snapshot = await this.firestore.collection('users').where('email', '==', email).get();
    const user = !snapshot.empty ? snapshot.docs[0].data() : null;
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
