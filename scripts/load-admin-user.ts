import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { getClient } from "@/db";

async function loadAdminUser(username: string, password: string) {
  console.log(
    `Executing loading admin user ${username} with the given password.`
  );
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const avatar = faker.image.avatar();
  const client = await getClient();

  try {
    await client.connect();
    await client.query(
      "insert into public.users (username, password, is_admin, avatar) values ($1, $2, $3, $4)",
      [username, hash, true, avatar]
    );
    console.log(
      `Admin user '${username}' created successfully with an avatar.`
    );
  } catch (error) {
    console.error("Error while creating admin user:", error);
  } finally {
    await client.end();
  }
}

const username = process.argv[2];
const password = process.argv[3];
loadAdminUser(username, password);
