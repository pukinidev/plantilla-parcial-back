import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { PacienteEntity } from './paciente/paciente.entity/paciente.entity';
import { MedicoEntity } from './medico/medico.entity/medico.entity';
import { DiagnosticoEntity } from './diagnostico/diagnostico.entity/diagnostico.entity';
import { PacienteMedicoModule } from './paciente-medico/paciente-medico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'parcial-db',
      port: 5432,
      username: 'student',
      password: 'isis3710',
      database: 'parcialdb',
      entities: [PacienteEntity, MedicoEntity, DiagnosticoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    MedicoModule,
    PacienteModule,
    DiagnosticoModule,
    PacienteMedicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
