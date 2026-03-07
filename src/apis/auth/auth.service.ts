import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { LoginDto } from './dto/login.dto'


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validatePersonnel(identity: string, password: string) {
    const personnel = await this.prisma.personnel.findUnique({
      where: { identity },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    })

    if (!personnel) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const valid = await bcrypt.compare(password, personnel.password)

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return personnel
  }

  async login(dto: LoginDto) {
    const personnel = await this.validatePersonnel(dto.identity, dto.password)
    const permissions = personnel.role.permissions.map(
      (rp) => rp.permission.name,
    )

    const payload = {
      sub: personnel.id,
      role: personnel.role.name,
      permissions: permissions,
    }

    const accessToken = this.jwtService.sign(payload)

    return {
      access_token: accessToken,
      personnel: {
        id: personnel.id,
        identity: personnel.identity,
        role: personnel.role.name,
      },
      permissions,
    }
  }

}