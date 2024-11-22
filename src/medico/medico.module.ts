import { Module } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoEntity } from './medico.entity/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicoEntity])],
  providers: [MedicoService],
})
export class MedicoModule {}
