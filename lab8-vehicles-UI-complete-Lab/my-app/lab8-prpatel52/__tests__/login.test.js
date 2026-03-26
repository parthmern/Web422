import { render } from "@testing-library/react";
import Login from "../pages/login";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page Component", () => {
  test('renders the title "Login" inside the card body', () => {
    render(<Login />);
    const title = document.querySelector("h2");
    expect(title.innerHTML).toBe("Login");
  });

  test("renders a form element", () => {
    render(<Login />);
    const form = document.querySelector("form");
    expect(form).toBeTruthy();
  });

  test("renders User input correctly", () => {
    render(<Login />);
    const userInput = document.querySelector('input[name="userName"]');
    expect(userInput).toBeTruthy();
    expect(userInput.type).toBe("text");
    expect(userInput.value).toBe("");
  });

  test("renders Password input correctly", () => {
    render(<Login />);
    const passwordInput = document.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.type).toBe("password");
    expect(passwordInput.value).toBe("");
    expect(passwordInput.id).toBe("password");
  });
});
