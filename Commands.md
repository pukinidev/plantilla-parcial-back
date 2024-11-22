# Commands

## Create a module

`nest g mo modulename`

## Create Entity

`nest g cl module/entity.entity --no-spec`

### Basic Entity

```
@Entity()
export class NameEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 atribute: type;
}
```

### Relations

#### OneToMany

- Define `@OneToMany()` in the class that owns the relationship
- Define `@ManyToOne()` in the class that is referenced by the owning class.

Example:

```typescript
@Entity()
export class User {
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

@Entity()
export class Post {
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
```

#### ManyToMany

* Define `@ManyToMany()` in both classes.
* Use the `@JoinTable()` decorator in the class that owns the relationship.

Example:

```typescript
@Entity()
export class Student {
  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable() // Indicates ownership of the relationship
  courses: Course[];
}

@Entity()
export class Course {
  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
```

#### OneToOne

* Define `@OneToOne()` in both classes.
* Use `@JoinColumn()` in the class that owns the relationship.

Example: 

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Profile {
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn() // Indicates ownership of the relationship
  user: User;
}

@Entity()
export class User {
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}

```

### Create Services

`nest g s servicename`

* Inyect the entity repository into the service

  ```typescript
  constructor(
     @InjectRepository(nameEntity)
     private readonly nameRepository: Repository<NameEntity>
  ){}
  ```
* Add import of the entity in the current module

  ```typescript
  imports: [TypeOrmModule.forFeature([NameEntity])]
  ```
* Define basic CRUD methods

  * findAll()
  * findOne()
  * create()
  * update()
  * delete()
* Ensure business requirements are validated and throw exceptions if the entity does not exist.

  ```typescript
  if (entity.attribute !== 'requirement') {
    throw new BusinessLogicException("Invalid business requirement", BusinessError.PRECONDITION_FAILED);
  }

  if (!entity)
     throw new BusinessLogicException("Entity not found", BusinessError.NOT_FOUND);
  ```

### Create Controllers and DTO's

`nest g co module --no-spec`

* Create Entity DTO

  * `nest g cl module/entity.dto --no-spec`
    ```typescript
    import {IsNotEmpty, IsString} from 'class-validator';
    export class EntityDto {

     @IsString()
     @IsNotEmpty()
     readonly atribute: string;

    }
    ```
* Define Controller

  ```typescript
  @Controller('entitys') // plural of entity
  @UseInterceptors(BusinessErrorsInterceptor)
  export class EntityController {
      constructor(private readonly entityService: EntityService) {}
  }
  ```
* Define Controller Methods

  * Get() -> FindAll
  * Get('entityID') -> FindOne
  * @Post() -> Create
  * @Put('entityID') -> Update
  * @Delete('entityID') -> Delete Entity

  Example:

  ```typescript
    @Get()
    async findAll() {
      return await this.entityService.findAll();
    }

    @Get(':entityId')
    async findOne(@Param('entityId') entityId: string) {
      return await this.entityService.findOne(entityId);
    }

    @Post()
    async create(@Body() entityDto: EntityDto) {
      const entity: NameEntity = plainToInstance(NameEntity, entityDto);
      return await this.entityService.create(entity);
    }

    @Put(':entityId')
    async update(@Param('entityId') entityId: string, @Body() entityDto: EntityDto) {
      const entity: NameEntity = plainToInstance(NameEntity, entityDto);
      return await this.entityService.update(entityId, entity);
    }

    @Delete(':entityId')
    @HttpCode(204)
    async delete(@Param('entityId') entityId: string) {
      return await this.entityService.delete(entityId);
    }
  ```
