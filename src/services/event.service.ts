import { Service } from 'typedi';
import { Prisma, PrismaClient } from '@prisma/client';

import { HttpException } from '@exceptions/HttpException';
import { Event } from '@interfaces/event.interface';
import { CreateEventDto, UpdateEventDto } from '@dtos/event.dto';
import { prismaExclude } from '@/utils/helpers';

@Service()
export class EventService {
  public event = new PrismaClient().event;

  public async findAllEvent(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    const { skip, take, where, orderBy = { startDate: 'asc' } } = params;
    console.log(params);
    const events: Event[] = await this.event.findMany({
      skip,
      take,
      where,
      orderBy,
    });

    return events;
  }

  public async findEventById(eventId: number): Promise<Event> {
    const event: Event = await this.event.findUnique({
      where: { id: eventId },
    });

    return event;
  }

  public async createEvent(data: CreateEventDto, sub: string): Promise<Event> {
    const { title, description, endDate, startDate } = data;

    return await this.event.create({
      data: { title, description, endDate, startDate, userId: sub },
      include: { user: true },
    });
  }

  public async updateEvent(data: UpdateEventDto, id): Promise<Event> {
    const { title, description, endDate, startDate } = data;

    return await this.event.update({
      data: { title, description, endDate, startDate },
      where: { id },
    });
  }

  public async deleteEvent(eventId: number): Promise<Event> {
    const event = await this.findEventById(eventId);

    if (!event) throw new HttpException(409, "Event doesn't exist");

    return await this.event.delete({
      where: { id: event.id },
    });
  }
}
