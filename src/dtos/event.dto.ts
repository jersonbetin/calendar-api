import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isInt,
  isNumber,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @Type(() => Date)
  @IsNotEmpty()
  public startDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  public endDate: Date;

  @IsString()
  @IsOptional()
  public description?: string;
}

export class UpdateEventDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public title?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  public startDate?: Date;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  public endDate?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public description?: string;
}

export class EventParamsDto {
  @IsNumber()
  eventId: number;
}
