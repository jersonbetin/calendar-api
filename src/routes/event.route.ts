import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import { EventController } from '@controllers/event.controller';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import {
  CreateEventDto,
  EventParamsDto,
  UpdateEventDto,
} from '@dtos/event.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';

export class EventRoute implements Routes {
  public path = '/events';
  public router = Router();
  public event = new EventController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, this.event.getEvents);
    this.router.get(
      `${this.path}/:eventId`,
      AuthMiddleware,
      ValidationMiddleware(EventParamsDto, 'params'),
      this.event.getEventById,
    );
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      ValidationMiddleware(CreateEventDto),
      this.event.createEvent,
    );
    this.router.put(
      `${this.path}/:eventId`,
      AuthMiddleware,
      ValidationMiddleware(UpdateEventDto),
      this.event.updateEvent,
    );
    this.router.delete(
      `${this.path}/:eventId`,
      AuthMiddleware,
      this.event.deleteEventById,
    );
  }
}
