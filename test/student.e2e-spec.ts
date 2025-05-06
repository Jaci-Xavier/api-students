import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Students E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
    // Limpa a tabela e insere dados de teste
    await prisma.student.deleteMany();
    await prisma.student.create({ data: { name: 'Test Student', grade: 90, firstUniqueLetter: 'T' } });
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('/students (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/students');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('/students/:id (GET)', async () => {
    const student = await prisma.student.findFirst();

    if (!student) {
      throw new Error('Nenhum estudante encontrado no banco de dados.');
    }

    const res = await request(app.getHttpServer()).get(`/students/${student.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(student.id);
    expect(res.body.name).toBe(student.name);
  });

  it('/students (POST)', async () => {
    const newStudent = { name: 'New Student' };
    const res = await request(app.getHttpServer())
      .post('/students')
      .send(newStudent);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newStudent.name);
  });
});