import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import jfm from 'jest-fetch-mock';

configure({ adapter: new Adapter() });
//Setup jest-fetch-mock but do not mock by default
jfm.enableMocks();
fetchMock.dontMock()
