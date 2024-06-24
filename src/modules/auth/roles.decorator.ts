import { Reflector } from '@nestjs/core';
import { ERoles } from './roles.enum';

export const Roles = Reflector.createDecorator<ERoles>();
