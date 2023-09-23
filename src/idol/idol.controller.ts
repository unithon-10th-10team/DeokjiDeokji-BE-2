import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IdolService } from './idol.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('idol')
export class IdolController {
  constructor(private readonly idolService: IdolService) {}

  @Get(':idolName')
  async getVistedPlace(@Param('idolName') idolName: string) {
    return await this.idolService.getVisitedPlace(idolName);
  }

  @Get('group/:groupName')
  async getGroupVisitedPlace(@Param('groupName') groupName: string) {
    return await this.idolService.getGroupVisitedPlace(groupName);
  }
}
