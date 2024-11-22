import { Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { PacienteMedicoService } from './paciente-medico.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('pacientes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PacienteMedicoController {
  constructor(private readonly pacienteMedicoService: PacienteMedicoService) {}

  @Post(':pacienteId/medicos/:medicoId')
  async addMedicoToPaciente(
    @Param('pacienteId') pacienteId: string,
    @Param('medicoId') medicoId: string,
  ) {
    return this.pacienteMedicoService.addMedicoToPaciente(pacienteId, medicoId);
  }
}
