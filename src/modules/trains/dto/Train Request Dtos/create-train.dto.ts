import { AutoMap } from '@automapper/classes';
import { TrainStatus } from '../../entities/train.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bharat Express' })
  public name: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bharat Express is a train that runs from a to b.' })
  public description?: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: TrainStatus.ACTIVE,
    enum: TrainStatus,
    description:
      'Train status must be one of: ACTIVE, GROUNDED, UNDER_MAINTENANCE, ON_ACTIVEROUTE',
  })
  public status: TrainStatus;

  @AutoMap()
  @IsInt()
  @ApiProperty({ description: 'Total coaches Train have.', example: 15 })
  public total_coaches: number;

  @AutoMap()
    @IsInt()
  @ApiProperty({ description: "Train's top speed.", example: 155})
  public top_speed: number;
}
