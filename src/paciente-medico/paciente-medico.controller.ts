import { Controller, Post } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';

@Controller('pacientes')
export class PacienteMedicoController {
  constructor(private readonly pacienteMedicoService: PacienteMedicoService) {}

  @Post(':pacienteId/medicos/:medicoId')
  async addMedicoToPaciente(pacienteId: string, medicoId: string) {
    return this.pacienteMedicoService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
