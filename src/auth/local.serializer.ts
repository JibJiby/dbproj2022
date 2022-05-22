import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/Staff';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Staff) private staffsRepository: Repository<Staff>,
  ) {
    super();
  }

  serializeUser(staff: Staff, done: CallableFunction) {
    console.log(staff);
    done(null, staff.id);
  }

  async deserializeUser(staffId: string, done: CallableFunction) {
    return await this.staffsRepository
      .findOneOrFail(
        {
          id: +staffId,
        },
        {
          select: ['id', 'email', 'name'],
        },
      )
      .then((staff) => {
        console.log('staff', staff);
        done(null, staff);
      })
      .catch((error) => done(error));
  }
}
