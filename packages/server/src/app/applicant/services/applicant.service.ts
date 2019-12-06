import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { ApplicantEntity, ApplicantAnswerEntity } from '../entity';
import { CreateApplicantInput } from '../inputs';
import { ApplicantAnswerService } from './applicant-answer.service';
import { JobPostingEntity } from '../../job-posting';
import { UserEntity } from '../../user/entity';

@Injectable()
export class ApplicantService extends CrudService<ApplicantEntity> {
  private logger = new AppLogger(ApplicantService.name);

  constructor(protected answerService: ApplicantAnswerService) {
    super();
  }

  public async create(user: UserEntity, input: CreateApplicantInput) {
    return getManager().transaction(async transaction => {
      const applicant = new ApplicantEntity();

      const posting = await transaction.findOne(JobPostingEntity, {
        where: { id: input.postingId },
      });

      const answers: ApplicantAnswerEntity[] = [];
      for (const answer of input.answers) {
        const savedAnswer = await this.answerService.create(
          answer,
          transaction,
        );
        answers.push(savedAnswer);
      }

      applicant.companyId = input.companyId;
      applicant.jobId = input.jobId;
      applicant.posting = posting;
      applicant.candidate = user;
      applicant.answers = answers;

      return transaction.save(applicant);
    });
  }
}
