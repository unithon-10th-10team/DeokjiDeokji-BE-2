import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { IdolService } from './idol.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('idol')
export class IdolController {
  constructor(private readonly idolService: IdolService) {}

  @Get(':idolId')
  async getVistedPlace(@Param('idolId', ParseIntPipe) idolId: number) {
    return await this.idolService.getVisitedPlace(idolId);
  }
}
