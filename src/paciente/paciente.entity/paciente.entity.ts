import { DiagnosticoEntity } from 'src/diagnostico/diagnostico.entity/diagnostico.entity';
import { MedicoEntity } from 'src/medico/medico.entity/medico.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PacienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  genero: string;

  @ManyToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.pacientes)
  diagnosticos: DiagnosticoEntity[];

  @ManyToMany(() => MedicoEntity, (medico) => medico.pacientes)
  medicos: MedicoEntity[];
}
