import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullTextSearch1567879216181 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    UPDATE jobs
    SET document_with_weights = setweight(to_tsvector(type), 'A') ||
      setweight(to_tsvector(title), 'B') ||
        setweight(to_tsvector(coalesce(description, '')), 'C');
    CREATE INDEX document_weights_idx
      ON jobs
      USING GIN (document_with_weights);
            CREATE FUNCTION job_tsvector_trigger() RETURNS trigger AS $$
    BEGIN
      new.document_with_weights :=
      setweight(to_tsvector('english', coalesce(new.type, '')), 'A')
      || setweight(to_tsvector('english', coalesce(new.title, '')), 'B')
      || setweight(to_tsvector('english', coalesce(new.description, '')), 'C');
      return new;
    END
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
        ON jobs FOR EACH ROW EXECUTE PROCEDURE job_tsvector_trigger();
    `);
  }

  // tslint:disable-next-line: no-empty
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
