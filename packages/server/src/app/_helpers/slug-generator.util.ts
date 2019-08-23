import { Repository, BaseEntity, FindConditions } from 'typeorm';
import slugify from 'slug';

export class SlugGeneratorUtil<T extends BaseEntity> {
  private iterator: number | null = null;

  constructor(private readonly repository: Repository<T>) {}

  async generate(name: string, args?: FindConditions<T>): Promise<string> {
    const slug = slugify(name, { lower: true });
    const newSlug = this.iterator ? `${slug}-${this.iterator}` : slug;

    const checkSlug = await this.repository.findOne({
      where: { slug: newSlug, ...args },
    });

    if (checkSlug) {
      this.iterator = this.iterator ? this.iterator + 1 : 2;
      return this.generate(name, args);
    }

    return newSlug;
  }
}
