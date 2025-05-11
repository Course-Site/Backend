import {
	Controller,
	Get,
	Delete,
	Put,
	Inject,
	Param,
	Post,
	Body,
	UseGuards,
} from '@nestjs/common';
import { IUserTestStatisticsService } from 'src/use-cases/user_test_statistics/interface/service/user_test_statistics.service.interface';
import {
	ApiBearerAuth,
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiBody,
} from '@nestjs/swagger';
import { IUserTestStatisticsEntity } from 'src/entiies/user_test_statistics/interface/user_test_statistics.entity.interface';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user_test_statistics')
@ApiTags('User_Test_Statistics')
export class UserTestStatisticsController {
	constructor(
		@Inject('userTestStatisticsService')
		private readonly userTestStatisticsService: IUserTestStatisticsService,
	) {}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('getAll')
	@ApiOperation({ summary: 'Get all UserTestStatistics' })
	@ApiResponse({ status: 200, description: 'Return all UserTestStatistics.' })
	@ApiResponse({ status: 404, description: 'UserTestStatistics not found.' })
	async findAllUserTestStatistics() {
		return await this.userTestStatisticsService.findAllUserTestStatistics();
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('findById/:id')
	@ApiOperation({ summary: 'Get a UserTestStatistics by its ID' })
	@ApiParam({ name: 'id', description: 'UserTestStatistics ID', type: 'string' })
	@ApiResponse({
		status: 200,
		description: 'Return the UserTestStatistics with the given ID.',
	})
	@ApiResponse({ status: 404, description: 'UserTestStatistics not found.' })
	async findById(@Param('id') id: string) {
		return await this.userTestStatisticsService.findById(id);
	}

	@Delete('delete/:id')
	@ApiOperation({ summary: 'Delete a UserTestStatistics by its ID' })
	@ApiParam({ name: 'id', description: 'UserTestStatistics ID', type: 'string' })
	@ApiResponse({
		status: 200,
		description: 'The UserTestStatistics has been successfully deleted.',
	})
	@ApiResponse({ status: 404, description: 'UserTestStatistics not found.' })
	async deleteUserTestStatistics(@Param('id') id: string) {
		await this.userTestStatisticsService.deleteUserTestStatistics(id);
	}
}
