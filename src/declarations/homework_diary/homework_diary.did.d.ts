import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CreateUpdateHomework {
  'title' : string,
  'completed' : boolean,
  'description' : string,
}
export interface Homework {
  'id' : bigint,
  'title' : string,
  'creator' : Principal,
  'completed' : boolean,
  'dueDate' : Time,
  'description' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Homework } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addHomework' : ActorMethod<[CreateUpdateHomework], bigint>,
  'deleteHomework' : ActorMethod<[bigint], Result>,
  'getAllHomework' : ActorMethod<[], Array<Homework>>,
  'getHomework' : ActorMethod<[bigint], Result_1>,
  'getPendingHomework' : ActorMethod<[], Array<Homework>>,
  'markAsCompleted' : ActorMethod<[bigint], Result>,
  'searchHomework' : ActorMethod<[string], Array<Homework>>,
  'updateHomework' : ActorMethod<[bigint, CreateUpdateHomework], Result>,
}
