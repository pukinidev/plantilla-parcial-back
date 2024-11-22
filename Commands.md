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
