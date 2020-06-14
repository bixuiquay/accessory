/**
 *  @singleton decorator
 * add static method getInstance(...args) to decorated class which returns single instance
 * (or constructs single instance if it doesn't exist)
 *
 * @param  {any} Target   The target class
 * @return {any}
 */
export const singleton = (Target: any) => {
  Target.getInstance = function (...args: any[]) {

    // save a reference to the original constructor
    const original = Target;

    // a utility function to generate instance of a class
    function construct(constructor) {
      const c: any = function () {
        return constructor.apply(this, args);
      };

      c.prototype = constructor.prototype;

      return new c();
    }

    const f: any = function () {
      return construct(original);
    };

    if (!original.instance) {
      // copy prototype so intanceof operator still works
      f.prototype = original.prototype;
      original.instance = new f();
    }

    return original.instance;
  };
};