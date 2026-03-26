import { render } from "@testing-library/react";
import Vehicles from "../pages/vehicles";
import useSWR from "swr";

// copied this
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));
// -------

useSWR.mockReturnValue({
  data: [
    {
      id: 1,
      year: 1994,
      make: "Suzuki",
      model: "SJ",
      vin: "JN8AZ2KR6CT544012",
    },
    {
      id: 2,
      year: 1999,
      make: "Chrysler",
      model: "300",
      vin: "1B3CC5FB5AN648885",
    },
  ],
  error: null,
});

describe("Vehicles Page Component", () => {
  test('renders the title "Vehicles" inside the card body', () => {
    render(<Vehicles />);
    const title = document.querySelector("h2");
    expect(title.innerHTML).toBe("Vehicles");
  });

  test("table has correct class names", () => {
    render(<Vehicles />);
    const table = document.querySelector("table");
    expect(table.className).toBe("table table-striped table-bordered");
  });

  test("renders vehicle data correctly", () => {
    render(<Vehicles />);
    const rows = document.querySelectorAll("tbody tr");
    expect(rows.length).toBe(2);

    const firstRowCells = rows[0].querySelectorAll("td");
    expect(firstRowCells[0].innerHTML).toBe("1994");
    expect(firstRowCells[1].innerHTML).toBe("Suzuki");
    expect(firstRowCells[2].innerHTML).toBe("SJ");
    expect(firstRowCells[3].innerHTML).toBe("JN8AZ2KR6CT544012");

    const secondRowCells = rows[1].querySelectorAll("td");
    expect(secondRowCells[0].innerHTML).toBe("1999");
    expect(secondRowCells[1].innerHTML).toBe("Chrysler");
    expect(secondRowCells[2].innerHTML).toBe("300");
    expect(secondRowCells[3].innerHTML).toBe("1B3CC5FB5AN648885");
  });
});
