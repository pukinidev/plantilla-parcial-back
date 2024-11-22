import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { PacienteEntity } from 'src/paciente/paciente.entity/paciente.entity';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PacienteMedicoService {
  constructor(
    @InjectRepository(PacienteEntity)
    private readonly pacienteRepository: Repository<PacienteEntity>,

    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async addMedicoToPaciente(
    pacienteId: string,
    medicoId: string,
  ): Promise<PacienteEntity> {
    const paciente = await this.pacienteRepository.findOne({
      where: { id: pacienteId },
      relations: ['medicos'],
    });

    if (!paciente) {
      throw new BusinessLogicException(
        'Paciente no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    const medico = await this.medicoRepository.findOne({
      where: { id: medicoId },
    });

    if (!medico) {
      throw new BusinessLogicException(
        'Medico no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    if (paciente.medicos.length >= 5) {
      throw new BusinessLogicException(
        'No se puede agregar más de 5 médicos a un paciente',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    paciente.medicos = [...paciente.medicos, medico];
    return this.pacienteRepository.save(paciente);
  }
}
