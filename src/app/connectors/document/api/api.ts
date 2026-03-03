export * from './default.service';
import { DefaultService } from './default.service';
export * from './documents.service';
import { DocumentsService } from './documents.service';
export const APIS = [DefaultService, DocumentsService];
