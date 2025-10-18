import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Course} from '../domain/model/course.entity';
import {CourseResource, CoursesResponse} from './courses-response';
import {CourseAssembler} from './course-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CategoryAssembler} from './category-assembler';

export class CoursesApiEndpoint extends
  BaseApiEndpoint<Course, CourseResource, CoursesResponse, CourseAssembler> {

  /**
   * Creates an instance of CategoriesApiEndPoint
   * @param http -  The HttpClient to be used for making API requests
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderCoursesEndpointPath}`,
      new CourseAssembler());
  }
}
