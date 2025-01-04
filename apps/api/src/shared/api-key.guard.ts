import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request: Request = context.switchToHttp().getRequest();
		const apiKey = request.headers['authorization'];

		if (apiKey && apiKey === process.env.API_SECRET) {
			return true;
		} else {
			throw new UnauthorizedException('Invalid API key');
		}
	}
}
