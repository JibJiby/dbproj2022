import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/Project';
import { IsNull, Repository } from 'typeorm';
import { Client } from '../entities/Client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const { clientName, companyName } = createClientDto;

    const newClient = new Client();
    newClient.clientName = clientName;
    newClient.companyName = companyName;

    return await this.clientsRepository.save(newClient);
  }

  async findAll() {
    return this.clientsRepository.createQueryBuilder('clients').getMany();
  }

  async findNoneProjectClient() {
    const allClients = this.clientsRepository
      .createQueryBuilder('clients')
      .getMany();

    const result = await this.projectsRepository
      .createQueryBuilder('projects')
      .leftJoinAndSelect('projects.Client', 'clients')
      .getMany();

    const mappedClients = result.map((v) => v.Client.id);

    return (await allClients).filter(
      (client) => !mappedClients.includes(client.id),
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
