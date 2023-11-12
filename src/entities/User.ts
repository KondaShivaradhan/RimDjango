import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { UserRecords } from './UserRecords';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Add '!' to indicate that it will be initialized later

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ default: '' })
  folderName!: string;

  @Column({ default: 'kondashivaradhan007@gmail.com' })
  backupMegaAcc!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1024.0 })
  quota!: number;

  @OneToMany(() => UserRecords, (userRecord:UserRecords) => userRecord.user)
  records!: UserRecords[];

  @BeforeInsert()
  updateFolderName() {
    const localPart = this.email.split('@')[0];
    const lettersOnly = localPart.replace(/[^a-zA-Z]/g, ''); // Keeping only letters
    this.folderName = `${lettersOnly}_${this.id!}`;
  }
}
