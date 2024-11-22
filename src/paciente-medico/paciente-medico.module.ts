import { Module } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { PacienteMedicoController } from './paciente-medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteEntity, MedicoEntity])],
  providers: [PacienteMedicoService],
  controllers: [PacienteMedicoController],
})
export class PacienteMedicoModule {}
