import Container from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { Event } from '@interfaces/event.interface';
import { EventService } from '@services/event.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EventController {
  public eventService = Container.get(EventService);

  public getEvents = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { id } = req.user;

    try {
      const { skip, take } = req.query;
      const data: Event[] = await this.eventService.findAllEvent({
        skip: +skip,
        take: +take || 0,
        where: { userId: id },
      });

      res.status(200).json({ data, message: 'Search events successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { eventId } = req.params;
    try {
      const data: Event = await this.eventService.findEventById(+eventId);

      res.status(200).json({ data, message: 'Find event successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public createEvent = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newEvent: Event = req.body;
      const { id } = req.user;
      const data = await this.eventService.createEvent(newEvent, id);

      res.status(201).json({ data, message: 'Create event successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public updateEvent = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const newEvent: Event = req.body;
      const { eventId } = req.params;

      const data = await this.eventService.updateEvent(
        {
          ...newEvent,
        },
        +eventId,
      );

      res.status(200).json({ data, message: 'Update event successfully!' });
    } catch (e) {
      next(e);
    }
  };

  public deleteEventById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { eventId } = req.params;
    try {
      const data: Event = await this.eventService.deleteEvent(+eventId);

      res.status(200).json({ data, message: 'Delete event successfully!' });
    } catch (e) {
      next(e);
    }
  };
}
