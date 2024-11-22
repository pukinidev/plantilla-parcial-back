# Commands

## Create a module

`nest g mo modulename`

## Create Entity

`nest g cl entity/entity.entity --no-spec`

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
