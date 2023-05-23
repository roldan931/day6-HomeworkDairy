export const idlFactory = ({ IDL }) => {
  const CreateUpdateHomework = IDL.Record({
    'title' : IDL.Text,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Time = IDL.Int;
  const Homework = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'creator' : IDL.Principal,
    'completed' : IDL.Bool,
    'dueDate' : Time,
    'description' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : Homework, 'err' : IDL.Text });
  return IDL.Service({
    'addHomework' : IDL.Func([CreateUpdateHomework], [IDL.Nat], []),
    'deleteHomework' : IDL.Func([IDL.Nat], [Result], []),
    'getAllHomework' : IDL.Func([], [IDL.Vec(Homework)], ['query']),
    'getHomework' : IDL.Func([IDL.Nat], [Result_1], ['query']),
    'getPendingHomework' : IDL.Func([], [IDL.Vec(Homework)], ['query']),
    'markAsCompleted' : IDL.Func([IDL.Nat], [Result], []),
    'searchHomework' : IDL.Func([IDL.Text], [IDL.Vec(Homework)], ['query']),
    'updateHomework' : IDL.Func([IDL.Nat, CreateUpdateHomework], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
