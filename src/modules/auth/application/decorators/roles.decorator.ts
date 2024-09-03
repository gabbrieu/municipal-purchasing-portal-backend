import { Reflector } from '@nestjs/core';
import { ERoles } from '../dto/auth.dto';

export const Roles = Reflector.createDecorator<ERoles>();
