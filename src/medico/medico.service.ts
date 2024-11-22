import { Injectable } from '@nestjs/common';
import { MedicoEntity } from './medico.entity/medico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(MedicoEntity)
    private readonly medicoRepository: Repository<MedicoEntity>,
  ) {}

  async findAll(): Promise<MedicoEntity[]> {
    return this.medicoRepository.find();
  }

  async findOne(id: string): Promise<MedicoEntity> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
    });

    if (!medico) {
      throw new BusinessLogicException(
        'Medico no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    return medico;
  }

  async create(medico: MedicoEntity): Promise<MedicoEntity> {
    return this.medicoRepository.save(medico);
  }

  async delete(id: string): Promise<void> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
    });
    if (!medico) {
      throw new BusinessLogicException(
        'Medico no encontrado',
        BusinessError.NOT_FOUND,
      );
    }
    if (medico.pacientes.length >= 1) {
      throw new BusinessLogicException(
        'No se puede eliminar un médico con pacientes asociados',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    await this.medicoRepository.delete(medico.id);
  }
}
