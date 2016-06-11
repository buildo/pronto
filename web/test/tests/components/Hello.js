import Hello from 'components/Hello/Hello.js';
import expect from 'expect';

const baseProps = {
  toggle: () => {},
  user: 'user',
  onRefreshClick: () => {}
};

describe('Hello', () => {

  it('should greet in an informal way when formal=false', () => {

    const hello = new Hello({ ...baseProps, formal: false });
    expect(hello.getLocals().greeting).toBe('Hello');

  });

  it('should greet in a formal way when formal=true', () => {

    const hello = new Hello({ ...baseProps, formal: true });
    expect(hello.getLocals().greeting.includes('Good')).toBe(true);

  });

});