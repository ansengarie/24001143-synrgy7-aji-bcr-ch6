import { type Knex } from 'knex'
import { hashPassword } from '../../utils/bcrypt.password'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Helper function to create users with hashed passwords
  async function createUser(id: number, name: string, email: string, password: string, role: string) {
    return {
      id,
      name,
      email,
      password: await hashPassword(password),
      role
    }
  }

  // Seed entries for users
  const users = [
    await createUser(1, 'Super Admin', 'superadmincar@yopmail.com', 'superadmincar', 'super_admin'),
    await createUser(2, 'Super Admin 2', 'superadmin2@yopmail.com', 'superadmin2', 'super_admin'),
    await createUser(3, 'Super Admin 3', 'superadmin3@yopmail.com', 'superadmin3', 'super_admin'),
    await createUser(4, 'Super Admin 4', 'superadmin4@yopmail.com', 'superadmin4', 'super_admin'),
    await createUser(5, 'Super Admin 5', 'superadmin5@yopmail.com', 'superadmin5', 'super_admin'),
    await createUser(6, 'Admin 1', 'admin1@yopmail.com', 'admin1password', 'admin'),
    await createUser(7, 'Admin 2', 'admin2@yopmail.com', 'admin2password', 'admin'),
    await createUser(8, 'Admin 3', 'admin3@yopmail.com', 'admin3password', 'admin'),
    await createUser(9, 'Admin 4', 'admin4@yopmail.com', 'admin4password', 'admin'),
    await createUser(10, 'Admin 5', 'admin5@yopmail.com', 'admin5password', 'admin'),
    await createUser(11, 'Admin 6', 'admin6@yopmail.com', 'admin6password', 'admin'),
    await createUser(12, 'Admin 7', 'admin7@yopmail.com', 'admin7password', 'admin'),
    await createUser(13, 'Member 1', 'member1@yopmail.com', 'member1password', 'member'),
    await createUser(14, 'Member 2', 'member2@yopmail.com', 'member2password', 'member'),
    await createUser(15, 'Member 3', 'member3@yopmail.com', 'member3password', 'member'),
    await createUser(16, 'Member 4', 'member4@yopmail.com', 'member4password', 'member'),
    await createUser(17, 'Member 5', 'member5@yopmail.com', 'member5password', 'member'),
    await createUser(18, 'Member 6', 'member6@yopmail.com', 'member6password', 'member'),
    await createUser(19, 'Member 7', 'member7@yopmail.com', 'member7password', 'member'),
    await createUser(20, 'Member 8', 'member8@yopmail.com', 'member8password', 'member'),
    await createUser(21, 'Member 9', 'member9@yopmail.com', 'member9password', 'member'),
    await createUser(22, 'Member 10', 'member10@yopmail.com', 'member10password', 'member')
  ]

  // Inserts seed entries
  await knex('users').insert(users)
}
