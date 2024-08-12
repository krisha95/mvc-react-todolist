const detaildefs = [
  {
    label: "Service Code",
    id: "serviceCd",
  },
  {
    label: "Target Table",
    id: "targetTable",
  },
  {
    label: "Field",
    id: "field",
  },
  {
    label: "Feed Status Id",
    id: "feedStatusId",
  },
];

const selectedEventTask = {
  serviceCd: "serviceCd",
  targetTable: "targetTable",
  field: "field",
  feedStatusId: "feedStatusId",
};

const data = {
  serviceCd: selectedEventTask.serviceCd ?? "",
  targetTable: selectedEventTask.targetTable ?? "",
  field: selectedEventTask.field ?? "",
  feedStatusId: selectedEventTask.feedStatusId ?? "",
};
