import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./User.entity";

@Index('IDX_USERID_STATUS',['user','status'])
@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number

   @Column( { type: 'varchar' , nullable:false } )
   token: string

   @Column({default: 0})
   refreshCount: number 

   @Column()
   expired_at: Date
   
   @Column({default: true})
   status: boolean

   @CreateDateColumn({})
   created_at: Date

   @UpdateDateColumn()
   updated_at: Date

   @ManyToOne(() => Users,(user) => user.token)
   user: Users
}