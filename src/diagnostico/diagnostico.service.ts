import { Injectable } from '@nestjs/common';
import { DiagnosticoEntity } from './diagnostico.entity/diagnostico.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Injectable()
export class DiagnosticoService {
  constructor(
    @InjectRepository(DiagnosticoEntity)
    private readonly diagnosticoRepository: Repository<DiagnosticoEntity>,
  ) {}

  async findAll(): Promise<DiagnosticoEntity[]> {
    return this.diagnosticoRepository.find();
  }

  async findOne(id: string): Promise<DiagnosticoEntity> {
    const diagnostico = await this.diagnosticoRepository.findOne({
      where: { id },
    });

    if (!diagnostico) {
      throw new BusinessLogicException(
        'Diagnostico no encontrado',
        BusinessError.NOT_FOUND,
      );
    }

    return diagnostico;
  }

  async create(diagnostico: DiagnosticoEntity): Promise<DiagnosticoEntity> {
    if (diagnostico.descripcion.length > 200) {
      throw new BusinessLogicException(
        'La descripción del diagnóstico no puede tener más de 200 caracteres',
        BusinessError.BAD_REQUEST,
      );
    }
    return this.diagnosticoRepository.save(diagnostico);
  }

  async delete(id: string): Promise<void> {
    const diagnostico = await this.diagnosticoRepository.findOne({
      where: { id },
    });
    if (!diagnostico) {
      throw new BusinessLogicException(
        'Diagnostico no encontrado',
        BusinessError.NOT_FOUND,
      );
    }
    await this.diagnosticoRepository.delete(diagnostico.id);
  }
}
