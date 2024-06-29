import { Reflector } from '@nestjs/core';
import { ERoles } from './types';

export const Roles = Reflector.createDecorator<ERoles>();
