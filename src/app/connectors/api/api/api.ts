export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './dayDescriptionController.service';
import { DayDescriptionControllerService } from './dayDescriptionController.service';
export * from './eventDescriptionController.service';
import { EventDescriptionControllerService } from './eventDescriptionController.service';
export * from './programmedEventController.service';
import { ProgrammedEventControllerService } from './programmedEventController.service';
export const APIS = [AuthControllerService, DayDescriptionControllerService, EventDescriptionControllerService, ProgrammedEventControllerService];
