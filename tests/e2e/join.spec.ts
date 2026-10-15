import { expect, test } from '@playwright/test';
import { signInDemo, trackErrors } from './helpers';

test('a student joins with the class link and just a name, and the teacher lets them in', async ({ context }) => {
  // Two tabs share the demo's storage but each signs in on its own, like two devices.
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  await signInDemo(teacher, 'Teacher');

  // The class link is on the Students page.
  await teacher.goto('/t/c/c_math10a/students');
  await teacher.getByRole('button', { name: /Add students/ }).click();
  await teacher.getByRole('tab', { name: 'Share class link' }).click();
  const link = await teacher.getByText(/\/join\/[A-Z0-9]+$/).innerText();
  await teacher.keyboard.press('Escape');

  // The student opens it and types only a first and last name.
  await student.goto(new URL(link).pathname);
  await expect(student.getByRole('heading', { name: /^Join / })).toBeVisible();
  await expect(student.getByLabel('Email')).toHaveCount(0);
  await expect(student.getByLabel('Password')).toHaveCount(0);
  await student.getByLabel('First name').fill('Ama');
  await student.getByLabel('Last name').fill('Mensah');
  await student.getByRole('button', { name: 'Join class' }).click();
  await expect(student.getByRole('heading', { name: /^Waiting for/ })).toBeVisible();

  // The teacher sees the name, ticked, and approves.
  await teacher.reload();
  await expect(teacher.getByText('1 student wants to join')).toBeVisible();
  await expect(teacher.getByText('Joined with the class link', { exact: false }).first()).toBeVisible();
  await expect(teacher.getByRole('checkbox', { name: 'Select Ama Mensah' })).toBeChecked();
  await teacher.getByRole('button', { name: 'Approve 1 student' }).click();
  await expect(teacher.getByText('Student let in')).toBeVisible();

  // The student's page opens the class on its own.
  await expect(student.getByText('To do')).toBeVisible({ timeout: 20_000 });
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});

test('the teacher unticks a name they do not know and declines it', async ({ context }) => {
  const teacher = await context.newPage();
  const student = await context.newPage();
  const teacherErrors = trackErrors(teacher);
  const studentErrors = trackErrors(student);
  await signInDemo(teacher, 'Teacher');
  const code = await teacher.evaluate(() => (JSON.parse(localStorage.getItem('educore-demo-db-v1') ?? '{}').classes as Array<{ id: string; joinCode: string }>).find((c) => c.id === 'c_math10a')!.joinCode);
  await student.goto(`/join/${code}`);
  await student.getByLabel('First name').fill('Some');
  await student.getByLabel('Last name').fill('Stranger');
  await student.getByRole('button', { name: 'Join class' }).click();
  await expect(student.getByRole('heading', { name: /^Waiting for/ })).toBeVisible();

  await teacher.goto('/t/c/c_math10a/students');
  await teacher.getByRole('checkbox', { name: 'Select Some Stranger' }).uncheck();
  await expect(teacher.getByRole('button', { name: /^Approve/ })).toBeDisabled();
  await teacher.getByRole('checkbox', { name: 'Select Some Stranger' }).check();
  await teacher.getByRole('button', { name: 'Decline selected' }).click();
  await expect(teacher.getByText('Request declined')).toBeVisible();
  await expect(student.getByRole('heading', { name: 'Your request was declined' })).toBeVisible({ timeout: 20_000 });
  expect([...teacherErrors, ...studentErrors]).toEqual([]);
});
