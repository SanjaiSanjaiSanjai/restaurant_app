import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { RefreshToken } from './refreshToken.entity';

@Index('IDX_EMAIL_ACTIVE_STATUS', ['email', 'isActive', 'status'])
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column( {type: 'varchar',length: 100,nullable: false} )
    name: string

    @Column( {type: 'varchar',length: 100, nullable: false,unique: true})
    email: string

    @Column( {type: 'varchar',nullable: false,})
    password: string

    @Column( { type: 'boolean',default: true})
    isActive: boolean

    @Column( {type: 'boolean',default: true} )
    status: boolean

    @CreateDateColumn( {type: 'timestamp',default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @UpdateDateColumn( {type: 'timestamp',default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    @OneToMany(() => RefreshToken, (token) => token.user)
    token: RefreshToken[]
}