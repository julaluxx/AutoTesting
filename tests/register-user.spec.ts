import { test } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';

test.describe("Register - Success", () => {
    test("TC_REG_01: Register with valid data", async ({ page }) => {
        const signup = new SignupPage(page);
        await signup.navigate();

        const email = `test${Date.now()}@example.com`;

        await signup.registerUser({
            firstName: "Test",
            lastName: "User",
            email,
            phone: "0812345678",
            password: "Com@sci54"
        });
    });
});

test.describe("Regiser - Error", () => {
    test("TC_REG_02: Register with an already used email", async ({ page }) => {
        const signup = new SignupPage(page);
        await signup.navigate();

        const email = 'maicomsci54@gmail.com';

        await signup.registerUser({
            firstName: "Any",
            lastName: "Name",
            email,
            phone: "0812345678",
            password: "Com@sci54"
        });

        await signup.expectErrorPopup("REG_1005", "Email Already Exists: The email already exists in the system.");
    });

    test("TC_REG_03: Register with weak password", async ({ page }) => {
        const signup = new SignupPage(page);
        await signup.navigate();

        const email = `weakpass${Date.now()}@example.com`;

        await signup.registerUser({
            firstName: "Weak",
            lastName: "Password",
            email,
            phone: "0812345678",
            password: "12345"
        });

        await signup.expectErrorPopup("REG_1006", "Password must meet the following requirements: 1. Length between 8 and 20 characters, 2. At least one uppercase letter (A-Z), 3. At least one lowercase letter (a-z), 4. At least one number (0-9), 5. At least one special character (e.g., !@#$%^&*(),.?\":{}|<>).");
    });

    test("TC_REG_04: Register with invalid phone number", async ({ page }) => {
        const signup = new SignupPage(page);
        await signup.navigate();

        const email = `invalidphone${Date.now()}@example.com`;

        await signup.registerUser({
            firstName: "Invalid",
            lastName: "Phone",
            email,
            phone: "12345",
            password: "Com@sci54"
        });

        const phone = "12345";
        await signup.expectErrorPopup("REG_1003", `Invalid Formats: ${phone}`);
    });

    test("TC_REG_05: Register with invalid first name", async ({ page }) => {
        const signup = new SignupPage(page);
        await signup.navigate();

        const email = `invalidfirst${Date.now()}@example.com`;

        await signup.registerUser({
            firstName: "Invalid123",
            lastName: "Name",
            email,
            phone: "0812345678",
            password: "Com@sci54"
        });

        const firstName = "Invalid123";
        await signup.expectErrorPopup("REG_1003", `Invalid Formats: ${firstName}`);
    });

    test("TC_REG_06: Register with invalid last name", async ({ page }) => {
        const signup = new SignupPage(page);
        await signup.navigate();

        const email = `invalidlast${Date.now()}@example.com`;

        await signup.registerUser({
            firstName: "Valid",
            lastName: "Last123!",
            email,
            phone: "0812345678",
            password: "Com@sci54"
        });

        const lastName = "Last123!";
        await signup.expectErrorPopup("REG_1003", `Invalid Formats: ${lastName}`);
    });
});