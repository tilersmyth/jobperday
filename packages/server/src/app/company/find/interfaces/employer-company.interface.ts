import { CompanyMemberEntity } from '../../entity';
import { Company } from '../../interfaces/company.interface';

export interface EmployerCompany extends Company {
  member: CompanyMemberEntity;
}
