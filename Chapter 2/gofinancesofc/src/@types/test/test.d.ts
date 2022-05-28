import { ReactTestInstance } from 'react-test-renderer';


export interface ReactTestProps extends ReactTestInstance {
  props: {
    children?: string;
    testID?: string;
  };
}
