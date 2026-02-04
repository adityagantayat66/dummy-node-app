import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import type { Request } from 'express';
import { BaseUserDTO } from 'src/auth/dto/auth.dto';
import { all_users } from 'src/auth/service/auth/auth.service';
import { Role, Roles } from 'src/common/custom-decorators/roles';
import { EncryptedUser } from 'src/common/types/types';

@Controller('dashboard')
export class DashboardController {
  /**
   * @Endpoint : signin.
   * @description : login for user.
   * @params {payload: SignInDTO}.
   * @RequestMethod :  POST.
   * @return : token or error.
   */
  @ApiOperation({ summary: 'This endpoint is for getting user details' })
  @Get('getUserDetails')
  getUserDetails(@Req() req: Request): BaseUserDTO[] {
    if (!req['user']) {
      throw new Error('User not authenticated');
    }
    const user: EncryptedUser = req['user'] as EncryptedUser;
    if (user.role !== Role.Admin) {
      return all_users.size ? [...all_users.values()] : [];
    }
    return [
      all_users.has(user.email)
        ? all_users.get(user.email)!
        : ({} as BaseUserDTO),
    ];
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'This endpoint is for checking company details' })
  @Get('companyInfo')
  getCompanyInfo() {
    return {
      name: 'Tech Solutions Inc.',
      address: '1234 Innovation Drive, Tech City, TX 75001',
      contactEmail: 'contact@techsolutions.com',
    };
  }
}
