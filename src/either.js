import { id } from './utils';


export const Left = function(err) {
    if (this === undefined || this.constructor !== Left)
        return new Left(err);

    this.__value = err;
};

Left.prototype.isLeft = () => true;
Left.prototype.isRight = () => false;
Left.prototype.toString = function() {
    return 'Left( ' + this.__value + ' )';
};
Left.prototype.bind = function() {
    return this;
};
Left.prototype.constructor = Left;


export const Right = function(val) {
    if (this === undefined || this.constructor !== Right)
        return new Right(val);

    this.__value = val;
};

Right.prototype.isLeft = () => false;
Right.prototype.isRight = () => true;
Right.prototype.toString = function() {
    return 'Right( ' + this.__value + ' )';
};
Right.prototype.bind = function(f) {
    return Right(f(this.__value));
};
Right.prototype.constructor = Right;


// either :: (Left a -> c) -> (Right b -> c) -> Either a b -> c
// extractor of value from Either
export const either = (lf, rf, e) => {
    if(e.constructor === Left)
        return lf(e.__value);
    else if (e.constructor === Right)
        return rf(e.__value);
    else {
        throw Error("either takes either Left or Right");
    }
};


// bind :: Either a b -> (b -> c) -> Either a c
export const bind = (e, f) => e.bind(f);


// extract :: Either a b -> a | b
// extacts value from Either
export const extract = (e) => either(id, id, e);
