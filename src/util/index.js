import { nanoid } from "nanoid";
import md5 from "md5";
import q from "nikolav-q";
//
import assign from "lodash/assign";
import clamp from "lodash/clamp";
import debounce from "lodash/debounce";
import each from "lodash/each";
import filter from "lodash/filter";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import keys from "lodash/keys";
import map from "lodash/map";
import merge from "lodash/merge";
import noop from "lodash/noop";
import now from "lodash/now";
import omit from "lodash/omit";
import pick from "lodash/pick";
import pickBy from "lodash/pickBy";
import random from "lodash/random";
import reduce from "lodash/reduce";
import sample from "lodash/sample";
import shuffle from "lodash/shuffle";
// https://lodash.com/docs/4.17.15#transform
import transform from "lodash/transform";
//
import  classnames from  "classnames";
//
const { add: addClass, rm: removeClass, has: hasClass } = q.class;
const { eventListener, prevent, ready, s: select, type } = q;
const { has } = q.object;
const { isEmail } = q.test;
// const { noop } = q.func;
const { sortByTimestampDesc } = q.array;
const { stripEndSlashes } = q.str;

//
const arrayRand = sample;
const False = () => false;
const paste = assign;
const True = () => true;

export {
  addClass,
  arrayRand,
  assign,
  clamp,
  classnames,
  debounce,
  each,
  eventListener,
  False,
  filter,
  has,
  hasClass,
  isEmail,
  isFunction,
  isString,
  keys,
  map,
  md5,
  merge,
  nanoid,
  noop,
  now,
  omit,
  paste,
  pick,
  pickBy,
  prevent,
  random,
  ready,
  reduce,
  removeClass,
  sample,
  select,
  shuffle,
  sortByTimestampDesc,
  stripEndSlashes,
  transform,
  True,
  type,
};
