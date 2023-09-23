import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPageQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'pageNumber',
      type: Number,
      required: true,
    }),
    ApiQuery({
      name: 'pageSize',
      type: Number,
      required: true,
    }),
  );
}
