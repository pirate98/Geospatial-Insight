import { render } from "@testing-library/react";
import ControlPanel from "../components/ControlPanel";

const setFunction = jest.fn()

describe('Control Panel', () => {
  it('accepts intereactive control data props', () => {
    render(<ControlPanel
              setLoaded={setFunction}
              setData={setFunction}
              coverage={100}
              setCoverage={setFunction}
              height={100}
              setHeight={setFunction}
              floorNum={100}
              setFloorNum={setFunction}
            />)
  });
});