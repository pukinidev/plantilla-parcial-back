import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticoService } from './diagnostico.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { DiagnosticoEntity } from './diagnostico.entity/diagnostico.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DiagnosticoService', () => {
  let service: DiagnosticoService;
  let repository: Repository<DiagnosticoEntity>;
  let diagnosticoList: DiagnosticoEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [DiagnosticoService],
    }).compile();

    service = module.get<DiagnosticoService>(DiagnosticoService);
    repository = module.get<Repository<DiagnosticoEntity>>(
      getRepositoryToken(DiagnosticoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    diagnosticoList = [];
    for (let i = 0; i < 5; i++) {
      const diagnostico: DiagnosticoEntity = await repository.save({
        nombre: faker.lorem.word(),
        descripcion: faker.lorem.sentence(),
      });
      diagnosticoList.push(diagnostico);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all diagnosticos', async () => {
    const diagnosticos: DiagnosticoEntity[] = await service.findAll();
    expect(diagnosticos).not.toBeNull();
    expect(diagnosticos.length).toBe(diagnosticoList.length);
  });

  it('findOne should return a diagnostico by id', async () => {
    const storedDiagnostico: DiagnosticoEntity = diagnosticoList[0];
    const diagnostico: DiagnosticoEntity = await service.findOne(
      storedDiagnostico.id,
    );
    expect(diagnostico).not.toBeNull();
    expect(diagnostico.nombre).toBe(storedDiagnostico.nombre);
    expect(diagnostico.descripcion).toBe(storedDiagnostico.descripcion);
  });

  it('findOne should throw an exception for an invalid diagnostico', async () => {
    await expect(service.findOne('0')).rejects.toHaveProperty(
      'message',
      'Diagnostico no encontrado',
    );
  });

  it('create should return a new diagnostico', async () => {
    const diagnostico: DiagnosticoEntity = {
      id: '',
      nombre: faker.lorem.word(),
      descripcion: faker.lorem.sentence(),
      pacientes: [],
    };

    const newDiagnostico: DiagnosticoEntity = await service.create(diagnostico);
    expect(newDiagnostico).not.toBeNull();

    const storedDiagnostico = await repository.findOne({
      where: { id: newDiagnostico.id },
    });
    expect(storedDiagnostico).not.toBeNull();
    expect(storedDiagnostico.nombre).toBe(diagnostico.nombre);
    expect(storedDiagnostico.descripcion).toBe(diagnostico.descripcion);
  });

  it('create should throw an exception if description is longer than 200 characters', async () => {
    const diagnostico: DiagnosticoEntity = {
      id: '',
      nombre: faker.lorem.word(),
      descripcion: faker.lorem.paragraphs(10),
      pacientes: [],
    };

    await expect(service.create(diagnostico)).rejects.toHaveProperty(
      'message',
      'La descripción del diagnóstico no puede tener más de 200 caracteres',
    );
  });

  it('delete should remove a diagnostico', async () => {
    const storedDiagnostico: DiagnosticoEntity = diagnosticoList[0];
    await service.delete(storedDiagnostico.id);
    const deletedDiagnostico = await repository.findOne({
      where: { id: storedDiagnostico.id },
    });
    expect(deletedDiagnostico).toBeNull();
  });

  it('delete should throw an exception for an invalid diagnostico', async () => {
    const diagnostico: DiagnosticoEntity = diagnosticoList[0];
    await service.delete(diagnostico.id);
    await expect(service.delete(diagnostico.id)).rejects.toHaveProperty(
      'message',
      'Diagnostico no encontrado',
    );
  });
});
