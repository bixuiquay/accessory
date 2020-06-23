import { Controller, Body, Get, Post, UseInterceptors, UploadedFiles, Param, Res } from '@nestjs/common';
import { ResourceType, Category } from 'src/database';
import { Resources, Public, ApiImage } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags, ApiConsumes, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { ImageUploadDto } from './image.dto';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@ApiTags('image')
@Controller('images')
export class ImageController {
  constructor(
    private readonly service: ImageService
  ){}

  @Public()
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
    storage: diskStorage({
      destination: './images',
      filename:  (req, file, cb) => cb(null, `${file.originalname}`),
    }),
    fileFilter: imageFileFilter,
  }))
  @ApiImage('images')
  async uploadFiles(@UploadedFiles() files: any[]): Promise<any[]> {
    const response = [];
    if (files) {
      files.forEach(file => {
        const fileReponse = {
          originalname: file.originalname,
          filename: file.filename,
        };
        response.push(fileReponse);
      });
    }

    return response;
  }

  @Public()
  @Get(':imageName')
  async getImage(@Param('imageName') imageName, @Res() res): Promise<any> {
    res.sendFile(imageName, { root: 'images'});
  }
}
